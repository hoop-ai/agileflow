import { User } from "@/api/entities/User";
import { Board } from "@/api/entities/Board";
import { Item } from "@/api/entities/Item";

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
];

// Tool execution functions
export async function executeTool(name, args) {
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
      const boards = await Board.filter({ id: board_id });
      const board = boards[0];
      if (!board) return { error: "Board not found" };

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

      const created = await Item.create(taskData);
      return { success: true, task_id: created.id, title: created.title, board: board.title };
    }

    case "assignTask": {
      const { task_id, assignee_name } = args;
      const users = await User.search(assignee_name);
      if (!users || users.length === 0) return { error: `No team member found matching "${assignee_name}"` };
      const assignee = users[0];

      const task = await Item.get(task_id);
      if (!task) return { error: "Task not found" };

      const boards = await Board.filter({ id: task.board_id });
      const board = boards[0];
      const personCol = board?.columns?.find(c => c.type === "person");

      if (personCol) {
        const updatedData = { ...task.data, [personCol.id]: assignee.id };
        await Item.update(task_id, { data: updatedData });
        return { success: true, task: task.title, assigned_to: assignee.full_name };
      }
      return { error: "Board doesn't have a person column for assignments" };
    }

    case "listTasks": {
      const { board_id, status, assignee_id } = args;
      const items = await Item.filter({ board_id });

      let filtered = items;
      if (status || assignee_id) {
        const boards = await Board.filter({ id: board_id });
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

    default:
      return { error: `Unknown tool: ${name}` };
  }
}
