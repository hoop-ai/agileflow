  // ─────────────────────────────────────────────
  // 1. GETTING STARTED
  // ─────────────────────────────────────────────
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of AgileFlow and set up your workspace',
    icon: 'Rocket',
    articles: [
      {
        id: 'welcome',
        title: 'Welcome to AgileFlow',
        description: 'Comprehensive overview of the platform, its purpose, and who it serves',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow is a modern, full-featured project management platform built for teams that want to move fast without losing visibility. Inspired by tools like Monday.com, AgileFlow organizes your work into boards, where each board represents a project, a workstream, or any collection of related tasks. Every board is a structured workspace with rows of tasks, customizable columns for tracking data, and groups that let you categorize work into meaningful sections. The result is a flexible system that adapts to how your team actually works, whether you follow Scrum, Kanban, or your own hybrid methodology.',
          },
          {
            type: 'heading',
            text: 'What Makes AgileFlow Different',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow is not just a task tracker. It is a complete project management ecosystem that combines board-based task management, sprint planning, product backlog management, team analytics, calendar scheduling, and an AI assistant into a single cohesive platform. Instead of juggling multiple tools for different aspects of project management, AgileFlow brings everything together so your team has one source of truth.',
          },
          {
            type: 'paragraph',
            text: 'The board concept is central to how AgileFlow works. Think of a board as a smart spreadsheet designed for project management. Each row is a task, and each column captures a specific piece of information about that task, such as its status, who is responsible, when it is due, or how much budget it requires. You can view the same board data in four different ways: as a table, a Kanban board, a calendar, or a timeline. This means you never have to re-enter data just to see it from a different angle.',
          },
          {
            type: 'heading',
            text: 'Core Capabilities',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Board Management — Create unlimited project boards with 11 column types, multiple groups, and four view modes (Table, Kanban, Calendar, Timeline) to organize any kind of work',
              'Sprint Planning — Plan time-boxed sprints with capacity tracking, story point estimation, and velocity metrics that help you commit to realistic goals',
              'Product Backlog — Maintain a prioritized backlog of user stories with acceptance criteria, story points, and priority levels that feed directly into sprint planning',
              'Team Analytics — Visualize project health with charts for status distribution, team workload, priority breakdown, completion rates, and overdue task tracking',
              'Calendar Scheduling — Plan meetings, milestones, deadlines, and retrospectives on a shared monthly calendar with color-coded event types',
              'AI Assistant — Get intelligent help with task assignment, sprint recommendations, performance analysis, and general project questions through both a floating panel and a dedicated chat page',
              'Role-Based Access — Control who can do what with three permission levels: Admin, Member, and Viewer, each with clearly defined capabilities',
              'Dark Mode — Work comfortably in any lighting condition with full light mode, dark mode, and automatic system detection support',
            ],
          },
          {
            type: 'heading',
            text: 'Who Is AgileFlow For?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow is designed for cross-functional teams of any size that build products, manage projects, or coordinate work across multiple people. It serves everyone from individual contributors tracking their own tasks to engineering managers overseeing multi-sprint release cycles.',
          },
          {
            type: 'list',
            items: [
              'Project Managers — Oversee boards, track milestones, monitor team workload, generate reports, and ensure deadlines are met across all projects',
              'Software Developers — Manage daily tasks, update work status, track sprint commitments, and reference acceptance criteria for user stories',
              'Product Owners — Write and prioritize user stories in the backlog, plan sprints with realistic capacity, and track feature delivery across iterations',
              'Team Leads — Monitor team performance through analytics dashboards, balance workload distribution, and identify bottlenecks before they become blockers',
              'Scrum Masters — Facilitate sprint ceremonies using AgileFlow data, track velocity trends, monitor sprint health through capacity indicators, and use retrospective insights to improve processes',
              'Designers and Marketers — Track creative tasks, manage campaign timelines, organize deliverables by deadline, and coordinate cross-functional handoffs',
            ],
          },
          {
            type: 'heading',
            text: 'Design Philosophy',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow follows a clean, minimal design language inspired by modern productivity tools. The interface stays out of your way so you can focus on the work itself. There are no unnecessary animations, no decorative gradients, and no visual noise. Every element on screen serves a purpose. The color palette is carefully chosen for readability in both light and dark modes, with status colors, priority indicators, and event types using consistent, meaningful color coding throughout the platform.',
          },
          {
            type: 'tip',
            text: 'AgileFlow works best when your whole team is on the platform. Boards, sprints, and analytics all benefit from having accurate assignment and status data from every team member. Invite your teammates early to get the most out of collaboration features.',
          },
        ],
      },
      {
        id: 'create-account',
        title: 'Creating Your Account',
        description: 'Sign up, configure your profile, set your avatar, and choose your theme',
        content: [
          {
            type: 'paragraph',
            text: 'Getting started with AgileFlow takes less than a minute. The platform uses email and password authentication powered by Supabase, a secure backend infrastructure. There is no credit card required, no trial period to worry about, and no complicated onboarding wizard. You create an account, and you are immediately in your workspace ready to create your first board.',
          },
          {
            type: 'heading',
            text: 'Creating Your Account',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Open your web browser and navigate to the AgileFlow application URL.',
              'You will see the login page with fields for email and password. Below the login form, look for the "Create account" or "Sign up" link.',
              'Click the sign-up link to switch to the registration form.',
              'Enter your full name. This is how your teammates will see you across the platform, in assignments, activity feeds, and people columns.',
              'Enter a valid email address. This will be your login credential and the address used for any notifications.',
              'Choose a strong password. Use a mix of letters, numbers, and symbols for security.',
              'Click the "Sign Up" button to create your account.',
              'The system will create your account and automatically sign you in. You will be redirected to the Dashboard, which is your home screen.',
            ],
          },
          {
            type: 'heading',
            text: 'Your Profile and Avatar',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Once you are signed in, AgileFlow automatically generates a personalized avatar for you. Your avatar displays your initials (the first letters of your first and last name) on a uniquely colored circular background. This color is assigned automatically and remains consistent across the platform, making it easy for teammates to identify you in people columns, task assignments, and activity feeds.',
          },
          {
            type: 'paragraph',
            text: 'To complete your profile, navigate to Settings from the sidebar. Under the Profile tab, you can update your full name, job title, and department. Your profile information helps teammates understand your role and makes collaboration smoother. Every time you are assigned a task, mentioned in an activity feed, or appear in an analytics chart, your name and avatar are displayed, so keeping your profile accurate is important.',
          },
          {
            type: 'heading',
            text: 'Choosing Your Theme',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow supports three theme modes to match your visual preference and working environment. You can switch themes at any time, and your preference is saved to your account so it persists across sessions and devices.',
          },
          {
            type: 'list',
            items: [
              'Light Mode — A clean, bright interface with white backgrounds and dark text. Ideal for well-lit environments and daytime use.',
              'Dark Mode — A dark interface with muted backgrounds and light text. Reduces eye strain in low-light environments and saves battery on OLED screens.',
              'System (Auto-Detect) — Automatically matches your operating system preference. If your OS switches to dark mode at sunset, AgileFlow follows along without you lifting a finger.',
            ],
          },
          {
            type: 'steps',
            items: [
              'To quickly toggle between light and dark mode, click the sun or moon icon in the top navigation bar.',
              'For more control, go to Settings and select the Appearance section, where you can choose between Light, Dark, or System.',
            ],
          },
          {
            type: 'heading',
            text: 'Roles and Permissions',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'When you first create an account, you are assigned the Member role by default. This gives you full access to create boards, manage tasks, plan sprints, and use all standard features. If an administrator changes your role, your available actions will change accordingly. There are three roles in AgileFlow:',
          },
          {
            type: 'list',
            items: [
              'Admin — Full access to everything, plus the ability to manage users, change roles, reset passwords, and access the Admin panel.',
              'Member — Can create boards, add and edit tasks, plan sprints, manage backlog stories, and use the AI assistant. This is the default role for new users.',
              'Viewer — Read-only access to boards and data. Viewers cannot create, edit, drag, or delete anything. The interface hides action buttons and edit controls for viewers.',
            ],
          },
          {
            type: 'tip',
            text: 'Your avatar color is generated automatically based on your user account and stays consistent everywhere. You do not need to upload a profile picture, though the initials-based avatar works well for team identification.',
          },
        ],
      },
      {
        id: 'quick-start',
        title: 'Quick Start Guide',
        description: 'Step-by-step: create your first board, add tasks, and start managing work',
        content: [
          {
            type: 'paragraph',
            text: 'This guide walks you through everything you need to go from a fresh account to a fully functional project board with tasks, assignees, and organized groups. Follow each step in order, and you will be productive in under five minutes. By the end, you will have created a board, customized its columns, added tasks, organized them into groups, and invited a teammate.',
          },
          {
            type: 'heading',
            text: 'Step 1: Create Your First Board',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Boards are the foundation of AgileFlow. Every project, sprint, or workstream gets its own board. When you create a board, it automatically comes pre-configured with a sensible default structure so you can start adding tasks immediately.',
          },
          {
            type: 'steps',
            items: [
              'Click "Boards" in the left sidebar to navigate to the Boards page.',
              'Click the "+ New Board" button in the top-right corner of the page.',
              'Enter a title for your board. Choose something descriptive like "Sprint 1 — User Authentication" or "Q2 Marketing Campaign".',
              'Optionally add a description to provide context about the board\'s purpose. This helps teammates understand the scope.',
              'Choose an icon emoji that visually represents the project. This appears in the sidebar and board listings.',
              'Select a color theme for the board header. Colors help differentiate boards at a glance.',
              'Click "Create Board" to finalize. The board opens automatically.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Your new board arrives with six default columns already configured: Task (the title column), Status (with Not Started, Working on it, Done, and Stuck options), Owner (a People column for assigning team members), Priority (with Low, Medium, High, and Critical levels), Due Date (a date picker column), and Notes (a text column for additional context). It also creates three default groups: To Do, In Progress, and Done. This default structure covers the most common project management needs, and you can customize it at any time.',
          },
          {
            type: 'heading',
            text: 'Step 2: Explore the Default Columns',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Before adding tasks, take a moment to understand the default columns. Each column type has a specific editor that appears when you click on a cell.',
          },
          {
            type: 'list',
            items: [
              'Task — The title of each task. Click to edit the text directly, or click to open the full Task Edit Modal.',
              'Status — Click to see a dropdown with colored options: Not Started (gray), Working on it (amber), Done (green), and Stuck (red).',
              'Owner — Click to open a team member dropdown with avatars and full names. Select a person to assign them.',
              'Priority — Click to see a dropdown with colored levels: Low (light blue), Medium (blue), High (orange), and Critical (red).',
              'Due Date — Click to open a calendar date picker. Select a date to set the deadline.',
              'Notes — Click to type free-form text. Useful for descriptions, links, or context.',
            ],
          },
          {
            type: 'heading',
            text: 'Step 3: Add Custom Columns',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'If the default six columns are not enough, you can add more to track additional data points. AgileFlow supports 11 column types in total.',
          },
          {
            type: 'steps',
            items: [
              'Look for the "+" icon at the end of the column header row.',
              'Click it to open the New Column dialog.',
              'Enter a name for the column (e.g., "Story Points", "Sprint", "Tags").',
              'Select a column type from the dropdown: Text, Status, Priority, Date, People, Number, Budget, Checkbox, Dropdown, Tags, or Timeline.',
              'If you selected Dropdown, you will be prompted to define custom options with labels and colors.',
              'Click "Add Column" to insert the new column into the board.',
              'The column appears at the end of the header row. All existing tasks now have an empty cell for this column.',
            ],
          },
          {
            type: 'heading',
            text: 'Step 4: Add Tasks',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Tasks are the individual work items on your board. Each task is a row with data in each column. You can add as many tasks as you need.',
          },
          {
            type: 'steps',
            items: [
              'Find the "+ Add Item" button at the bottom of any group (e.g., at the bottom of "To Do").',
              'Click it and type a descriptive task title. Be specific: "Design login page mockup" is better than "Design".',
              'Press Enter or click the add button to create the task.',
              'The new task appears as a row in the group. All column cells are empty and ready to fill in.',
              'Click on the Status cell and select "Not Started" (or whichever status applies).',
              'Click on the Owner cell and assign a team member from the dropdown.',
              'Click on the Priority cell and set the appropriate priority level.',
              'Click on the Due Date cell and pick a deadline from the calendar.',
              'Click on the Notes cell and add any relevant context, links, or descriptions.',
              'Repeat to add more tasks. Each group can hold as many tasks as you need.',
            ],
          },
          {
            type: 'heading',
            text: 'Step 5: Organize with Groups',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Groups are sections within your board that categorize tasks. The default groups (To Do, In Progress, Done) follow a basic workflow, but you can create your own groups to match how your team thinks about work.',
          },
          {
            type: 'steps',
            items: [
              'Click the "New Group" button in the board toolbar to create a new group.',
              'Name the group something meaningful, like "Frontend", "Bug Fixes", "Sprint Backlog", or "Blocked".',
              'Choose a color for the group header to help visually distinguish it from other groups.',
              'Click "Create" to add the group. It appears on the board ready for tasks.',
              'Drag tasks from other groups into the new group, or add new tasks directly into it.',
            ],
          },
          {
            type: 'heading',
            text: 'Step 6: Invite Your Team',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow is most powerful when your entire team is on the platform. Inviting teammates allows you to assign tasks, track workload across the team, and collaborate in real time.',
          },
          {
            type: 'steps',
            items: [
              'Click the "Invite" button in the sidebar or board header area.',
              'Enter a teammate\'s email address.',
              'Select a role for them: Admin, Member, or Viewer.',
              'Click "Send Invite" to add them to your workspace.',
              'The invited person will need to create their own AgileFlow account using the same email address.',
              'Once they sign up and log in, they will have access to shared boards based on their assigned role.',
            ],
          },
          {
            type: 'warning',
            text: 'Team members must create their own account using the exact email address you invited them with. If they sign up with a different email, they will not be linked to your workspace.',
          },
          {
            type: 'tip',
            text: 'After creating your first board and adding a few tasks, try switching between views. Click the Kanban tab to see your tasks as cards organized by status. Click Timeline to see tasks on a Gantt chart. Each view shows the same data in a different way.',
          },
        ],
      },
      {
        id: 'understanding-interface',
        title: 'Understanding the Interface',
        description: 'Master the sidebar, top bar, search, AI assistant, and every UI element',
        content: [
          {
            type: 'paragraph',
            text: 'The AgileFlow interface is organized into three main areas: a collapsible sidebar for navigation, a top navigation bar for global actions, and a main content area where you interact with boards, backlogs, calendars, and other features. The layout is consistent across every page, so once you learn the structure, navigating becomes second nature.',
          },
          {
            type: 'heading',
            text: 'Sidebar Navigation',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The left sidebar is your primary navigation hub. It contains links to every major section of AgileFlow, organized from top to bottom in the order most teams use them. The sidebar is always visible on desktop screens and collapses into a hamburger menu on mobile devices and narrow browser windows.',
          },
          {
            type: 'list',
            items: [
              'Dashboard — Your home screen showing stats, recent boards, activity feed, and quick actions. This is where you land after logging in.',
              'Boards — A listing of all your project boards. Click any board to open it. Use the search bar to find boards by name.',
              'Backlog — Your product backlog with user stories and sprint planning. This is where you write stories, estimate effort, and plan sprints.',
              'Calendar — A monthly calendar view for scheduling meetings, milestones, deadlines, retrospectives, and other events.',
              'Analytics — Charts and metrics showing project health across all your boards, including completion rates, status distribution, team workload, and priority breakdown.',
              'AI Chat — A dedicated full-page AI assistant with conversation history, session management, and support for both Fast and Thinking response modes.',
            ],
          },
          {
            type: 'paragraph',
            text: 'At the bottom of the sidebar, you will find the user menu area. This provides access to Settings (profile, appearance, preferences), the Admin Panel (visible only to Admin-role users), the Help Center (the documentation you are reading now), and the Sign Out option. Your name and avatar appear here so you can confirm which account you are logged into.',
          },
          {
            type: 'heading',
            text: 'Top Navigation Bar',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The top bar runs across the full width of the page and contains global actions that are available regardless of which page you are on.',
          },
          {
            type: 'list',
            items: [
              'Global Search — A search input (or the Ctrl+K shortcut trigger) that lets you search across all boards and tasks instantly. Results are grouped and clickable.',
              'Notifications — A bell icon that shows a badge when you have unread notifications. Click it to see recent activity such as task assignments, status changes, sprint updates, and system alerts.',
              'Theme Toggle — A sun or moon icon that instantly switches between light and dark mode. One click swaps the entire interface color scheme.',
              'Profile Menu — Your avatar and name, which when clicked, provides access to profile settings and account options.',
            ],
          },
          {
            type: 'heading',
            text: 'Main Content Area',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The main content area takes up the majority of the screen and displays whatever page you have navigated to. On the Dashboard, you see stats and activity. On a Board, you see the table or Kanban view. On the Backlog page, you see user stories and sprints. The content area is fully responsive, adapting its layout for desktop, tablet, and mobile screens.',
          },
          {
            type: 'heading',
            text: 'Mobile and Responsive Behavior',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'On smaller screens (tablets and phones), the sidebar collapses automatically. A hamburger menu icon appears in the top-left corner of the screen. Tap this icon to slide the sidebar open. Tap anywhere outside the sidebar or select a navigation item to close it. All features remain accessible on mobile; the layout simply stacks vertically rather than using side-by-side panels.',
          },
          {
            type: 'heading',
            text: 'AI Assistant Access Points',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow provides two ways to interact with the AI assistant, each suited to different use cases.',
          },
          {
            type: 'list',
            items: [
              'Floating Chat Panel — A chat bubble icon in the bottom-right corner of any page. Click it to open a compact AI chat panel overlaid on your current view. This is ideal for quick questions, getting suggestions while working on a board, or running slash commands without leaving your current context.',
              'AI Chat Page — A full-page chat experience accessible from the "AI Chat" link in the sidebar. This provides a larger conversation area, session history (so you can revisit past conversations), mode selection (Fast vs. Thinking), and suggestion chips for common prompts. Use this when you want a dedicated, distraction-free AI interaction.',
            ],
          },
          {
            type: 'heading',
            text: 'Global Search (Ctrl+K)',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Press Ctrl+K (or Cmd+K on Mac) at any time to open the global search dialog. This is the fastest way to find anything in AgileFlow. As you type, results appear in real time, grouped by boards and tasks. Click any result to navigate directly to that board or task. The search dialog can also be opened by clicking the search icon in the top navigation bar.',
          },
          {
            type: 'shortcut',
            keys: 'Ctrl + K',
            description: 'Open global search from anywhere in the application',
          },
          {
            type: 'tip',
            text: 'You can access Settings, the Admin Panel (if you are an Admin), the Help Center, and Sign Out from the user dropdown menu at the bottom of the sidebar. This menu is always accessible regardless of which page you are on.',
          },
        ],
      },
      {
        id: 'agile-methodology',
        title: 'Agile Methodology in AgileFlow',
        description: 'Learn Scrum, Kanban, sprints, user stories, and how they map to AgileFlow features',
        content: [
          {
            type: 'paragraph',
            text: 'Agile is a set of principles for software development and project management that emphasizes iterative delivery, team collaboration, and continuous improvement. Rather than planning an entire project upfront and delivering everything at the end, agile teams break work into small, manageable increments and deliver value frequently. AgileFlow is built around these principles, providing tools that directly support agile workflows.',
          },
          {
            type: 'heading',
            text: 'Scrum Framework',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Scrum is the most popular agile framework. It organizes work into fixed-length iterations called sprints, typically lasting one to four weeks. Each sprint begins with a planning session where the team selects work from a prioritized backlog, and ends with a review of what was accomplished and a retrospective to discuss process improvements.',
          },
          {
            type: 'paragraph',
            text: 'In AgileFlow, Scrum maps directly to the platform\'s features. The Backlog page serves as your product backlog where you write and prioritize user stories. The Sprint Planning feature lets you create sprints, set capacity, and drag stories from the backlog into a sprint. During the sprint, you track progress on boards using status columns and the Kanban view. At the end of the sprint, analytics data and the AI /performance command provide the data you need for retrospectives.',
          },
          {
            type: 'heading',
            text: 'Kanban Method',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Kanban is a visual workflow management method that focuses on limiting work in progress and optimizing the flow of tasks through stages. Unlike Scrum, Kanban does not use fixed sprints; instead, work flows continuously from "to do" through "in progress" to "done."',
          },
          {
            type: 'paragraph',
            text: 'AgileFlow supports Kanban through the Kanban board view, available on any board. Tasks appear as cards in columns representing workflow stages (Not Started, Working on it, Done, Stuck). You drag cards between columns to advance work. The visual layout makes it easy to spot bottlenecks, for example, if your "Working on it" column has twenty cards while "Done" has two, your team may be starting too much work without finishing it.',
          },
          {
            type: 'heading',
            text: 'User Stories',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'A user story is a short description of a feature or requirement written from the user\'s perspective. The standard format is: "As a [type of user], I want [some goal] so that [some reason]." User stories focus on the value delivered to the user rather than technical implementation details.',
          },
          {
            type: 'paragraph',
            text: 'In AgileFlow, user stories live on the Backlog page. Each story has a title (often in the "As a... I want... so that..." format), a description for additional detail, a priority level, story points for effort estimation, and acceptance criteria that define when the story is complete. Stories can be assigned to sprints during sprint planning.',
          },
          {
            type: 'heading',
            text: 'Story Points and Estimation',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Story points are a unit of measure for estimating the effort required to complete a user story. They are intentionally abstract and relative, not tied to hours or days. A story worth 2 points is roughly twice the effort of a 1-point story, but the actual hours may vary.',
          },
          {
            type: 'paragraph',
            text: 'AgileFlow uses the Fibonacci sequence for story point values: 1, 2, 3, 5, 8, and 13. The increasing gaps in the sequence reflect the increasing uncertainty in larger estimates. A 1-point story is something small and well-understood. A 13-point story is a large, complex piece of work that should probably be broken into smaller stories.',
          },
          {
            type: 'list',
            items: [
              '1 point — Trivial change, well understood, minimal risk (e.g., fix a typo, change a label)',
              '2 points — Small task, clear scope, low complexity (e.g., add a form field, update a color)',
              '3 points — Moderate task, some complexity, clear approach (e.g., build a new component, add validation)',
              '5 points — Significant task, multiple parts, some unknowns (e.g., integrate a new API, redesign a page)',
              '8 points — Large task, substantial complexity, considerable risk (e.g., new feature with backend changes)',
              '13 points — Very large task, high uncertainty, should consider splitting (e.g., full module rewrite, new system integration)',
            ],
          },
          {
            type: 'heading',
            text: 'Velocity',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Velocity is the number of story points a team completes in a single sprint. Over time, velocity data creates a reliable baseline for sprint planning. If your team has averaged 25 points per sprint over the last three sprints, you can plan the next sprint with confidence that 25 points is a realistic commitment.',
          },
          {
            type: 'paragraph',
            text: 'AgileFlow tracks velocity automatically. As you complete sprints and mark stories as done, the Analytics page records your historical velocity. The AI assistant can also analyze your velocity trends when you use the /performance command.',
          },
          {
            type: 'heading',
            text: 'Burndown Charts',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'A burndown chart shows the amount of work remaining in a sprint over time. The ideal line goes from the total committed points on day one down to zero on the last day. The actual line shows how the team is progressing. If the actual line is above the ideal line, the team is behind schedule. If it is below, the team is ahead.',
          },
          {
            type: 'paragraph',
            text: 'AgileFlow provides burndown data through the Analytics page and sprint tracking features. Use burndown trends to identify when the team is falling behind early in the sprint, rather than discovering it on the last day.',
          },
          {
            type: 'heading',
            text: 'Acceptance Criteria',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Acceptance criteria are specific, testable conditions that a user story must satisfy to be considered complete. They remove ambiguity about what "done" means and give developers clear targets to implement and testers clear criteria to verify.',
          },
          {
            type: 'paragraph',
            text: 'In AgileFlow, every user story has an acceptance criteria field where you can list these conditions. Good acceptance criteria are written in plain language and describe observable outcomes. For example: "When the user clicks Submit, the form data is saved and a confirmation message appears within 2 seconds."',
          },
          {
            type: 'heading',
            text: 'How Agile Concepts Map to AgileFlow',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Product Backlog → Backlog page with prioritized user stories',
              'Sprint → Sprint Planning feature with capacity, dates, and goals',
              'Sprint Planning → Plan Sprint dialog with story selection and capacity indicator',
              'Daily Standup → Kanban view showing current work status at a glance',
              'Sprint Review → Board analytics showing completion rates and task distribution',
              'Sprint Retrospective → AI /performance command and analytics data for team reflection',
              'User Story → Backlog story with title, description, priority, points, and acceptance criteria',
              'Task Board → AgileFlow Board with Table, Kanban, Calendar, and Timeline views',
              'Velocity → Automatically tracked story points completed per sprint in Analytics',
              'Burndown → Sprint progress tracking with committed vs. completed point comparisons',
            ],
          },
          {
            type: 'tip',
            text: 'You do not need to follow Scrum perfectly to benefit from AgileFlow. Many teams use a hybrid approach: they maintain a backlog, run informal sprints, and use Kanban boards for daily work. AgileFlow is flexible enough to support whatever methodology works best for your team.',
          },
        ],
      },
      {
        id: 'keyboard-shortcuts',
        title: 'Keyboard Shortcuts & Navigation',
        description: 'Speed up your workflow with keyboard shortcuts and navigation tips',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow supports keyboard shortcuts to help you navigate faster and perform common actions without reaching for the mouse. Power users can significantly speed up their workflow by learning these shortcuts, especially the global search shortcut which is the fastest way to get anywhere in the application.',
          },
          {
            type: 'heading',
            text: 'Global Search Shortcut',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The most important keyboard shortcut in AgileFlow is the global search. Press Ctrl+K (or Cmd+K on Mac) from any page to instantly open the search dialog. This searches across all boards and tasks, showing results as you type. Click any result to jump directly to that board or task. This is the fastest way to navigate when you know what you are looking for.',
          },
          {
            type: 'shortcut',
            keys: 'Ctrl + K',
            description: 'Open global search dialog from any page',
          },
          {
            type: 'heading',
            text: 'Theme Toggle',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Click the sun or moon icon in the top navigation bar to toggle between light and dark mode. While there is no dedicated keyboard shortcut for this, the icon is always accessible in the top bar for quick access.',
          },
          {
            type: 'heading',
            text: 'Sidebar Navigation',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The sidebar provides single-click access to all major sections. On desktop, the sidebar is always visible. On mobile or narrow windows, tap the hamburger menu icon to open the sidebar. Each sidebar item corresponds to a page: Dashboard, Boards, Backlog, Calendar, Analytics, and AI Chat.',
          },
          {
            type: 'heading',
            text: 'Inline Editing',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'When working in the Table view on a board, you can click any cell to edit it directly. For text fields, typing immediately replaces the content. For dropdown fields (Status, Priority, People), clicking opens the selection menu. For date fields, clicking opens the calendar picker. For checkbox fields, a single click toggles the value. Press Enter or Tab to confirm edits and move to the next field.',
          },
          {
            type: 'heading',
            text: 'Drag and Drop',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Drag and drop is a core interaction pattern in AgileFlow. In the Table view, click and hold a task row to drag it to a new position within the same group or into a different group. In the Kanban view, grab a card and drag it to a different column to update its status. In the Backlog, drag stories to reorder them by priority. All drag and drop changes save automatically.',
          },
          {
            type: 'heading',
            text: 'Navigation Tips',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Use Ctrl+K to jump to any board or task without clicking through the sidebar',
              'Click your browser\'s back button to return to the previous page within AgileFlow',
              'Collapse sidebar groups on boards to focus on specific sections of work',
              'Use the view selector tabs (Table, Kanban, Calendar, Timeline) to switch perspectives without losing data',
              'Click on board names in the Dashboard\'s Recent Boards section to jump directly into a board',
              'Use the filter and sort tools on boards to narrow down to exactly the tasks you need',
              'On the Calendar page, use the arrow buttons to navigate between months quickly',
            ],
          },
          {
            type: 'tip',
            text: 'The global search shortcut (Ctrl+K) is the single most powerful navigation tool in AgileFlow. If you only learn one shortcut, make it this one. It lets you jump to any board or task in seconds, regardless of which page you are currently on.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. DASHBOARD
  // ─────────────────────────────────────────────
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Your central hub for project overview, metrics, and quick actions',
    icon: 'LayoutGrid',
    articles: [
      {
        id: 'dashboard-overview',
        title: 'Dashboard Overview',
        description: 'Understand the layout, data loading, and purpose of every Dashboard section',
        content: [
          {
            type: 'paragraph',
            text: 'The Dashboard is your home screen in AgileFlow. It is the first page you see after logging in, and it is designed to give you a complete snapshot of your project health in a single glance. Rather than forcing you to visit multiple pages to understand what is happening across your projects, the Dashboard aggregates the most important information into one view: key performance metrics, your most recently updated boards, a feed of recent activity, and shortcut buttons for common actions.',
          },
          {
            type: 'heading',
            text: 'Dashboard Layout',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Dashboard is organized into four distinct sections, each serving a specific purpose. These sections are arranged vertically on the page, with the most important information at the top.',
          },
          {
            type: 'list',
            items: [
              'Greeting Banner — At the top of the page, a personalized greeting based on the time of day welcomes you by name. This confirms you are logged into the correct account and provides a human touch to the experience.',
              'Stats Overview — Four KPI (Key Performance Indicator) cards arranged in a row, showing Total Tasks, Active Boards, Team Members, and Completion Rate. These numbers update in real time as you create and complete work.',
              'Recent Boards — A grid of your most recently updated project boards, showing each board\'s title, icon, color, and a link to open it. This gives you quick access to the projects you are currently working on without navigating to the Boards page.',
              'Activity Feed — A chronological stream of recent events across all your projects, showing what changed, what was created, and what was completed. Each entry is timestamped and clickable.',
              'Quick Actions — Shortcut buttons to create a new board or a new user story without leaving the Dashboard. These reduce friction for common tasks.',
            ],
          },
          {
            type: 'heading',
            text: 'Real-Time Data Loading',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'When you visit the Dashboard, it fetches the latest data from the server. You may see brief loading indicators (skeleton placeholders or spinners) while data loads. If a network error occurs or the data fails to load, a retry button appears so you can refresh the data without reloading the entire page. This retry mechanism is built into every data section of the Dashboard individually, so a failure in one section does not prevent other sections from loading.',
          },
          {
            type: 'heading',
            text: 'Data Scope',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Dashboard shows data across all your boards and projects. The stats count tasks, boards, and team members from your entire workspace. The Recent Boards section fetches your 10 most recently updated boards. The Activity Feed shows the 20 most recent events. For a complete, unfiltered view of all your projects, navigate to the dedicated Boards, Backlog, or Analytics pages.',
          },
          {
            type: 'tip',
            text: 'Make the Dashboard your starting point each day. A quick look at the stats, recent boards, and activity feed tells you where things stand and what needs your attention, without diving into individual boards.',
          },
        ],
      },
      {
        id: 'stats-metrics',
        title: 'Stats & Metrics',
        description: 'Deep dive into each KPI card: what it measures, how it is calculated, and what to watch for',
        content: [
          {
            type: 'paragraph',
            text: 'The Stats Overview section at the top of the Dashboard displays four metric cards. These are your at-a-glance health indicators, designed to answer the question "How are we doing?" without requiring you to click into any specific board or report. Understanding what each metric measures and what to look for helps you make better decisions about where to focus your team\'s energy.',
          },
          {
            type: 'heading',
            text: 'Total Tasks',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'This card shows the total number of tasks across all your boards, regardless of their status. It includes tasks that are not started, in progress, done, and stuck. This number gives you a sense of the overall scope of work in your workspace. A rapidly growing task count might indicate scope creep or a need to break projects into smaller, more manageable boards.',
          },
          {
            type: 'paragraph',
            text: 'What to watch for: If Total Tasks keeps growing but Completion Rate stays flat or drops, your team may be adding work faster than they can complete it. Consider limiting new task creation until the existing backlog is reduced.',
          },
          {
            type: 'heading',
            text: 'Active Boards',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'This card shows the number of boards in your workspace. Each board represents a project or workstream. This metric helps you understand the breadth of work your team is managing. A high number of active boards might indicate that work is spread across too many projects, making it harder for team members to focus.',
          },
          {
            type: 'paragraph',
            text: 'What to watch for: If you have many active boards but most have very few tasks or have not been updated recently, consider archiving or consolidating inactive boards to reduce noise and improve focus.',
          },
          {
            type: 'heading',
            text: 'Team Members',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'This card shows the number of people collaborating in your workspace. This includes everyone who has an account and is part of your team, regardless of their role (Admin, Member, or Viewer). This number helps you understand the size of your team for capacity planning purposes.',
          },
          {
            type: 'paragraph',
            text: 'What to watch for: If you have a high number of tasks but a low number of team members, your team may be overloaded. Use this ratio to assess whether you need to bring on additional help or reduce scope. Also cross-reference with the Analytics page\'s team workload chart to see how evenly work is distributed.',
          },
          {
            type: 'heading',
            text: 'Completion Rate',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'This card shows the percentage of tasks marked as "Done" across all your boards. It is calculated as: (number of tasks with Done status / total number of tasks) * 100. This is your single most important health metric because it tells you how much of your total work has been completed.',
          },
          {
            type: 'paragraph',
            text: 'What to watch for: A healthy completion rate depends on where you are in a project cycle. Early in a project, a low rate is normal because work is just starting. Mid-project, you want to see the rate climbing steadily. Near a deadline, a stagnant or declining rate is a red flag. If your completion rate seems low, check the Analytics page for a breakdown of which statuses tasks are stuck in — the "Stuck" status often reveals blockers that need attention.',
          },
          {
            type: 'heading',
            text: 'Interpreting Metrics Together',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The four metrics are most valuable when read together. For example, a high task count with a high completion rate means your team is delivering effectively at scale. A high task count with a low completion rate and few team members suggests the team is overwhelmed. Use these signals to decide whether to focus on finishing existing work, redistributing tasks, or adjusting project scope.',
          },
          {
            type: 'tip',
            text: 'If your completion rate seems low, do not assume the team is underperforming. First check if you have many tasks stuck in "Working on it" or "Stuck" status. These tasks may need unblocking, clarification, or reassignment rather than more effort. The Analytics page provides a detailed status distribution chart.',
          },
        ],
      },
      {
        id: 'activity-feed',
        title: 'Activity Feed',
        description: 'How activity tracking works, what appears in the feed, and how to use it',
        content: [
          {
            type: 'paragraph',
            text: 'The Activity Feed on the Dashboard provides a chronological list of recent events across all your projects. It acts as a team-wide changelog, helping you understand what happened while you were away and what your teammates have been working on. The feed is automatically populated; there is nothing you need to configure or enable.',
          },
          {
            type: 'heading',
            text: 'What Appears in the Feed',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Activity Feed captures a wide range of actions that occur within your workspace. Every time a task, board, story, or sprint is created, modified, or completed, an entry is logged.',
          },
          {
            type: 'list',
            items: [
              'Tasks created, updated, or deleted across any board',
              'Status changes on tasks (e.g., a task moved from "Working on it" to "Done")',
              'Priority changes on tasks',
              'New boards created or existing boards renamed',
              'Column additions and modifications on boards',
              'Sprint creation, start, and completion events',
              'User story creation and updates in the backlog',
              'Team member additions and role changes',
              'Assignment changes when tasks are assigned or reassigned to team members',
            ],
          },
          {
            type: 'heading',
            text: 'Timestamps and Navigation',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Each activity entry includes a relative timestamp such as "2 hours ago", "yesterday", or "3 days ago". This helps you quickly gauge how recent the change is. Activity entries are clickable — click on an entry to navigate directly to the related board or task. This lets you drill down into details without searching for the item manually.',
          },
          {
            type: 'heading',
            text: 'Activity Tracking Mechanism',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Activity is tracked automatically by the system. You do not need to manually log actions or enable tracking for specific boards. Every modification to a board, task, or story generates a log entry with the action type, the affected item, and a timestamp. The Dashboard shows the 20 most recent entries; for board-specific activity history, visit the individual board\'s analytics panel.',
          },
          {
            type: 'heading',
            text: 'Using the Feed Effectively',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Activity Feed is most useful during three scenarios: at the start of your workday to catch up on what happened overnight, before a standup meeting to review recent progress, and after being away for a period to understand what changed in your absence. Make it a habit to scan the feed each morning before diving into your tasks.',
          },
          {
            type: 'tip',
            text: 'The Activity Feed shows changes across all your boards. If you want to see activity for a specific board only, open that board and check its analytics panel, which includes board-specific activity history.',
          },
        ],
      },
      {
        id: 'quick-actions',
        title: 'Quick Actions',
        description: 'Create boards and user stories instantly without leaving the Dashboard',
        content: [
          {
            type: 'paragraph',
            text: 'Quick Actions are shortcut buttons on the Dashboard that let you create new items without navigating to a different page. They are designed for capturing ideas and starting new work quickly, reducing the friction between having an idea and recording it in the system.',
          },
          {
            type: 'heading',
            text: 'Available Quick Actions',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Create Board — Opens the board creation dialog directly from the Dashboard. Fill in a title, optional description, icon, and color, then click "Create Board." The new board appears immediately in the Recent Boards section and on the Boards page.',
              'Create Story — Opens the user story creation dialog from the Dashboard. Write a story title, set priority, add story points and acceptance criteria, then click "Create Story." The story is added to your product backlog and can be assigned to a sprint later.',
            ],
          },
          {
            type: 'heading',
            text: 'When to Use Quick Actions',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Quick Actions are ideal when you have a sudden idea or need to capture something quickly. During a meeting, someone might suggest a new project; use Create Board to set it up immediately. During a brainstorming session, use Create Story to log feature ideas into the backlog without interrupting your flow. The dialogs are intentionally streamlined for speed.',
          },
          {
            type: 'paragraph',
            text: 'For more detailed setup such as customizing columns, adding multiple stories at once, or configuring sprint parameters, navigate to the dedicated Boards or Backlog pages where you have access to the full set of tools and options.',
          },
          {
            type: 'heading',
            text: 'What Happens After Creation',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Items created via Quick Actions are fully functional. A board created from the Dashboard is identical to one created from the Boards page; it comes with the default six columns and three groups. A story created from the Dashboard is added to the product backlog with whatever fields you filled in and is immediately available for sprint planning.',
          },
          {
            type: 'tip',
            text: 'Quick Actions are about speed. Do not worry about filling in every field perfectly. You can always edit the board or story later from its dedicated page. The goal is to capture the idea while it is fresh.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. BOARDS & TASKS
  // ─────────────────────────────────────────────
  {
    id: 'boards-tasks',
    title: 'Boards & Tasks',
    description: 'Create boards, manage tasks, and organize your work with views, columns, and groups',
    icon: 'Kanban',
    articles: [
      {
        id: 'creating-board',
        title: 'Creating a Board',
        description: 'Full creation flow, default structure, board settings, and naming best practices',
        content: [
          {
            type: 'paragraph',
            text: 'Boards are the foundation of project management in AgileFlow. Each board represents a project, a workstream, a sprint, or any collection of related tasks. You can create as many boards as you need, and each one operates independently with its own columns, groups, views, and settings. When you create a board, AgileFlow automatically sets up a sensible default structure so you can start working immediately.',
          },
          {
            type: 'heading',
            text: 'How to Create a Board',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Navigate to the Boards page by clicking "Boards" in the left sidebar.',
              'Click the "+ New Board" button in the top-right corner of the page.',
              'Enter a board title. This is the only required field. Choose something descriptive that your team will recognize.',
              'Optionally add a description to explain the board\'s purpose, scope, or goals. This is visible when viewing the board and helps teammates understand the context.',
              'Choose an icon emoji that visually represents the project. This icon appears in the sidebar, board listings, and search results.',
              'Select a color theme for the board header. Different colors help you distinguish boards at a glance when you have many projects.',
              'Click "Create Board" to finalize the creation.',
            ],
          },
          {
            type: 'heading',
            text: 'Default Board Structure',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'After creation, the board opens automatically in the Table view. It comes pre-configured with a structure that covers the most common project management needs, so you do not need to set up anything before adding tasks.',
          },
          {
            type: 'paragraph',
            text: 'The default board includes six columns:',
          },
          {
            type: 'list',
            items: [
              'Task — The title column (always present). This is the name of each task and is the only column that cannot be removed.',
              'Status — A status dropdown with four options: Not Started (gray), Working on it (amber), Done (green), and Stuck (red).',
              'Owner — A People column that lets you assign a team member from a dropdown with avatars and full names.',
              'Priority — A priority dropdown with four levels: Low (light blue), Medium (blue), High (orange), and Critical (red).',
              'Due Date — A date picker column for setting task deadlines.',
              'Notes — A text column for adding descriptions, links, or any additional context.',
            ],
          },
          {
            type: 'paragraph',
            text: 'The default board also includes three groups:',
          },
          {
            type: 'list',
            items: [
              'To Do — For tasks that have not been started yet.',
              'In Progress — For tasks currently being worked on.',
              'Done — For completed tasks.',
            ],
          },
          {
            type: 'heading',
            text: 'Board Settings',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'You can edit a board\'s title, description, icon, and color at any time after creation. Click the board title in the header area to rename it. Use the board settings menu (accessible from the board header) to update the description, icon, or color. These settings are cosmetic and do not affect the board\'s data or functionality.',
          },
          {
            type: 'heading',
            text: 'Naming Best Practices',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Be specific — "Sprint 24: User Authentication" is better than "Sprint 24" or "Auth".',
              'Include the project or team name when you have many boards — "Marketing: Q2 Campaign" or "Frontend: Dashboard Redesign".',
              'Use consistent naming conventions across your team. If everyone names sprints the same way, boards become easier to find and sort.',
              'Keep titles concise but descriptive. The title appears in the sidebar, search results, and dashboard, so it should be recognizable at a glance.',
            ],
          },
          {
            type: 'tip',
            text: 'After creating a board, it opens automatically in the Table view with the default columns and groups. You can immediately start adding tasks without any additional setup. Customize columns and groups later as your workflow evolves.',
          },
        ],
      },
      {
        id: 'board-views',
        title: 'Board Views',
        description: 'Table, Kanban, Calendar, and Timeline views explained in detail with use cases',
        content: [
          {
            type: 'paragraph',
            text: 'Every board in AgileFlow supports four different view types: Table, Kanban, Calendar, and Timeline. You can switch between views at any time using the view selector tabs at the top of the board. All four views display the same underlying data; they simply present it in different visual formats. Changing a task\'s status in the Kanban view updates it in the Table view too. No data is lost or duplicated when switching views.',
          },
          {
            type: 'heading',
            text: 'Table View (Default)',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Table view is the default and most detailed view. It displays tasks as rows in a spreadsheet-like grid, with each column representing a data field. This view is best for situations where you need to see and edit multiple data points for many tasks at once. It is the power user\'s view and the one where you will spend most of your time when managing task details.',
          },
          {
            type: 'list',
            items: [
              'Inline Editing — Click any cell to edit its value directly. Each column type has its own editor: dropdowns for Status and Priority, calendar picker for Date, team member selector for People, text input for Notes, and so on.',
              'Column Headers — Each column has a header showing the column name. The headers define the structure of the board.',
              'Groups — Tasks are organized into collapsible groups (the colored header rows like "To Do", "In Progress", "Done"). Click the chevron to collapse or expand a group.',
              'Summary Rows — Each group includes a summary row at the bottom showing aggregated metrics: task counts, status distribution, and totals for numeric columns.',
              'Task Title Click — Click a task\'s title to open the full Task Edit Modal, which shows all fields in a form layout for comprehensive editing.',
            ],
          },
          {
            type: 'paragraph',
            text: 'When to use Table view: Use it for sprint planning sessions where you need to see priorities, assignees, and dates side by side. Use it when you are batch-updating many tasks. Use it when you need the most complete view of all task data at once.',
          },
          {
            type: 'heading',
            text: 'Kanban View',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Kanban view organizes tasks into vertical columns based on a grouping criterion, most commonly the Status field. Each column represents a workflow stage, and tasks appear as cards within those columns. This visual layout is inspired by physical Kanban boards where sticky notes move across a whiteboard as work progresses.',
          },
          {
            type: 'list',
            items: [
              'Drag and Drop — Grab a task card and drag it from one column to another. When you drop a card into a new column, the corresponding field (e.g., Status) updates automatically. The change is saved immediately.',
              'Card Contents — Each Kanban card displays the task title, a colored status or priority badge, the due date (if set), and the assignee\'s avatar. This gives you essential context without opening the task.',
              'Column Counts — Each column header shows the number of tasks in that column, helping you spot overloaded stages at a glance.',
              'Grouping Options — By default, the Kanban view groups by Status (Not Started, Working on it, Done, Stuck). You can change the grouping to People (one column per team member) or Priority (one column per priority level) using the Group By option.',
              'Reordering — Within a column, you can drag cards up or down to set their order. This is useful for indicating relative priority within a single status.',
            ],
          },
          {
            type: 'paragraph',
            text: 'When to use Kanban view: Use it during daily standups to see what everyone is working on. Use it to visualize workflow and spot bottlenecks. Use it when you want a high-level overview of work status without getting into the details of every field. If one column has far more cards than others, that stage is a bottleneck in your workflow.',
          },
          {
            type: 'heading',
            text: 'Calendar View',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Calendar view displays tasks on a monthly calendar based on their due dates. Tasks without a date value do not appear in this view. Each task shows as a colored block on its due date, making it easy to see which days have the most work scheduled and where deadlines cluster.',
          },
          {
            type: 'list',
            items: [
              'Monthly Grid — Tasks are plotted on a standard monthly calendar grid. Each day cell shows the tasks due on that date.',
              'Navigation — Use the left and right arrow buttons in the calendar header to navigate between months. The current month and year are displayed prominently.',
              'Task Display — Tasks appear as compact colored blocks showing their title. The color may correspond to their status or priority.',
              'Click to View — Click on a task in the calendar to see its full details or navigate to it in the Table view.',
              'Date Dependencies — Only tasks with a Due Date or Date column value appear in this view. If a task has no date set, it will not show up.',
            ],
          },
          {
            type: 'paragraph',
            text: 'When to use Calendar view: Use it for deadline-driven projects where timing is critical. Use it during release planning to see how deliverables are distributed across a month. Use it to identify date conflicts where too many tasks are due on the same day, allowing you to redistribute workload.',
          },
          {
            type: 'heading',
            text: 'Timeline View',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Timeline view is a Gantt-style visualization that shows tasks as horizontal bars spanning from a start date to an end date along a time axis. It is the most powerful view for understanding task duration, overlap, and project scheduling. This view requires either a Timeline column (which stores a start and end date range) or two or more Date columns on the board.',
          },
          {
            type: 'list',
            items: [
              'Horizontal Bars — Each task appears as a colored bar spanning from its start date to its end date. Longer bars mean longer tasks. Overlapping bars show parallel work.',
              'Priority Color Coding — Bars are color-coded by priority level: Critical tasks are red, High priority tasks are orange, Medium priority tasks are blue, and Low priority tasks are light blue. This lets you instantly see which tasks are the most important.',
              'Three Zoom Levels — Use the zoom controls to switch between three levels of detail. Week zoom shows individual days with day-of-week labels. Month zoom (the default) shows days with weekday abbreviations across the current month. Quarter zoom shows weeks across a three-month span, ideal for roadmap-level planning.',
              'Navigation Controls — Previous and Next buttons scroll the timeline left and right. A Today button jumps to the current date. Today\'s date is highlighted with a distinct marker for easy reference.',
              'Weekend Backgrounds — Saturday and Sunday columns have a muted (slightly gray) background, visually distinguishing weekends from working days. This helps with realistic scheduling.',
              'Data Requirements — The Timeline view requires tasks to have date range data. If your board has a Timeline column, that column\'s start and end dates are used. If your board has two or more Date columns, you can select which ones represent the start and end dates. Tasks without date range data do not appear.',
            ],
          },
          {
            type: 'paragraph',
            text: 'When to use Timeline view: Use it for project roadmapping to see the big picture of when everything is happening. Use it to identify scheduling conflicts where tasks overlap and might compete for the same resources. Use it during sprint planning to visualize how work is distributed across the sprint period. The Quarter zoom is especially useful for presenting to stakeholders who need to see the multi-month outlook.',
          },
          {
            type: 'tip',
            text: 'Switch views using the view selector tabs at the top of any board. Your view preference is remembered per board, so your Kanban-oriented daily board and your Timeline-oriented roadmap board each remember their last used view.',
          },
        ],
      },
      {
        id: 'managing-columns',
        title: 'Managing Columns',
        description: 'All 11 column types explained with use cases, editors, and management options',
        content: [
          {
            type: 'paragraph',
            text: 'Columns define what data you track for each task on a board. AgileFlow supports 11 different column types, each designed for a specific kind of information. The right column configuration can make your board significantly more useful, so it is worth understanding what each type does and when to use it.',
          },
          {
            type: 'heading',
            text: 'Adding a Column',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Open a board and look for the "+" icon at the end of the column header row.',
              'Click it to open the New Column dialog.',
              'Enter a column name that describes what data this column tracks (e.g., "Sprint Points", "Department", "Reviewed").',
              'Select the column type from the dropdown. Each type is listed with a brief description.',
              'If you selected Dropdown type, you will see fields to define your custom options. Enter labels and pick colors for each option.',
              'Click "Add Column" to add it to the board. The new column appears at the end of the header row, and all existing tasks gain an empty cell for this column.',
            ],
          },
          {
            type: 'heading',
            text: 'All 11 Column Types',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Text — A free-form text field. Click to type any text: descriptions, notes, links, or references. Use it for fields that need flexible, unstructured content like "Notes", "Description", or "Meeting Link". The cell displays the text directly, truncated if it is long.',
              'Status — A predefined set of workflow states with color coding. Options: Not Started (gray), Working on it (amber), Done (green), and Stuck (red). Click the cell to see a dropdown of colored status options. Use it to track where a task is in its lifecycle. This is the column that drives the Kanban view grouping.',
              'Priority — A predefined set of urgency levels with color coding. Options: Low (light blue), Medium (blue), High (orange), and Critical (red). Click the cell to see a dropdown of colored priority options. Use it to indicate how important or urgent a task is relative to others.',
              'Date — A date picker field. Click the cell to open a calendar popup where you can select a date. Use it for deadlines, due dates, start dates, or any date-based tracking. Tasks with dates appear in the Calendar view.',
              'People — A team member assignment field. Click the cell to open a dropdown showing all workspace members with their avatars and full names. Select a person to assign them to the task. Use it for "Owner", "Assignee", "Reviewer", or any role-based assignment.',
              'Number — A numeric input field. Click the cell to type a number. Use it for story points, hours, effort estimates, quantities, or any numeric metric. Group summaries automatically total Number columns.',
              'Budget — A currency-formatted field that displays values with a dollar sign. Click the cell to type a number, and it displays as a formatted dollar amount. Use it for cost tracking, budget allocation, or financial estimates.',
              'Checkbox — A simple boolean toggle. A single click checks or unchecks the box. Use it for yes/no fields like "Approved", "Reviewed", "Deployed", or "Paid". Checked items display a filled checkbox; unchecked items display an empty one.',
              'Dropdown — A custom dropdown with user-defined options. When creating this column, you define the options (each with a label and optional color). Click the cell to see your custom options. Use it when you need a fixed set of choices that are specific to your workflow, like "Department", "Component", or "Sprint".',
              'Tags — A multi-select label field with colored badges. Click the cell to see predefined suggestions (Urgent, Bug, Feature, Marketing, Design) plus any custom tags you create. You can select multiple tags per task. Tags appear as colored badges in the cell. Use it for categorization, labeling, or any scenario where a task can belong to multiple categories.',
              'Timeline — A date range picker with a start date and end date. Click the cell to set both dates. The Timeline view uses this column to render task bars. Use it when you need to track task duration rather than a single date. Essential for Gantt-style timeline planning.',
            ],
          },
          {
            type: 'heading',
            text: 'Column Management',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Column Order — Columns appear in the order they were added. The Task (title) column is always first and cannot be moved or removed.',
              'Hiding Columns — Use the "Hide" menu in the board toolbar to temporarily hide columns you do not need. Hidden columns retain their data; they are just not visible in the current view.',
              'Deleting Columns — Columns can be deleted from the column settings. This permanently removes the column and all its data from every task on the board.',
            ],
          },
          {
            type: 'warning',
            text: 'Deleting a column removes that data field from all tasks on the board permanently. This action cannot be undone. Before deleting, make sure no tasks have important data in that column. Consider hiding the column instead if you might need the data later.',
          },
          {
            type: 'tip',
            text: 'Start with the default columns and add more only when you need them. A board with too many columns can feel cluttered. Use the Hide menu to show only the columns relevant to your current task, and unhide others when needed.',
          },
        ],
      },
      {
        id: 'working-with-tasks',
        title: 'Working with Tasks',
        description: 'Create, edit inline, use the Task Edit Modal, and manage tasks through their lifecycle',
        content: [
          {
            type: 'paragraph',
            text: 'Tasks (also called items) are the core units of work in AgileFlow. Each task is a row on a board with data in each column. Tasks represent anything that needs to be done: code to write, designs to create, meetings to prepare for, bugs to fix, or features to ship. Understanding how to create, edit, and manage tasks efficiently is fundamental to using AgileFlow effectively.',
          },
          {
            type: 'heading',
            text: 'Creating Tasks',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Navigate to a board and find the group where you want the task to live (e.g., "To Do").',
              'Click the "+ Add Item" button at the bottom of the group.',
              'Type a descriptive task title. Be specific and action-oriented: "Implement user login API endpoint" is better than "Login". Good task titles communicate what needs to be done without opening the task.',
              'Press Enter or click the add button to create the task.',
              'The new task appears as a row in the group with empty data cells for each column.',
            ],
          },
          {
            type: 'heading',
            text: 'Inline Editing',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The fastest way to update task data is inline editing. In the Table view, click on any cell to activate its editor. Each column type has its own editor optimized for the data it holds.',
          },
          {
            type: 'list',
            items: [
              'Status — Click to open a colored dropdown. Select Not Started, Working on it, Done, or Stuck. The cell immediately shows the selected status with its color.',
              'Priority — Click to open a colored dropdown. Select Low, Medium, High, or Critical. The cell displays the chosen priority with its color indicator.',
              'Date — Click to open a calendar popup. Navigate to the desired month and click a day to set the date. The cell displays the selected date.',
              'People — Click to open a team member dropdown showing avatars and full names. Select a person to assign them. The cell shows the assignee\'s avatar.',
              'Number and Budget — Click to activate a numeric input. Type a number and press Enter or click away to save. Budget cells format the value with a dollar sign.',
              'Checkbox — A single click toggles the checkbox between checked and unchecked. No additional editor appears.',
              'Dropdown — Click to see your custom options. Select one to set the value.',
              'Tags — Click to see predefined and custom tag options. Select multiple tags; they appear as colored badges in the cell.',
              'Text — Click to activate a text input. Type your content and press Enter or click away to save.',
              'Timeline — Click to open a date range picker. Set the start date and end date for the task.',
            ],
          },
          {
            type: 'heading',
            text: 'Task Edit Modal',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'For a more comprehensive editing experience, click on a task\'s title to open the Task Edit Modal. This dialog presents all the task\'s fields in a form layout, making it easy to review and update multiple fields at once without scrolling across columns.',
          },
          {
            type: 'list',
            items: [
              'The task title appears at the top of the modal and can be edited directly.',
              'Each column on the board appears as a labeled form field with its appropriate editor.',
              'All changes are made within the modal and submitted together.',
              'Click "Save" to apply all changes at once.',
              'Click "Delete" to permanently remove the task. A confirmation prompt appears to prevent accidental deletion.',
              'Click outside the modal or press the X button to close without saving.',
            ],
          },
          {
            type: 'heading',
            text: 'Task Lifecycle',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'A typical task moves through several stages during its life. While AgileFlow does not enforce a specific workflow, most teams follow a pattern similar to this:',
          },
          {
            type: 'list',
            items: [
              'Created — A new task is added to a board, usually in the "To Do" group with "Not Started" status.',
              'Assigned — A team member is assigned via the People column. The task now has an owner responsible for its completion.',
              'In Progress — The assignee begins work and updates the status to "Working on it". The task moves to the "In Progress" group.',
              'Blocked (optional) — If the task cannot proceed due to dependencies or issues, the status changes to "Stuck". The task needs attention to unblock it.',
              'Completed — The work is done. The status changes to "Done", and the task moves to the "Done" group.',
            ],
          },
          {
            type: 'tip',
            text: 'Use inline editing for quick, single-field updates like changing a status or assigning a person. Use the Task Edit Modal when you need to review and update multiple fields at once, or when you want a focused, form-style editing experience.',
          },
        ],
      },
      {
        id: 'groups-organization',
        title: 'Groups & Organization',
        description: 'Create groups, collapse sections, use Group By, and understand group summaries',
        content: [
          {
            type: 'paragraph',
            text: 'Groups are sections within a board that organize tasks into logical clusters. They act as categories, phases, swimlanes, or any other organizational scheme that makes sense for your project. Groups give structure to your task list, making large boards manageable by dividing them into focused sections. Without groups, a board with hundreds of tasks would be overwhelming; with groups, it becomes navigable.',
          },
          {
            type: 'heading',
            text: 'Creating Groups',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click the "New Group" button in the board toolbar at the top of the board.',
              'Enter a name for the group. Choose something that describes the category of tasks it will contain (e.g., "Frontend Tasks", "Bug Fixes", "Sprint Backlog", "Blocked", "Ready for QA").',
              'Choose a color for the group header. Colors help you visually distinguish groups from each other, especially on boards with many sections.',
              'Click "Create" to add the group to the board. It appears on the board ready to receive tasks.',
            ],
          },
          {
            type: 'heading',
            text: 'Collapsing and Expanding Groups',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Each group has a chevron icon in its header row that toggles between expanded and collapsed states. Collapsing a group hides its tasks, leaving just the group header visible. This is invaluable for reducing visual clutter when you are focused on specific sections of work. For example, you might collapse the "Done" group to focus on active tasks, or collapse all groups except the one you are currently working in.',
          },
          {
            type: 'heading',
            text: 'Group By Options',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The "Group By" menu in the board toolbar lets you automatically reorganize all tasks into groups based on a column value. Instead of manually maintaining groups, you can let AgileFlow dynamically create groups for each unique value in a field.',
          },
          {
            type: 'list',
            items: [
              'Group by Status — Creates one group for each status value: "Not Started", "Working on it", "Done", and "Stuck". Tasks automatically sort into the group matching their status.',
              'Group by Priority — Creates one group for each priority level: "Low", "Medium", "High", and "Critical". Useful for seeing the most urgent work at the top.',
              'Group by Assignee — Creates one group for each team member. Tasks are grouped by who is assigned to them. This is excellent for workload review and standup meetings.',
              'Group by Date — Creates groups based on due date ranges such as "This Week", "Next Week", "This Month", or "Overdue". Useful for deadline-focused planning.',
            ],
          },
          {
            type: 'heading',
            text: 'Group Summaries',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Each group includes a summary row at the bottom that shows aggregated metrics for the tasks in that group. Summaries include the total task count, a visual breakdown of status distribution (showing colored segments for each status), and totals for numeric columns like Number and Budget. These summaries update automatically as you add, remove, or modify tasks.',
          },
          {
            type: 'heading',
            text: 'Color Coding',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Group header colors serve a practical purpose beyond aesthetics. When you have many groups, colors provide instant visual orientation. Teams often adopt color conventions: red for blocked items, green for completed work, blue for active sprints, and yellow for upcoming tasks. Consistent color usage across boards makes navigating between projects faster.',
          },
          {
            type: 'tip',
            text: 'Combine Group By with filters to create powerful views. For example, group by Priority and filter to show only tasks assigned to you. Or group by Assignee and filter to show only "Working on it" and "Stuck" status. These combinations are especially useful in meetings.',
          },
        ],
      },
      {
        id: 'filtering-sorting',
        title: 'Filtering & Sorting',
        description: 'Filter by status, priority, person, and date; sort by any column; use the Hide menu',
        content: [
          {
            type: 'paragraph',
            text: 'As boards grow with tasks, finding the right information becomes essential. AgileFlow provides a powerful filter panel, per-column sorting, and a column visibility menu to help you narrow down to exactly the tasks you need. Filtering and sorting do not modify your data; they temporarily change what is displayed, so you can always remove filters to see everything again.',
          },
          {
            type: 'heading',
            text: 'Filter Panel',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Click the "Filter" button in the board toolbar to open the filter panel. The panel slides open and presents filter categories with checkboxes for each option.',
          },
          {
            type: 'list',
            items: [
              'Status Filter — Check one or more status values to show only tasks with those statuses. For example, check "Working on it" and "Stuck" to see only active and blocked tasks.',
              'Priority Filter — Check one or more priority levels to show only tasks with those priorities. For example, check "Critical" and "High" to focus on the most urgent work.',
              'Person Filter — Select specific team members to see only tasks assigned to those people. This is useful for reviewing one person\'s workload or preparing for a one-on-one meeting.',
              'Date Filter — Filter by due date ranges to see tasks due within a specific timeframe, such as "this week" or "overdue".',
            ],
          },
          {
            type: 'heading',
            text: 'AND/OR Filter Logic',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Understanding how filters combine is important for getting the results you expect. Within a single category, filters use OR logic: selecting "High" and "Critical" priority shows tasks that are High OR Critical. Across categories, filters use AND logic: selecting "High" priority AND "Working on it" status shows tasks that are both High priority AND in "Working on it" status. This means each additional category you filter on narrows the results further.',
          },
          {
            type: 'heading',
            text: 'Person Filter Shortcut',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Person Filter is a dedicated filter button in the board toolbar (separate from the full filter panel) that provides quick access to filtering by team member. Click the people icon and select a name to instantly see only that person\'s tasks. This is the fastest way to view a single team member\'s workload without opening the full filter panel.',
          },
          {
            type: 'heading',
            text: 'Column Sorting',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Click any column header to sort the board by that column. Click again to toggle between ascending and descending order. A sort indicator appears in the column header showing the current sort direction. For example, sort by Priority to see Critical tasks at the top, or sort by Due Date to see the earliest deadlines first.',
          },
          {
            type: 'paragraph',
            text: 'The Sort Menu in the board toolbar provides additional sorting options and allows you to configure more specific sort behavior when clicking column headers is not sufficient.',
          },
          {
            type: 'heading',
            text: 'Hide Menu',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The "Hide" menu in the board toolbar lets you temporarily hide columns you do not need. This simplifies the visual layout without removing any data. Hidden columns retain their values; they are just not displayed in the current view. You can unhide them at any time to bring them back.',
          },
          {
            type: 'paragraph',
            text: 'This is particularly useful when your board has many columns but you only need to see a few for your current task. For example, during a status review meeting, you might hide the Notes, Budget, and Checkbox columns to focus on Task, Status, Priority, and Owner.',
          },
          {
            type: 'tip',
            text: 'Combine filters with the Group By feature for powerful analysis views. For example, filter to show only "Stuck" tasks and group by Assignee to see which team members have the most blocked items. This combination surfaces problems quickly.',
          },
        ],
      },
      {
        id: 'drag-and-drop',
        title: 'Drag and Drop',
        description: 'Reorder tasks, move between groups, update Kanban status, and understand permission constraints',
        content: [
          {
            type: 'paragraph',
            text: 'Drag and drop is a core interaction pattern in AgileFlow that lets you physically move tasks to reorganize your board. It works in both the Table view and the Kanban view, providing an intuitive, visual way to update task positions and statuses without clicking through menus or editing fields.',
          },
          {
            type: 'heading',
            text: 'Table View: Reordering Tasks',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'In the Table view, drag and drop lets you rearrange the order of tasks within a group and move tasks between groups.',
          },
          {
            type: 'list',
            items: [
              'Click and hold on a task row to pick it up. A visual indicator shows that the task is being dragged.',
              'Drag the task up or down within the same group to change its position relative to other tasks.',
              'Drag the task into a different group to move it. The task will be added to the new group at the position where you drop it.',
              'Release the mouse button to finalize the move. The new position is saved automatically.',
            ],
          },
          {
            type: 'heading',
            text: 'Kanban View: Moving Between Columns',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'In the Kanban view, drag and drop is used primarily to update task status by moving cards between columns.',
          },
          {
            type: 'list',
            items: [
              'Each Kanban column represents a status value (e.g., "Not Started", "Working on it", "Done", "Stuck").',
              'Click and hold on a task card to pick it up.',
              'Drag the card to a different column to change its status. As you drag, the target column highlights to show where the card will land.',
              'The task\'s Status field updates automatically when you drop the card into the new column. No additional save action is required.',
              'Within a column, drag cards up or down to reorder them. This lets you set relative priority within a single status.',
            ],
          },
          {
            type: 'heading',
            text: 'Auto-Save Behavior',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'All drag and drop changes are saved automatically and immediately to the server. You do not need to click a save button after moving tasks. Your team members will see the updated positions the next time they load or refresh the board.',
          },
          {
            type: 'heading',
            text: 'Permission Constraints',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Drag and drop respects the role-based permission system. Users with the Viewer role cannot drag or drop tasks. The drag handle does not appear for viewers, and attempting to drag has no effect. This prevents read-only users from accidentally or intentionally modifying task positions. Only Members and Admins can use drag and drop to reorganize boards.',
          },
          {
            type: 'warning',
            text: 'If you are unable to drag tasks, check your role. Viewers have read-only access and cannot reorder or move tasks. Ask an Admin to upgrade your role to Member if you need editing capabilities.',
          },
          {
            type: 'tip',
            text: 'The Kanban view is especially useful during daily standup meetings. As each team member reports their progress, they can drag their task cards from "Working on it" to "Done" in real time, giving the whole team a visual update.',
          },
        ],
      },
      {
        id: 'unassigned-tasks',
        title: 'Unassigned Tasks View',
        description: 'Find tasks without owners and assign them quickly with the dropdown',
        content: [
          {
            type: 'paragraph',
            text: 'The Unassigned Tasks view is a dedicated section on the Board page that automatically surfaces all tasks that have no assignee in the People column. It acts as a safety net, ensuring that no work items slip through the cracks without an owner. Unowned tasks are a common problem in growing projects, and this view makes them impossible to miss.',
          },
          {
            type: 'heading',
            text: 'How It Works',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow scans all tasks on the current board and identifies any task where the People (Owner) column is empty. These tasks are collected and displayed in the Unassigned Tasks section, separate from the regular board groups.',
          },
          {
            type: 'list',
            items: [
              'Each unassigned task card shows the task title, the group it belongs to, its current status with a colored badge, its priority level, and its due date (if set).',
              'A quick "Assign" button is prominently displayed on each task card.',
              'Click the Assign button to open a team member dropdown showing all workspace members with their avatars and full names.',
              'Select a person from the dropdown to assign them to the task instantly. The task is updated immediately and disappears from the unassigned list.',
            ],
          },
          {
            type: 'heading',
            text: 'When to Use the Unassigned Tasks View',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'During sprint planning — Ensure every task in the sprint has an owner before the sprint starts.',
              'After creating tasks in bulk — When you add many tasks at once (e.g., importing from a meeting agenda), some may lack assignees.',
              'During daily standups — Check if any new tasks have been created without owners and assign them on the spot.',
              'During backlog grooming — Review the board for housekeeping and ensure all tasks are properly assigned.',
              'Before a deadline — Make sure no unowned tasks are blocking progress or will be missed.',
            ],
          },
          {
            type: 'heading',
            text: 'AI-Assisted Assignment',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'If you are unsure who should own a task, you can use the AI assistant\'s /assign command for intelligent suggestions. The AI considers team workload, expertise, and task context to recommend the best person for the job. This is especially useful for large teams where workload distribution is hard to track manually.',
          },
          {
            type: 'tip',
            text: 'Make it a team habit to check the Unassigned Tasks view at the start of each sprint and during daily standups. Unowned tasks are tasks nobody is accountable for, and they are the most likely to be forgotten.',
          },
        ],
      },
      {
        id: 'board-analytics',
        title: 'Board Analytics Panel',
        description: 'Track board health with charts for status, workload, priority, completion, and AI insights',
        content: [
          {
            type: 'paragraph',
            text: 'Every board in AgileFlow has a built-in analytics panel that provides a data-driven view of the board\'s health and progress. The analytics panel is not a separate page; it is a slide-out panel accessible directly from the board, so you can review metrics without losing context of your tasks.',
          },
          {
            type: 'heading',
            text: 'Opening the Analytics Panel',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Click the bar chart icon in the board header (next to the view selector and toolbar) to toggle the analytics panel open. The panel slides in from the side, overlaying or pushing the board content depending on the screen width. Click the icon again or the close button to dismiss it.',
          },
          {
            type: 'heading',
            text: 'Key Metrics',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The top of the analytics panel displays summary cards with the board\'s most important numbers. These provide a quick pulse check without requiring you to interpret charts.',
          },
          {
            type: 'list',
            items: [
              'Total Tasks — The total number of tasks on this board across all groups. Gives you a sense of the board\'s scope.',
              'Completion Rate — The percentage of tasks with "Done" status. This tells you how much of the board\'s work has been completed.',
              'Overdue Tasks — The number of tasks whose due date has passed but whose status is not "Done". These are your red flags that need immediate attention.',
            ],
          },
          {
            type: 'heading',
            text: 'Charts and Visualizations',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Below the summary cards, the analytics panel shows several charts that break down the board\'s data in different ways.',
          },
          {
            type: 'list',
            items: [
              'Status Distribution — A chart (typically a donut or bar chart) showing how many tasks are in each status: Not Started, Working on it, Done, and Stuck. This is the quickest way to see the overall workflow balance.',
              'Team Workload — A chart showing how many tasks are assigned to each team member. Use this to identify team members who are overloaded or underutilized. Balanced workload distribution leads to better team performance.',
              'Priority Breakdown — A chart showing the distribution of tasks by priority level: Low, Medium, High, and Critical. If most of your tasks are marked Critical, either your project is genuinely urgent or your team needs to recalibrate how they use priority levels.',
            ],
          },
          {
            type: 'heading',
            text: 'Info Tooltips',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Each metric and chart in the analytics panel includes an information tooltip (an "i" icon). Hover over it to see a brief explanation of what that metric measures and how it is calculated. These tooltips are especially helpful for team members who are new to project analytics and want to understand what the numbers mean.',
          },
          {
            type: 'heading',
            text: 'AI Explain Button',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The analytics panel includes an "AI Explain" button that sends the board\'s analytics data to the AI assistant and returns a natural-language interpretation. Instead of reading charts yourself, you can click this button and get a plain-English summary like: "This board has 45 tasks with a 62% completion rate. 8 tasks are overdue, mostly in the Frontend group. The team workload is heavily skewed toward two members who own 70% of the remaining tasks." This is particularly useful when presenting board status to stakeholders or during sprint review meetings.',
          },
          {
            type: 'tip',
            text: 'Open the analytics panel during sprint reviews and retrospectives. The combination of status distribution, team workload, and priority breakdown charts provides the data you need for productive discussions about what went well and what needs improvement.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. BACKLOG & SPRINT MANAGEMENT
  // ─────────────────────────────────────────────
  {
    id: 'backlog-sprints',
    title: 'Backlog & Sprint Management',
    description: 'Manage your product backlog, write user stories, and plan agile sprints',
    icon: 'ListOrdered',
    articles: [
      {
        id: 'understanding-backlog',
        title: 'Understanding the Product Backlog',
        description: 'What a backlog is, why it matters, and how it serves as your single source of truth',
        content: [
          {
            type: 'paragraph',
            text: 'The product backlog is one of the most important concepts in agile project management, and it is the foundation of effective sprint planning in AgileFlow. At its core, a backlog is an ordered list of everything that might be needed in the product. It is the single source of truth for all planned work, and it is owned and maintained by the product owner (though the entire team contributes to it).',
          },
          {
            type: 'heading',
            text: 'What Is a Product Backlog?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'A product backlog is a prioritized list of user stories, features, bug fixes, technical debt, and improvements that the team may work on in future sprints. Items at the top of the backlog are the highest priority and should be well-defined, estimated, and ready to pull into the next sprint. Items further down the list may be less refined and more loosely defined; they will be detailed later as they approach the top.',
          },
          {
            type: 'paragraph',
            text: 'Think of the backlog as a living document that evolves continuously. New items are added as the team discovers new requirements, stakeholders request features, or bugs are reported. Existing items are re-prioritized as business needs change. Completed items are removed after their sprints finish. The backlog is never "done" because there is always more the product could do.',
          },
          {
            type: 'heading',
            text: 'Why the Backlog Matters',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Single Source of Truth — Every piece of planned work lives in one place. Team members, stakeholders, and managers can all look at the same backlog to understand what is coming next. There are no hidden lists, side spreadsheets, or email threads with requirements.',
              'Prioritization — The backlog forces you to make explicit decisions about what matters most. Not everything can be done at once, so ranking items by priority ensures the most valuable work gets done first.',
              'Sprint Planning Input — When it is time to plan a sprint, you pull stories from the top of the backlog. A well-maintained backlog makes sprint planning fast and focused because the next batch of work is already identified and estimated.',
              'Stakeholder Transparency — Anyone can look at the backlog to see what the team plans to work on, what is coming in future sprints, and how priorities have been set. This reduces "when will my feature be done?" questions.',
              'Capacity Planning — By estimating stories with story points, the backlog gives you data to predict how many sprints it will take to deliver a set of features. This helps with roadmap planning and release forecasting.',
            ],
          },
          {
            type: 'heading',
            text: 'The Backlog in AgileFlow',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'In AgileFlow, the Backlog page (accessible from the sidebar) is where you manage your product backlog. It displays all user stories, sorted by priority, with filtering and search tools. From this page, you can create new stories, edit existing ones, estimate effort with story points, define acceptance criteria, and plan sprints by pulling stories from the backlog into time-boxed iterations.',
          },
          {
            type: 'paragraph',
            text: 'The Backlog page also shows stats cards at the top summarizing key backlog health metrics such as total stories, stories by priority, and stories assigned to active sprints. These stats help you understand the size and shape of your backlog at a glance.',
          },
          {
            type: 'heading',
            text: 'Backlog Maintenance',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'A healthy backlog requires regular maintenance, often called "backlog grooming" or "backlog refinement." This is a recurring activity where the team reviews the backlog to ensure items are up to date, correctly prioritized, and sufficiently detailed for upcoming sprints. AgileFlow makes grooming efficient with search, filtering, drag-to-reorder, and inline editing of story details.',
          },
          {
            type: 'tip',
            text: 'Schedule a backlog grooming session at least once per sprint (ideally mid-sprint). During grooming, remove outdated stories, update estimates for stories whose scope has changed, ensure the top 10-15 stories are fully detailed with acceptance criteria, and re-rank items based on current business priorities.',
          },
        ],
      },
      {
        id: 'user-stories',
        title: 'User Stories',
        description: 'Write effective user stories with the standard format, story points, acceptance criteria, and lifecycle',
        content: [
          {
            type: 'paragraph',
            text: 'User stories are the building blocks of your product backlog. Each story represents a piece of functionality or a requirement described from the user\'s perspective. User stories deliberately focus on the "what" and "why" rather than the "how," giving the development team flexibility in implementation while ensuring the end result delivers value to users.',
          },
          {
            type: 'heading',
            text: 'The User Story Format',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The standard user story format follows a simple template: "As a [type of user], I want [some goal or action] so that [some benefit or reason]." This three-part structure forces you to think about who the feature is for, what they need, and why it matters. For example: "As a project manager, I want to export board data to CSV so that I can share progress reports with stakeholders who don\'t use AgileFlow."',
          },
          {
            type: 'paragraph',
            text: 'Not every story needs to follow this exact template, but the template ensures that stories are user-centered and value-driven. Stories that skip the "so that" clause often lack clear justification, which can lead to building features nobody actually needs.',
          },
          {
            type: 'heading',
            text: 'Creating a User Story in AgileFlow',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Navigate to the Backlog page from the sidebar.',
              'Click the "+ New Story" button at the top of the page to open the story creation form.',
              'Enter a title that describes the feature. Use the "As a... I want... so that..." format when possible, or write a concise feature description.',
              'Add a detailed description explaining the story\'s scope, requirements, and any relevant context. This helps developers understand the intent beyond the title.',
              'Set the priority level. AgileFlow provides four levels, each with a distinct color for quick visual identification:',
            ],
          },
          {
            type: 'list',
            items: [
              'Critical (red) — Must be done immediately, blocking other work or affecting users in production.',
              'High (orange) — Important for the current sprint or release, should be completed soon.',
              'Medium (blue) — Valuable work that should be done but is not time-sensitive.',
              'Low (light blue) — Nice-to-have improvements or future considerations.',
            ],
          },
          {
            type: 'steps',
            items: [
              'Assign story points to estimate the effort required. AgileFlow uses the Fibonacci scale: 1, 2, 3, 5, 8, 13. Choose the value that best represents the relative effort compared to other stories your team has completed.',
              'Add acceptance criteria. These are specific, testable conditions that define when the story is complete. Write each criterion as a clear, verifiable statement.',
              'Optionally link the story to a board if it relates to a specific project.',
              'Click "Create Story" to add the story to the product backlog.',
            ],
          },
          {
            type: 'heading',
            text: 'Story Points: The Fibonacci Scale',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Story points estimate relative effort, not hours. A 3-point story takes roughly three times the effort of a 1-point story, but the actual calendar time may vary depending on complexity, uncertainty, and who works on it. The Fibonacci sequence (1, 2, 3, 5, 8, 13) is used because the gaps between numbers increase, reflecting the increasing uncertainty in larger estimates.',
          },
          {
            type: 'list',
            items: [
              '1 point — Trivial, well-understood work. A few minutes to a couple of hours of effort. Examples: fixing a typo, changing a color value, updating a label.',
              '2 points — Small, clear scope, low risk. A few hours of focused work. Examples: adding a form field, updating a component\'s styling, writing a unit test.',
              '3 points — Moderate complexity with a clear approach. Half a day to a day of effort. Examples: building a new UI component, adding form validation logic, implementing a simple API endpoint.',
              '5 points — Significant work with multiple parts and some unknowns. One to two days of effort. Examples: integrating a third-party API, redesigning a page layout, implementing search functionality.',
              '8 points — Large and complex. Multiple days of effort with notable risk. Examples: building a new feature with both frontend and backend work, implementing authentication, creating a data visualization dashboard.',
              '13 points — Very large with high uncertainty. Should likely be broken into smaller stories. Examples: full module rewrites, new system integrations, features requiring research and experimentation.',
            ],
          },
          {
            type: 'heading',
            text: 'Acceptance Criteria Best Practices',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Acceptance criteria are the bridge between a story\'s intent and its implementation. They remove ambiguity by defining exactly what "done" means for each story. Good acceptance criteria have several characteristics:',
          },
          {
            type: 'list',
            items: [
              'Specific — Each criterion describes one verifiable behavior. "The form works correctly" is too vague. "When the user submits the form with valid data, a success message appears within 2 seconds" is specific.',
              'Testable — You should be able to test each criterion with a clear pass/fail result. If you cannot write a test for it, the criterion needs to be more specific.',
              'Independent — Each criterion should be verifiable on its own, without depending on other criteria.',
              'Outcome-focused — Describe what the user experiences, not how the code is implemented. "The user sees a loading spinner while data loads" is good. "Use React Query with staleTime of 5000ms" is implementation detail, not acceptance criteria.',
            ],
          },
          {
            type: 'heading',
            text: 'Story Lifecycle',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'A user story moves through several stages from creation to completion.',
          },
          {
            type: 'list',
            items: [
              'Backlog — The story has been created and lives in the product backlog. It is not yet assigned to any sprint. It may need further refinement, estimation, or acceptance criteria.',
              'Planned — The story has been selected during sprint planning and assigned to an upcoming sprint. The team has committed to completing it within the sprint.',
              'In Progress — The sprint is active and work on the story has begun. Team members are implementing the feature and checking off acceptance criteria.',
              'Done — All acceptance criteria are met, the work has been reviewed, and the story is considered complete. It contributes to the sprint\'s velocity.',
            ],
          },
          {
            type: 'heading',
            text: 'Story Detail Modal',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Click on any story in the backlog to open the Story Detail Modal. This modal shows all the story\'s fields in a comprehensive form: title, description, priority, story points, acceptance criteria, linked board, and sprint assignment. You can edit any field and save your changes. The modal is where you do detailed story work like refining acceptance criteria or updating estimates.',
          },
          {
            type: 'tip',
            text: 'When estimating story points, do it as a team. Individual estimates are often biased; team-based estimation (like planning poker) produces more accurate results because different perspectives catch complexity that one person might miss. If the team cannot agree on an estimate, the story probably needs to be discussed more or broken into smaller pieces.',
          },
        ],
      },
      {
        id: 'sprint-planning',
        title: 'Sprint Planning',
        description: 'Create sprints, set capacity, select stories, use the capacity indicator, and follow best practices',
        content: [
          {
            type: 'paragraph',
            text: 'Sprint planning is the ceremony where the team decides what work to take on during the next sprint. A sprint is a fixed-length iteration, typically one to four weeks, during which the team works to complete a set of user stories. The goal of sprint planning is to select the right amount of work that the team can realistically finish within the sprint period. In AgileFlow, sprint planning happens on the Backlog page through the Sprint Planning feature.',
          },
          {
            type: 'heading',
            text: 'What Is a Sprint?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'A sprint is a time-boxed period of work. Unlike open-ended project timelines, sprints have a fixed start and end date. This creates urgency, focus, and a regular cadence for delivering value. At the end of each sprint, the team has a set of completed stories to show, velocity data to track progress, and lessons learned to improve their process.',
          },
          {
            type: 'paragraph',
            text: 'Most teams run two-week sprints, but AgileFlow supports any duration. Shorter sprints (one week) provide faster feedback but leave less time for complex work. Longer sprints (three to four weeks) allow more work to be completed but delay feedback and can lead to scope creep. Choose a sprint length that works for your team and stick with it to build consistent velocity data.',
          },
          {
            type: 'heading',
            text: 'Creating a Sprint',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Navigate to the Backlog page from the sidebar.',
              'Click the "Plan Sprint" button to open the Sprint Planning Modal.',
              'Enter a sprint name that identifies this iteration (e.g., "Sprint 12", "January Week 2", "Release 3.0 Sprint 1").',
              'Set the start date for the sprint. This is when work begins.',
              'Set the end date for the sprint. This is the deadline by which all committed stories should be completed.',
              'Set the team capacity in story points. This number represents the total effort the team can handle during this sprint. Base it on historical velocity data if available; otherwise, start with a conservative estimate.',
              'Define a sprint goal — a brief statement describing the key objective or theme for this sprint (e.g., "Complete user authentication flow" or "Ship analytics dashboard v1").',
              'Select stories from the backlog to include in the sprint. You can drag stories from the backlog list into the sprint, or use checkboxes to select them.',
              'Watch the capacity indicator as you add stories. It shows the total committed story points compared to the sprint capacity.',
              'Click "Create Sprint" to finalize the sprint plan.',
            ],
          },
          {
            type: 'heading',
            text: 'The Capacity Indicator',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The capacity indicator is a visual progress bar that shows how many story points you have committed to the sprint relative to the team\'s capacity. It uses a traffic-light color system to warn you about overcommitment.',
          },
          {
            type: 'list',
            items: [
              'Green — Committed points are under 80% of capacity. The sprint has a healthy buffer. This is the ideal zone; it accounts for unexpected tasks, meetings, and other overhead that eat into productive time.',
              'Yellow — Committed points are between 80% and 100% of capacity. You are approaching the limit. Consider whether the team can realistically handle this workload or if some stories should be moved back to the backlog.',
              'Red — Committed points exceed 100% of capacity. The sprint is overcommitted. Unless the team has a strong track record of exceeding their capacity, remove some stories to bring the commitment back to a sustainable level.',
            ],
          },
          {
            type: 'heading',
            text: 'Sprint Planning Best Practices',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Use historical velocity as your capacity guide. If your team has completed 20-25 story points per sprint over the last three sprints, set capacity to 22. Do not set capacity based on hope or pressure.',
              'Prioritize stories from the top of the backlog. The product owner has already ranked them by value, so pulling from the top ensures you work on the most important things first.',
              'Ensure all selected stories have clear acceptance criteria. Vague stories lead to scope creep during the sprint and disputes about what "done" means.',
              'Leave a buffer. Do not fill capacity to exactly 100%. Unexpected bugs, production issues, and meetings will consume some capacity. Aim for 75-85% of capacity.',
              'The sprint goal should be achievable even if not every story is completed. Pick a goal that represents the minimum valuable outcome and plan additional stories around it.',
              'If the team cannot agree on whether a story fits in the sprint, it probably does not. Err on the side of committing to less work and finishing it all, rather than overcommitting and leaving work incomplete.',
            ],
          },
          {
            type: 'warning',
            text: 'Overcommitting a sprint is one of the most common mistakes in agile teams. When a team consistently takes on more than they can finish, it leads to incomplete work, demoralized team members, unreliable velocity data, and stakeholders who lose confidence in estimates. Use the capacity indicator as a hard constraint, not a suggestion.',
          },
          {
            type: 'tip',
            text: 'If this is your first sprint and you have no velocity data, start conservatively. It is much better to finish early and pull in extra work than to finish late and carry over incomplete stories. After two or three sprints, you will have enough velocity data to plan with confidence.',
          },
        ],
      },
      {
        id: 'sprint-execution',
        title: 'Sprint Execution',
        description: 'Track sprint progress, monitor velocity, complete sprints, and handle incomplete stories',
        content: [
          {
            type: 'paragraph',
            text: 'Once a sprint is created, the team shifts from planning to execution. Sprint execution is about maintaining visibility into progress, identifying blockers early, and ensuring the team stays on track to meet the sprint goal. AgileFlow provides several tools to monitor sprint health throughout the iteration.',
          },
          {
            type: 'heading',
            text: 'Sprint Progress Tracking',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Backlog page shows active sprints at the top of the view with a progress summary. This gives you a quick snapshot of where the sprint stands at any point during the iteration.',
          },
          {
            type: 'list',
            items: [
              'Committed Points — The total story points of all stories assigned to this sprint. This number is set during sprint planning and should not change during the sprint (adding scope mid-sprint is a red flag).',
              'Completed Points — The story points of stories marked as "Done" within this sprint. This number grows as the team completes work.',
              'Remaining Points — The difference between committed and completed points. This tells you how much work is left.',
              'Progress Bar — A visual bar that fills as stories are completed, giving you an at-a-glance view of sprint health.',
              'Story Cards — Each story within the sprint is displayed as a card showing its title, priority (with color coding), story points, and current status badge. You can quickly see which stories are in progress and which are still waiting.',
            ],
          },
          {
            type: 'heading',
            text: 'Velocity Tracking',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Velocity is the total number of story points the team completes in a sprint. AgileFlow tracks velocity automatically; you do not need to calculate it manually. Every time a story is marked as Done within a sprint, its story points are counted toward that sprint\'s velocity.',
          },
          {
            type: 'paragraph',
            text: 'Over time, velocity data creates a reliable baseline for future sprint planning. If your team has averaged 22 story points per sprint over the last four sprints, you can plan the next sprint with high confidence that 22 points is achievable. Velocity trends also reveal team health: rising velocity suggests the team is improving, while declining velocity might indicate burnout, growing technical debt, or process issues.',
          },
          {
            type: 'paragraph',
            text: 'The Analytics page displays historical velocity data, allowing you to see trends across multiple sprints. Use this data in sprint planning to set realistic capacity targets.',
          },
          {
            type: 'heading',
            text: 'Completing a Sprint',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'When the sprint end date arrives, it is time to close the sprint and review the results. Completing a sprint in AgileFlow records the sprint\'s velocity, updates historical metrics, and handles any incomplete stories.',
          },
          {
            type: 'list',
            items: [
              'Review all stories in the sprint. Verify that stories marked "Done" truly meet their acceptance criteria.',
              'Identify incomplete stories — any story not in "Done" status when the sprint ends.',
              'Decide what to do with incomplete stories: move them back to the product backlog for re-prioritization, or roll them into the next sprint if they are still high priority and partially complete.',
              'Record the sprint\'s actual velocity (completed story points) for historical tracking.',
              'Discuss what went well and what did not as input for the sprint retrospective.',
            ],
          },
          {
            type: 'heading',
            text: 'Rolling Over Incomplete Stories',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Incomplete stories at the end of a sprint are a normal part of agile development. Not every sprint will be perfect. The key is to handle rollovers intentionally rather than automatically. Before rolling a story into the next sprint, ask: Is this story still the highest priority? Has the scope changed? Should the story points be re-estimated based on what the team learned while working on it?',
          },
          {
            type: 'paragraph',
            text: 'Rolling too many stories between sprints is a warning sign. If more than 20% of committed points consistently roll over, the team is overcommitting. Reduce capacity in the next sprint planning session and investigate what is causing incomplete work.',
          },
          {
            type: 'tip',
            text: 'Hold a brief sprint review at the end of each sprint, even if it is just 15 minutes. Demonstrate completed stories to stakeholders, review the velocity number, and note any patterns. The AI assistant with the /performance command can generate a quick summary of team metrics to guide the discussion.',
          },
        ],
      },
      {
        id: 'backlog-prioritization',
        title: 'Backlog Prioritization',
        description: 'Strategies for ordering, filtering, and grooming your product backlog',
        content: [
          {
            type: 'paragraph',
            text: 'A well-prioritized backlog is the engine that drives effective sprint planning. When the backlog is properly ordered, the team always knows what to work on next, sprint planning sessions are fast and focused, and stakeholders have clear visibility into the product roadmap. Prioritization is not a one-time activity; it is an ongoing process that requires regular attention.',
          },
          {
            type: 'heading',
            text: 'Prioritization Strategies',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'There are several approaches to prioritizing backlog items, and most teams use a combination of these strategies based on their context.',
          },
          {
            type: 'list',
            items: [
              'Business Value — Prioritize stories that deliver the most value to users or the business. Features that drive revenue, reduce costs, or solve critical user pain points should be at the top.',
              'Risk and Uncertainty — Tackle high-risk or uncertain stories early. Building the hardest parts first reveals problems while there is still time to adjust. Leaving risky work to the end is a recipe for surprises.',
              'Dependencies — Identify stories that block other stories and prioritize them higher. If Story B cannot start until Story A is done, Story A needs to be scheduled first.',
              'Effort vs. Value — Use the priority field in combination with story points. High-value, low-effort stories (often called "quick wins") should be prioritized because they deliver maximum value for minimum investment.',
              'Stakeholder Input — Regularly consult with stakeholders, customers, and team members about priorities. The product owner makes the final call, but informed input leads to better decisions.',
            ],
          },
          {
            type: 'heading',
            text: 'Filtering and Searching the Backlog',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Backlog page provides several tools to help you find and manage stories efficiently.',
          },
          {
            type: 'list',
            items: [
              'Search Bar — Type keywords to filter stories by title. This is the fastest way to find a specific story in a large backlog.',
              'Priority Filter — Use the priority dropdown to show only stories of a specific priority level. For example, show only "Critical" and "High" stories when preparing for sprint planning.',
              'Status Indicators — Each story card shows its current status (Backlog, Planned, In Progress, Done) with a colored badge, making it easy to scan the backlog and understand the state of each item.',
            ],
          },
          {
            type: 'heading',
            text: 'Drag-to-Reorder',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Stories in the backlog support drag-and-drop reordering. Click and hold a story card, then drag it up or down to change its position. Items at the top of the backlog are considered the highest priority and will be pulled into sprints first. This physical reordering is often more intuitive than assigning numeric priority scores, because it forces you to make relative comparisons: "Is this story more or less important than the one above it?"',
          },
          {
            type: 'heading',
            text: 'Backlog Grooming Sessions',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Backlog grooming (also called backlog refinement) is a regular team activity where you review and improve the quality of backlog items. During grooming, the team:',
          },
          {
            type: 'list',
            items: [
              'Reviews and re-ranks stories based on current priorities',
              'Removes outdated or duplicate stories that are no longer relevant',
              'Adds missing acceptance criteria to stories near the top of the backlog',
              'Breaks large stories (8 or 13 points) into smaller, more manageable stories',
              'Estimates or re-estimates story points based on new information',
              'Discusses requirements and edge cases to reduce ambiguity before sprint planning',
            ],
          },
          {
            type: 'paragraph',
            text: 'Most teams groom the backlog once per sprint, typically mid-sprint. This ensures the top of the backlog is always ready for the next sprint planning session.',
          },
          {
            type: 'heading',
            text: 'Stats Cards',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Backlog page displays stats cards at the top showing key metrics about your backlog health. These include the total number of stories, a breakdown by priority level, stories assigned to active sprints, and unestimated stories. Use these stats to gauge the overall health of your backlog: a high number of unestimated stories means the backlog needs grooming, while a lopsided priority distribution might indicate that priorities need to be recalibrated.',
          },
          {
            type: 'tip',
            text: 'Keep the top 10-15 stories in the backlog fully detailed with acceptance criteria, story points, and clear titles. These are the stories most likely to be pulled into the next sprint. Stories further down the list can be less refined; you will detail them as they move up.',
          },
        ],
      },
      {
        id: 'sprint-retrospectives',
        title: 'Sprint Retrospectives',
        description: 'Use AgileFlow data and AI insights to run effective retrospectives and improve your process',
        content: [
          {
            type: 'paragraph',
            text: 'A sprint retrospective is a team meeting held at the end of each sprint where the team reflects on what went well, what did not go well, and what they can improve in the next sprint. Retrospectives are one of the most valuable ceremonies in agile because they create a structured opportunity for continuous improvement. Even high-performing teams benefit from regular retrospectives because there is always something to optimize.',
          },
          {
            type: 'heading',
            text: 'Why Retrospectives Matter',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Without retrospectives, teams tend to repeat the same mistakes sprint after sprint. A sprint where 30% of stories rolled over might happen once due to bad luck, but if it happens three sprints in a row, there is a systemic problem that needs to be addressed. Retrospectives surface these patterns and give the team a forum to discuss and resolve them.',
          },
          {
            type: 'list',
            items: [
              'Process Improvement — Identify bottlenecks, communication gaps, and workflow inefficiencies that slow the team down.',
              'Team Morale — Give every team member a voice. People who feel heard are more engaged and productive.',
              'Accountability — When the team agrees on improvement actions, they hold themselves accountable in the next retrospective.',
              'Data-Driven Decisions — Use sprint metrics (velocity, completion rate, rollover count) to ground discussions in facts rather than feelings.',
            ],
          },
          {
            type: 'heading',
            text: 'Using AgileFlow Data for Retrospectives',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow provides several data sources that make retrospectives more productive and objective. Instead of relying solely on memory, the team can reference concrete metrics.',
          },
          {
            type: 'list',
            items: [
              'Sprint Velocity — Compare this sprint\'s velocity to previous sprints. Was it higher, lower, or consistent? If velocity dropped, discuss why.',
              'Completion Rate — What percentage of committed stories were completed? A high completion rate suggests good planning; a low rate suggests overcommitment or blockers.',
              'Rollover Stories — Which stories were not completed? Were they too large, poorly defined, or blocked by external dependencies?',
              'Status Distribution — How much time did tasks spend in "Stuck" status? A lot of stuck tasks indicates the team is encountering blockers that need systemic solutions.',
              'Team Workload Charts — Was work evenly distributed across team members, or were some people overloaded while others had capacity?',
              'Board Analytics — The board analytics panel shows status distribution, team workload, and priority breakdown for each board. Open it during the retro to review project-specific metrics.',
            ],
          },
          {
            type: 'heading',
            text: 'The AI /performance Command',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow\'s AI assistant includes a /performance command specifically designed to support retrospectives. When you type /performance in the AI chat (either the floating panel or the full AI Chat page), the AI analyzes your recent sprint data and generates a natural-language summary of team performance. This summary typically includes velocity trends, completion rates, areas of concern, and actionable suggestions for improvement.',
          },
          {
            type: 'paragraph',
            text: 'The /performance command is valuable because it synthesizes multiple data points into a coherent narrative. Instead of manually reviewing charts and doing mental math, you get a pre-analyzed report that you can share with the team at the start of the retrospective as a conversation starter.',
          },
          {
            type: 'heading',
            text: 'Running an Effective Retrospective',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'A typical retrospective follows a structured format to ensure productive discussion.',
          },
          {
            type: 'steps',
            items: [
              'Open the AI Chat and run the /performance command to generate a sprint summary. Share the results with the team.',
              'Review the board analytics panel for each active board. Note completion rates, overdue tasks, and workload distribution.',
              'Discuss "What went well?" — Identify practices, tools, or behaviors that contributed to successful outcomes. Celebrate wins.',
              'Discuss "What did not go well?" — Identify pain points, blockers, communication issues, or process failures. Be specific and constructive.',
              'Discuss "What can we improve?" — For each problem identified, brainstorm concrete, actionable improvements. Avoid vague goals like "communicate better"; instead, commit to specific changes like "add a 15-minute sync every Tuesday and Thursday."',
              'Pick 1-3 improvement actions to implement in the next sprint. Trying to fix everything at once is overwhelming; focused improvements are more likely to stick.',
              'Document the agreed actions and review them at the start of the next retrospective to check progress.',
            ],
          },
          {
            type: 'heading',
            text: 'Common Retrospective Topics',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Sprint overcommitment — Are we consistently taking on more than we can finish? Should we reduce capacity by 10-15%?',
              'Story quality — Were stories well-defined with clear acceptance criteria, or did the team spend time clarifying requirements mid-sprint?',
              'Blockers — Were there recurring blockers (waiting on external teams, unclear requirements, environment issues)? How can we prevent them?',
              'Testing gaps — Did any bugs escape because acceptance criteria were incomplete or untested?',
              'Workload balance — Was work distributed fairly, or was one person carrying most of the load?',
              'Communication — Were standups effective? Did the team surface problems early enough to address them?',
            ],
          },
          {
            type: 'tip',
            text: 'Keep retrospectives to 30-60 minutes. Longer meetings lose energy and focus. If a topic needs deep discussion, schedule a separate session for it. The retrospective should identify the issues; dedicated follow-up sessions can address them in detail.',
          },
          {
            type: 'warning',
            text: 'Retrospectives only work if the team follows through on improvement actions. If you identify problems but never implement solutions, the team will lose faith in the process and stop engaging. Hold yourselves accountable by reviewing last sprint\'s action items at the start of every new retrospective.',
          },
        ],
      },
    ],
  },
