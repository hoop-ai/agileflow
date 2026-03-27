import { User } from "@/api/entities/User";
import { Board } from "@/api/entities/Board";
import { Item } from "@/api/entities/Item";
import { UserStory } from "@/api/entities/UserStory";
import { suggestAssignees, suggestSprintComposition } from "@/lib/ai-assignment";

// OpenRouter-compatible tool schemas
export const AI_TOOLS = [
  {
    type: "function",
    function: {
      name: "listTeamMembers",
      description: "List all team members with their roles, job titles, skills, and descriptions. Use this to find who to assign tasks to.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "listBoards",
      description: "List all boards available to the current user. Returns board names, IDs, and column structure.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "createTask",
      description: "Create a new task on a board. Requires board_id and title. Optionally set group_id, status, and assignee_id.",
      parameters: {
        type: "object",
        properties: {
          board_id: { type: "string", description: "UUID of the board to create the task on" },
          title: { type: "string", description: "Title of the task" },
          group_id: { type: "string", description: "Optional group ID within the board" },
          status: { type: "string", description: "Task status (e.g. 'To Do', 'In Progress', 'Done')" },
          assignee_id: { type: "string", description: "UUID of the user to assign the task to" },
        },
        required: ["board_id", "title"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "assignTask",
      description: "Assign an existing task to a team member by searching for their name.",
      parameters: {
        type: "object",
        properties: {
          task_id: { type: "string", description: "UUID of the task to assign" },
          assignee_name: { type: "string", description: "Full name or partial name of the person to assign to" },
        },
        required: ["task_id", "assignee_name"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "listTasks",
      description: "List tasks on a specific board. Can filter by status or assignee.",
      parameters: {
        type: "object",
        properties: {
          board_id: { type: "string", description: "UUID of the board" },
          status: { type: "string", description: "Filter by status" },
          assignee_id: { type: "string", description: "Filter by assignee UUID" },
        },
        required: ["board_id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "suggestAssignment",
      description: "Suggest the best team member to assign a task to, based on skills match, current workload, and completion history. Provide either a task_id (existing task) or a task title and board_id (for a new/hypothetical task).",
      parameters: {
        type: "object",
        properties: {
          task_id: { type: "string", description: "UUID of an existing task to find the best assignee for" },
          board_id: { type: "string", description: "UUID of the board (required if no task_id)" },
          task_title: { type: "string", description: "Title/description of the task (used if no task_id)" },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "suggestSprintPlan",
      description: "Suggest which backlog stories to include in the next sprint based on team capacity, skills, and story priorities. Optionally specify a capacity in story points.",
      parameters: {
        type: "object",
        properties: {
          capacity: { type: "number", description: "Sprint capacity in story points (default: 40)" },
        },
        required: [],
      },
    },
  },
];

// Tool execution functions
export async function executeTool(name, args) {
  try {
    switch (name) {
      case "listTeamMembers": {
        const users = await User.listAll();
        return users.map(u => ({
          id: u.id,
          name: u.full_name,
          email: u.email,
          role: u.role,
          job_title: u.job_title || null,
          department: u.department || null,
          description: u.description || null,
          skills: u.skills || [],
        }));
      }

      case "listBoards": {
        const boards = await Board.list("-updated_date");
        return boards.map(b => ({
          id: b.id,
          title: b.title,
          description: b.description,
          columns: (b.columns || []).map(c => ({ id: c.id, title: c.title, type: c.type })),
          groups: (b.groups || []).map(g => ({ id: g.id, title: g.title })),
        }));
      }

      case "createTask": {
        const { board_id, title, group_id, status, assignee_id } = args;
        let boards;
        try {
          boards = await Board.filter({ id: board_id });
        } catch (err) {
          return { error: `Could not access board (${board_id}). It may belong to another user or not exist.` };
        }
        const board = boards?.[0];
        if (!board) return { error: `Board not found (${board_id}). Make sure this board exists and belongs to your workspace.` };

        const targetGroup = group_id || (board.groups?.[0]?.id) || "default";
        const taskData = {
          board_id,
          title,
          group_id: targetGroup,
          data: {},
        };

        if (status) {
          const statusCol = board.columns?.find(c => c.type === "status");
          if (statusCol) taskData.data[statusCol.id] = status;
        }

        if (assignee_id) {
          const personCol = board.columns?.find(c => c.type === "person");
          if (personCol) taskData.data[personCol.id] = assignee_id;
        }

        try {
          const created = await Item.create(taskData);
          return { success: true, task_id: created.id, title: created.title, board: board.title };
        } catch (err) {
          return { error: `Failed to create task: ${err.message}` };
        }
      }

      case "assignTask": {
        const { task_id, assignee_name } = args;
        const users = await User.search(assignee_name);
        if (!users || users.length === 0) return { error: `No team member found matching "${assignee_name}"` };
        const assignee = users[0];

        const task = await Item.get(task_id);
        if (!task) return { error: "Task not found" };

        let boards;
        try {
          boards = await Board.filter({ id: task.board_id });
        } catch (err) {
          return { error: `Could not access the task's board. It may belong to another user.` };
        }
        const board = boards?.[0];
        if (!board) return { error: "Could not find the board this task belongs to." };
        const personCol = board.columns?.find(c => c.type === "person");

        if (personCol) {
          const updatedData = { ...task.data, [personCol.id]: assignee.id };
          await Item.update(task_id, { data: updatedData });
          return { success: true, task: task.title, assigned_to: assignee.full_name };
        }
        return { error: "Board doesn't have a person column for assignments" };
      }

      case "listTasks": {
        const { board_id, status, assignee_id } = args;
        let items;
        try {
          items = await Item.filter({ board_id });
        } catch (err) {
          return { error: `Could not access tasks for board (${board_id}). It may belong to another user.` };
        }

        let filtered = items || [];
        if (status || assignee_id) {
          let boards;
          try {
            boards = await Board.filter({ id: board_id });
          } catch {
            boards = [];
          }
          const board = boards[0];
          const statusCol = board?.columns?.find(c => c.type === "status");
          const personCol = board?.columns?.find(c => c.type === "person");

          if (status && statusCol) {
            filtered = filtered.filter(i => i.data?.[statusCol.id] === status);
          }
          if (assignee_id && personCol) {
            filtered = filtered.filter(i => i.data?.[personCol.id] === assignee_id);
          }
        }

        return filtered.map(i => ({
          id: i.id,
          title: i.title,
          group_id: i.group_id,
          data: i.data,
        }));
      }

      case "suggestAssignment": {
        const { task_id, board_id, task_title } = args;

        let task;
        let targetBoardId;

        if (task_id) {
          task = await Item.get(task_id);
          if (!task) return { error: "Task not found" };
          targetBoardId = task.board_id;
        } else if (board_id && task_title) {
          task = { title: task_title, data: {} };
          targetBoardId = board_id;
        } else {
          return { error: "Provide either task_id, or both board_id and task_title" };
        }

        let boards;
        try {
          boards = await Board.filter({ id: targetBoardId });
        } catch {
          return { error: "Could not access the board." };
        }
        const board = boards?.[0];
        if (!board) return { error: "Board not found" };

        const [members, allItems] = await Promise.all([
          User.listAll(),
          Item.filter({ board_id: targetBoardId }),
        ]);

        const suggestions = suggestAssignees(task, members, allItems, board.columns || []);
        const top = suggestions.slice(0, 5);

        return {
          task: task.title,
          suggestions: top.map(s => ({
            name: s.member.name,
            id: s.member.id,
            role: s.member.role,
            score: Math.round(s.score * 100),
            competency: Math.round(s.competency * 100),
            availability: Math.round(s.availability * 100),
            performance: Math.round(s.performance * 100),
            reasoning: s.reasoning,
          })),
        };
      }

      case "suggestSprintPlan": {
        const { capacity } = args;

        const [stories, members] = await Promise.all([
          UserStory.list("-created_date"),
          User.listAll(),
        ]);

        // Filter to unassigned/backlog stories (no sprint_id)
        const backlogStories = (stories || []).filter(s => !s.sprint_id);
        if (backlogStories.length === 0) {
          return { message: "No stories in the backlog to plan with." };
        }

        const plan = suggestSprintComposition(backlogStories, members, capacity);

        return {
          plan: plan.selected,
          totalPoints: plan.totalPoints,
          capacity: plan.capacity,
          reasoning: plan.reasoning,
        };
      }

      default:
        return { error: `Unknown tool: ${name}` };
    }
  } catch (err) {
    return { error: `Tool "${name}" failed: ${err.message}` };
  }
}
