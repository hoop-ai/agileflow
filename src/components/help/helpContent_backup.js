export const helpCategories = [
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
        description: 'Overview of the platform and who it\'s built for',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow is a modern project management platform designed for agile teams, product managers, and software developers. It brings together task tracking, sprint planning, analytics, and team collaboration in one streamlined workspace.',
          },
          {
            type: 'heading',
            text: 'What You Can Do with AgileFlow',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Create and manage project boards with multiple view types (Table, Kanban, Calendar, Timeline)',
              'Plan and execute sprints with capacity tracking and velocity metrics',
              'Organize your product backlog with user stories, priorities, and story points',
              'Visualize progress with built-in analytics dashboards and charts',
              'Schedule meetings, milestones, and deadlines on a shared calendar',
              'Get intelligent suggestions from the built-in AI assistant',
              'Collaborate with your team through assignments, notifications, and activity feeds',
            ],
          },
          {
            type: 'heading',
            text: 'Who Is AgileFlow For?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow is designed for cross-functional teams that follow agile methodologies. Whether you are a Scrum Master running sprints, a product owner managing the backlog, or a developer tracking daily tasks, AgileFlow adapts to your workflow.',
          },
          {
            type: 'list',
            items: [
              'Project Managers — oversee boards, track progress, and generate reports',
              'Developers — manage tasks, update statuses, and log work',
              'Product Owners — prioritize backlogs, write user stories, and plan sprints',
              'Team Leads — monitor team performance and workload distribution',
            ],
          },
          {
            type: 'tip',
            text: 'AgileFlow works best when your whole team is on the platform. Invite your teammates from the sidebar to get the most out of collaboration features.',
          },
        ],
      },
      {
        id: 'create-account',
        title: 'Creating Your Account',
        description: 'Sign up, configure your profile, and personalize your workspace',
        content: [
          {
            type: 'paragraph',
            text: 'Getting started with AgileFlow takes less than a minute. You can create an account with your email address and a password — no credit card required.',
          },
          {
            type: 'heading',
            text: 'Sign Up',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Navigate to the AgileFlow login page.',
              'Click "Create account" below the login form.',
              'Enter your full name, email address, and a secure password.',
              'Click "Sign Up" to create your account.',
              'You will be automatically signed in and redirected to the Dashboard.',
            ],
          },
          {
            type: 'heading',
            text: 'Set Up Your Profile',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'After signing up, head to Settings to complete your profile. A complete profile helps your teammates identify you across boards and notifications.',
          },
          {
            type: 'steps',
            items: [
              'Click "Settings" in the left sidebar.',
              'Under the Profile tab, fill in your full name, job title, and department.',
              'Your avatar is automatically generated from your initials with a unique color.',
              'Click "Save Changes" to update your profile.',
            ],
          },
          {
            type: 'heading',
            text: 'Choose Your Theme',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow supports light mode, dark mode, and automatic system detection. You can switch themes at any time from the top navigation bar or from Settings.',
          },
          {
            type: 'steps',
            items: [
              'Click the sun/moon icon in the top navigation bar to toggle between light and dark mode.',
              'Or go to Settings → Appearance to choose between Light, Dark, or System (auto-detect).',
            ],
          },
          {
            type: 'tip',
            text: 'The System theme option automatically matches your operating system preference, switching between light and dark mode as your OS does.',
          },
        ],
      },
      {
        id: 'quick-start',
        title: 'Quick Start Guide',
        description: 'Create your first board and start managing tasks in under 5 minutes',
        content: [
          {
            type: 'paragraph',
            text: 'This guide walks you through the essential steps to get productive with AgileFlow. By the end, you will have a fully functional project board with tasks and columns.',
          },
          {
            type: 'heading',
            text: 'Step 1: Create Your First Board',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click "Boards" in the left sidebar to open the Boards page.',
              'Click the "+ New Board" button in the top-right corner.',
              'Enter a title for your board (e.g., "Sprint 1" or "Product Launch").',
              'Optionally add a description, choose an icon, and pick a color.',
              'Click "Create Board" to create it.',
            ],
          },
          {
            type: 'heading',
            text: 'Step 2: Add Columns',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Columns define the data fields for your tasks. Every board starts with a title column, and you can add more to capture the information you need.',
          },
          {
            type: 'steps',
            items: [
              'Open your new board by clicking on it.',
              'Click the "+" button in the column header area to add a new column.',
              'Choose a column type: Status, Priority, Date, People, Number, Budget, Text, Checkbox, Dropdown, Tags, or Timeline.',
              'Give the column a name and click "Add Column".',
              'Repeat to add all the columns your workflow requires.',
            ],
          },
          {
            type: 'tip',
            text: 'New boards come pre-configured with six columns (Task, Status, Owner, Priority, Due Date, Notes) and three groups (To Do, In Progress, Done). You can always add or remove columns later.',
          },
          {
            type: 'heading',
            text: 'Step 3: Add Tasks',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click the "+ Add Item" button at the bottom of a group to create a new task.',
              'Type a task title and press Enter or click the add button.',
              'Click on any cell in the row to set the status, priority, assignee, due date, or other fields.',
              'Click the task title to open the full Task Edit Modal for detailed editing.',
            ],
          },
          {
            type: 'heading',
            text: 'Step 4: Organize with Groups',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click "New Group" above the board table to create a task group.',
              'Name the group (e.g., "To Do", "In Progress", "Done").',
              'Drag and drop tasks between groups to organize your workflow.',
            ],
          },
          {
            type: 'heading',
            text: 'Step 5: Invite Your Team',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click the "Invite" button in the sidebar or board header.',
              'Enter a teammate\'s email address and select their role.',
              'Click "Send Invite" to add them to your workspace.',
            ],
          },
          {
            type: 'warning',
            text: 'Team members need to create their own AgileFlow account using the email you invited them with. They will gain access to shared boards once they sign in.',
          },
        ],
      },
      {
        id: 'understanding-interface',
        title: 'Understanding the Interface',
        description: 'Navigate the sidebar, search, notifications, and key UI elements',
        content: [
          {
            type: 'paragraph',
            text: 'The AgileFlow interface is organized around a collapsible sidebar, a top navigation bar, and a main content area. Everything you need is accessible within two clicks.',
          },
          {
            type: 'heading',
            text: 'Sidebar Navigation',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The left sidebar is your primary navigation hub. It contains links to all major sections of AgileFlow.',
          },
          {
            type: 'list',
            items: [
              'Dashboard — your home screen with stats, recent boards, and activity',
              'Boards — list of all your project boards',
              'Backlog — product backlog with user stories and sprint planning',
              'Calendar — month view calendar for events, milestones, and deadlines',
              'Analytics — charts and metrics across all your projects',
              'AI Chat — full-page AI assistant with conversation history and session management',
            ],
          },
          {
            type: 'paragraph',
            text: 'On smaller screens, the sidebar collapses into a hamburger menu. Tap the menu icon in the top-left corner to open it.',
          },
          {
            type: 'heading',
            text: 'Global Search',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Press Ctrl+K (or Cmd+K on Mac) to open the global search dialog. You can search across all boards and tasks instantly. Results appear as you type, grouped by boards and tasks.',
          },
          {
            type: 'shortcut',
            keys: 'Ctrl + K',
            description: 'Open global search',
          },
          {
            type: 'heading',
            text: 'Notifications',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The bell icon in the top navigation bar shows your notifications. A badge appears when you have unread notifications. Click it to see recent activity such as task assignments, mentions, sprint updates, and system alerts.',
          },
          {
            type: 'heading',
            text: 'Theme Toggle',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Click the sun or moon icon in the top bar to switch between light and dark mode instantly. Your preference is saved and persists across sessions.',
          },
          {
            type: 'heading',
            text: 'AI Assistant',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The AI assistant is available in two ways: as a floating chat panel (click the chat bubble in the bottom-right corner) and as a dedicated full-page AI Chat accessible from the sidebar. Both support Fast and Thinking response modes, slash commands, and context-aware suggestions.',
          },
          {
            type: 'tip',
            text: 'You can access Settings, Admin panel, Help Center, and sign out from the user dropdown menu in the bottom of the sidebar.',
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
    description: 'Your central hub for project overview and quick actions',
    icon: 'LayoutGrid',
    articles: [
      {
        id: 'dashboard-overview',
        title: 'Dashboard Overview',
        description: 'Understand the layout and purpose of your Dashboard',
        content: [
          {
            type: 'paragraph',
            text: 'The Dashboard is your home screen in AgileFlow. It provides a high-level snapshot of your projects, recent activity, and quick access to common actions. Every time you log in, the Dashboard greets you with a personalized message based on the time of day.',
          },
          {
            type: 'heading',
            text: 'Dashboard Layout',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Stats Overview — four KPI cards at the top showing key metrics',
              'Recent Boards — your most recently updated project boards with quick access links',
              'Activity Feed — a chronological stream of recent events across your projects',
              'Quick Actions — shortcut buttons to create boards and user stories without leaving the Dashboard',
            ],
          },
          {
            type: 'paragraph',
            text: 'The Dashboard automatically loads your latest data when you visit it. If data fails to load, a retry button appears so you can refresh without reloading the page.',
          },
          {
            type: 'tip',
            text: 'The Dashboard fetches your 10 most recent boards and 20 most recent tasks. For a complete view of all your projects, visit the Boards page.',
          },
        ],
      },
      {
        id: 'stats-metrics',
        title: 'Stats & Metrics',
        description: 'What each KPI card on the Dashboard shows',
        content: [
          {
            type: 'paragraph',
            text: 'The Stats Overview section displays four metric cards at the top of your Dashboard. These give you an at-a-glance understanding of your project health.',
          },
          {
            type: 'heading',
            text: 'KPI Cards',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Total Tasks — the number of tasks across all your boards',
              'Active Boards — how many boards you currently have in your workspace',
              'Team Members — the number of people collaborating in your workspace',
              'Completion Rate — the percentage of tasks marked as "Done" across all boards',
            ],
          },
          {
            type: 'paragraph',
            text: 'These metrics update in real time as you create tasks, complete items, and add team members. They provide a quick pulse check on overall project progress.',
          },
          {
            type: 'tip',
            text: 'If your completion rate seems low, check if you have tasks stuck in "Working on it" or "Stuck" status. The Analytics page provides a more detailed breakdown.',
          },
        ],
      },
      {
        id: 'activity-feed',
        title: 'Activity Feed',
        description: 'How activity is tracked and displayed on your Dashboard',
        content: [
          {
            type: 'paragraph',
            text: 'The Activity Feed on your Dashboard shows a chronological list of recent events in your workspace. It helps you stay informed about what has changed since your last visit.',
          },
          {
            type: 'heading',
            text: 'What Appears in the Feed',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Tasks created, updated, or deleted',
              'Board modifications (new columns, renamed boards)',
              'Status and priority changes on tasks',
              'Sprint starts, completions, and planning events',
              'Team member additions and role changes',
            ],
          },
          {
            type: 'paragraph',
            text: 'Each activity entry shows the action taken, the item affected, and a relative timestamp (e.g., "2 hours ago"). Click on an activity item to navigate directly to the related board or task.',
          },
          {
            type: 'heading',
            text: 'Activity Tracking',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Activity is tracked automatically by the system. Every change to a board, task, or story generates an activity log entry. You can also view detailed activity history for individual boards from the board\'s analytics panel.',
          },
        ],
      },
      {
        id: 'quick-actions',
        title: 'Quick Actions',
        description: 'Create boards and stories directly from the Dashboard',
        content: [
          {
            type: 'paragraph',
            text: 'Quick Actions let you create new items without navigating away from the Dashboard. They are designed for speed — when an idea strikes, you can capture it immediately.',
          },
          {
            type: 'heading',
            text: 'Available Quick Actions',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Create Board — opens the board creation dialog with fields for title, description, icon, and color',
              'Create Story — opens the story creation dialog to add a new user story to your backlog',
            ],
          },
          {
            type: 'paragraph',
            text: 'Boards created via Quick Actions appear immediately in your Recent Boards section and on the Boards page. Stories are added to your product backlog and can be assigned to sprints later.',
          },
          {
            type: 'tip',
            text: 'Use Quick Actions when you want to quickly capture a new board idea or user story. For more detailed setup, navigate to the Boards or Backlog page directly.',
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
    description: 'Create boards, manage tasks, and organize your work',
    icon: 'Kanban',
    articles: [
      {
        id: 'creating-board',
        title: 'Creating a Board',
        description: 'Set up a new project board with title, description, and visual settings',
        content: [
          {
            type: 'paragraph',
            text: 'Boards are the foundation of project management in AgileFlow. Each board represents a project, a workstream, or any collection of related tasks. You can create as many boards as you need.',
          },
          {
            type: 'heading',
            text: 'How to Create a Board',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Navigate to the Boards page from the sidebar.',
              'Click the "+ New Board" button in the top-right corner.',
              'Enter a board title — this is the only required field.',
              'Optionally add a description to provide context for your team.',
              'Choose an icon emoji to visually identify the board.',
              'Select a color theme for the board header.',
              'Click "Create Board" to finalize.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Your new board opens automatically after creation. It comes pre-configured with six columns (Task, Status, Owner, Priority, Due Date, Notes) and three workflow groups (To Do, In Progress, Done). You can immediately start adding tasks or customize the structure.',
          },
          {
            type: 'heading',
            text: 'Board Settings',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'You can edit a board\'s title, description, icon, and color at any time from the Board Header area. Click the board title to rename it, or use the board settings menu for other changes.',
          },
          {
            type: 'tip',
            text: 'Use descriptive board names that include the project or sprint name. For example, "Q1 Product Launch" or "Sprint 24 — User Auth" makes boards easy to find via search.',
          },
        ],
      },
      {
        id: 'board-views',
        title: 'Board Views',
        description: 'Switch between Table, Kanban, Calendar, and Timeline views',
        content: [
          {
            type: 'paragraph',
            text: 'Every board in AgileFlow supports four different view types. You can switch between them at any time without losing data — they are just different ways to visualize the same tasks.',
          },
          {
            type: 'heading',
            text: 'Table View (Default)',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Table view displays tasks as rows in a spreadsheet-like format. Each column represents a data field (status, priority, assignee, etc.). This is the most detailed view and is ideal for managing large numbers of tasks with many data points.',
          },
          {
            type: 'list',
            items: [
              'Inline editing — click any cell to edit its value directly',
              'Column reordering — drag column headers to rearrange',
              'Group sections — tasks are organized into collapsible groups',
              'Summary rows — each group shows aggregated metrics at the bottom',
            ],
          },
          {
            type: 'heading',
            text: 'Kanban View',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Kanban view organizes tasks into vertical columns based on their status. It provides a visual workflow that is perfect for tracking task progression from "Not Started" through "Working on it" to "Done".',
          },
          {
            type: 'list',
            items: [
              'Drag and drop tasks between status columns to update their status',
              'Each card shows the task title, priority badge, and assignee avatar',
              'Column headers show the count of tasks in each status',
              'Best for daily standups and visualizing workflow bottlenecks',
            ],
          },
          {
            type: 'heading',
            text: 'Calendar View',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Calendar view displays tasks on a monthly calendar based on their due dates. Tasks without dates do not appear in this view. It is useful for deadline-driven projects and release planning.',
          },
          {
            type: 'list',
            items: [
              'Tasks appear as colored blocks on their due date',
              'Click a date to see all tasks due that day',
              'Navigate between months using the arrow buttons',
              'Best for tracking deadlines and milestone dates',
            ],
          },
          {
            type: 'heading',
            text: 'Timeline View',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Timeline view (Gantt-style) shows tasks along a horizontal time axis. Tasks with start and end dates appear as bars spanning their duration. This view excels at showing task overlap and project scheduling.',
          },
          {
            type: 'list',
            items: [
              'Horizontal bars represent task duration from start to end date',
              'Color-coded by priority — Critical (red), High (orange), Medium (blue), Low (light blue)',
              'Three zoom levels: Week (shows individual days), Month (default, shows days with weekday), and Quarter (shows weeks across 3 months)',
              'Navigate with Previous/Next/Today buttons; today\'s date is highlighted',
              'Weekend days have a muted background for visual distinction',
              'Requires a Timeline column or two or more Date columns to display tasks',
            ],
          },
          {
            type: 'tip',
            text: 'Switch views using the view selector tabs at the top of any board. Your view preference is remembered per board.',
          },
        ],
      },
      {
        id: 'managing-columns',
        title: 'Managing Columns',
        description: 'Add and configure the 11 column data types',
        content: [
          {
            type: 'paragraph',
            text: 'Columns define what data you track for each task. AgileFlow supports 11 different column types, each designed for a specific kind of information.',
          },
          {
            type: 'heading',
            text: 'Adding a Column',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Open a board and look for the "+" icon at the end of the column headers.',
              'Click it to open the New Column modal.',
              'Enter a column name (e.g., "Assignee", "Due Date", "Sprint Points").',
              'Select the column type from the dropdown.',
              'If you chose Dropdown, add your custom options with labels and colors.',
              'Click "Add Column" to add it to the board.',
            ],
          },
          {
            type: 'heading',
            text: 'Column Types',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Text — free-form text field for descriptions, notes, or links',
              'Status — predefined status labels with colors (Not Started, Working on it, Done, Stuck)',
              'Priority — priority levels with color coding (Low, Medium, High, Critical)',
              'Date — date picker with calendar popup for due dates and deadlines',
              'People — assignee selector with team member dropdown showing avatars and names',
              'Number — numeric field for estimates, hours, or counts',
              'Budget — currency-formatted field with dollar amounts',
              'Checkbox — boolean toggle for yes/no tracking (e.g., "Approved", "Reviewed")',
              'Dropdown — custom dropdown with user-defined options and colors',
              'Tags — multi-select labels with colored badges (includes predefined suggestions like Urgent, Bug, Feature, and custom tags)',
              'Timeline — date range picker with start and end dates, used for the Timeline view',
            ],
          },
          {
            type: 'heading',
            text: 'Column Ordering',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Columns appear in the order they were added. The task title column is always first and cannot be moved. You can hide columns you do not need from the Hide Menu in the board toolbar.',
          },
          {
            type: 'warning',
            text: 'Deleting a column removes that field from all tasks on the board. This action cannot be undone, so use caution when removing columns that contain data.',
          },
        ],
      },
      {
        id: 'working-with-tasks',
        title: 'Working with Tasks',
        description: 'Create, edit, and manage tasks with all available data fields',
        content: [
          {
            type: 'paragraph',
            text: 'Tasks (also called items) are the core units of work in AgileFlow. Each task lives on a board and can have multiple data fields depending on the columns you have set up.',
          },
          {
            type: 'heading',
            text: 'Creating Tasks',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Navigate to a board and find the group where you want to add the task.',
              'Click the "+ Add Item" button at the bottom of the group.',
              'Type a descriptive task title and press Enter.',
              'The new task appears as a row in the table with empty data fields ready to fill in.',
            ],
          },
          {
            type: 'heading',
            text: 'Editing Tasks Inline',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Click on any cell in the task row to edit it directly. Each column type has its own inline editor:',
          },
          {
            type: 'list',
            items: [
              'Status cells show a dropdown with colored status options',
              'Priority cells show a dropdown with Low, Medium, High, and Critical levels',
              'Date cells open a calendar picker',
              'People cells open an assignee selector',
              'Number and Budget cells accept numeric input',
              'Checkbox cells toggle on click',
              'Dropdown cells show your custom options',
            ],
          },
          {
            type: 'heading',
            text: 'Task Edit Modal',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'For a more comprehensive editing experience, click the task title to open the Task Edit Modal. This dialog shows all fields in a form layout, making it easier to update multiple fields at once.',
          },
          {
            type: 'list',
            items: [
              'Edit the task title at the top of the modal',
              'Each column appears as a labeled form field',
              'Click "Save" to apply all changes at once',
              'Click "Delete" to permanently remove the task (with a confirmation prompt)',
            ],
          },
          {
            type: 'tip',
            text: 'Use inline editing for quick, single-field updates. Use the Task Edit Modal when you need to update multiple fields or want a focused editing view.',
          },
        ],
      },
      {
        id: 'groups-organization',
        title: 'Groups & Organization',
        description: 'Create groups and organize tasks by category',
        content: [
          {
            type: 'paragraph',
            text: 'Groups are sections within a board that organize tasks into logical clusters. Think of them as categories, phases, or swimlanes that give structure to your task list.',
          },
          {
            type: 'heading',
            text: 'Creating Groups',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click the "New Group" button in the board toolbar.',
              'Enter a name for the group (e.g., "Frontend Tasks", "Bugs", "Backlog").',
              'Choose a color for the group header.',
              'Click "Create" to add the group to the board.',
            ],
          },
          {
            type: 'heading',
            text: 'Collapsible Groups',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Each group has a chevron icon that toggles between expanded and collapsed states. Collapse groups you are not actively working on to reduce visual clutter and focus on what matters.',
          },
          {
            type: 'heading',
            text: 'Group By Options',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The "Group By" menu in the board toolbar lets you automatically organize tasks into groups based on a field value.',
          },
          {
            type: 'list',
            items: [
              'Group by Status — creates groups for each status (Not Started, Working on it, Done, Stuck)',
              'Group by Priority — creates groups for each priority level (Low, Medium, High, Critical)',
              'Group by Assignee — creates groups for each team member',
              'Group by Date — creates groups based on due date ranges',
            ],
          },
          {
            type: 'heading',
            text: 'Group Summaries',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Each group displays a summary row at the bottom showing aggregated metrics for that group. This includes task counts, status distribution, and numeric totals for number and budget columns.',
          },
          {
            type: 'tip',
            text: 'Combine Group By with filters to create powerful views. For example, group by priority and filter to only show tasks assigned to you.',
          },
        ],
      },
      {
        id: 'filtering-sorting',
        title: 'Filtering & Sorting',
        description: 'Filter tasks by person, status, priority, and date — sort by any column',
        content: [
          {
            type: 'paragraph',
            text: 'Boards with many tasks benefit from filtering and sorting. AgileFlow provides a rich filter panel and per-column sorting to help you find exactly what you are looking for.',
          },
          {
            type: 'heading',
            text: 'Filter Panel',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Click the "Filter" button in the board toolbar to open the filter panel. It slides open with checkboxes for each filter category.',
          },
          {
            type: 'list',
            items: [
              'Status filter — check one or more statuses to show only matching tasks',
              'Priority filter — check one or more priority levels',
              'Person filter — select specific team members to see only their assigned tasks',
              'Date filter — filter by due date ranges',
            ],
          },
          {
            type: 'paragraph',
            text: 'Filters are additive within a category (OR logic) and intersecting across categories (AND logic). For example, selecting "High" and "Critical" priority with "Working on it" status shows tasks that are high or critical AND have a "Working on it" status.',
          },
          {
            type: 'heading',
            text: 'Person Filter',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Person Filter is a dedicated filter at the top of the board that quickly narrows tasks to a specific team member. Click the people icon in the toolbar and select a name to filter.',
          },
          {
            type: 'heading',
            text: 'Sorting',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Click any column header to sort the board by that column. Click again to toggle between ascending and descending order. The Sort Menu in the toolbar provides additional sort options and allows multi-level sorting.',
          },
          {
            type: 'tip',
            text: 'Use the "Hide" menu to temporarily hide columns you do not need. This simplifies the view without removing data.',
          },
        ],
      },
      {
        id: 'drag-and-drop',
        title: 'Drag and Drop',
        description: 'Reorder tasks within groups and move them across groups and Kanban columns',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow uses intuitive drag-and-drop interactions to let you rearrange tasks and update their status visually. Drag and drop works in both Table and Kanban views.',
          },
          {
            type: 'heading',
            text: 'Table View — Reordering Tasks',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Click and hold a task row to pick it up',
              'Drag it up or down within the same group to reorder',
              'Drag it into a different group to move it between groups',
              'Drop it in the desired position to finalize the move',
            ],
          },
          {
            type: 'heading',
            text: 'Kanban View — Moving Between Columns',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Each Kanban column represents a status (e.g., Not Started, Working on it, Done)',
              'Grab a task card and drag it to another column to change its status',
              'The status field updates automatically when you drop the card',
              'Reorder cards within a column by dragging up or down',
            ],
          },
          {
            type: 'paragraph',
            text: 'All drag-and-drop changes are saved automatically. Your team members will see the updated positions the next time they load the board.',
          },
          {
            type: 'tip',
            text: 'The Kanban view is especially useful during daily standup meetings. Drag tasks from "Working on it" to "Done" as the team reports their progress.',
          },
        ],
      },
      {
        id: 'unassigned-tasks',
        title: 'Unassigned Tasks View',
        description: 'Find and assign tasks that have no owner yet',
        content: [
          {
            type: 'paragraph',
            text: 'The Unassigned Tasks view is a dedicated section on the Board page that surfaces all tasks without an assignee. It helps you quickly identify work that needs an owner and assign it to team members.',
          },
          {
            type: 'heading',
            text: 'How It Works',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Tasks without a People column value are automatically collected into the Unassigned section',
              'Each task card shows the task title, group name, status, priority, and due date',
              'A quick "Assign" button on each card opens a team member dropdown',
              'Select a team member from the dropdown to assign the task instantly',
            ],
          },
          {
            type: 'heading',
            text: 'When to Use It',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Check the Unassigned Tasks view during sprint planning or daily standups to ensure no tasks fall through the cracks. It is especially useful after importing or bulk-creating tasks.',
          },
          {
            type: 'tip',
            text: 'Use the AI assistant\'s /assign command to get intelligent suggestions for who should handle unassigned tasks based on workload and expertise.',
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
    description: 'Manage your product backlog and plan agile sprints',
    icon: 'ListOrdered',
    articles: [
      {
        id: 'user-stories',
        title: 'User Stories',
        description: 'Create and manage user stories with priorities, points, and acceptance criteria',
        content: [
          {
            type: 'paragraph',
            text: 'User stories are the building blocks of your product backlog. In AgileFlow, each story represents a feature or requirement from the user\'s perspective, following the standard agile format.',
          },
          {
            type: 'heading',
            text: 'Creating a User Story',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Navigate to the Backlog page from the sidebar.',
              'Click the "+ New Story" button at the top of the page.',
              'Enter a title that describes the feature (e.g., "User can reset password via email").',
              'Add a detailed description explaining the story\'s scope and requirements.',
              'Set the priority level: Low, Medium, High, or Critical.',
              'Assign story points to estimate effort (using Fibonacci sequence: 1, 2, 3, 5, 8, 13).',
              'Add acceptance criteria — specific conditions that must be met for the story to be considered done.',
              'Link the story to a board if it relates to a specific project.',
              'Click "Create Story" to add it to the backlog.',
            ],
          },
          {
            type: 'heading',
            text: 'Story Lifecycle',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Backlog — the story is in the product backlog, unassigned to any sprint',
              'Planned — the story has been assigned to an upcoming sprint',
              'In Progress — the sprint is active and the story is being worked on',
              'Done — the story meets all acceptance criteria and is complete',
            ],
          },
          {
            type: 'heading',
            text: 'Story Detail Modal',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Click on any story in the backlog to open the Story Detail Modal. Here you can edit all fields, view acceptance criteria, and assign the story to a sprint.',
          },
          {
            type: 'tip',
            text: 'Write acceptance criteria as specific, testable conditions. For example: "User receives a confirmation email within 30 seconds of submitting the reset form."',
          },
        ],
      },
      {
        id: 'sprint-planning',
        title: 'Sprint Planning',
        description: 'Create sprints, set capacity, and assign stories from the backlog',
        content: [
          {
            type: 'paragraph',
            text: 'Sprint planning in AgileFlow helps you organize your work into time-boxed iterations. Sprints typically last 1-4 weeks and contain a set of user stories that the team commits to completing.',
          },
          {
            type: 'heading',
            text: 'Creating a Sprint',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Go to the Backlog page and click the "Plan Sprint" button.',
              'The Sprint Planning Modal opens with your backlog stories listed.',
              'Set the sprint name (e.g., "Sprint 24").',
              'Choose a start date and end date for the sprint.',
              'Set the team capacity in story points — this represents how much work the team can handle.',
              'Define a sprint goal that describes the key objective for this iteration.',
              'Drag stories from the backlog into the sprint, or use checkboxes to select them.',
              'Watch the capacity indicator as you add stories — it shows committed points vs. total capacity.',
              'Click "Create Sprint" to finalize the plan.',
            ],
          },
          {
            type: 'heading',
            text: 'Capacity Planning',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The capacity indicator shows a progress bar of committed story points against the sprint capacity. It helps you avoid overcommitting the team.',
          },
          {
            type: 'list',
            items: [
              'Green — committed points are under 80% of capacity (healthy)',
              'Yellow — committed points are between 80-100% of capacity (near limit)',
              'Red — committed points exceed capacity (overcommitted)',
            ],
          },
          {
            type: 'warning',
            text: 'Overcommitting a sprint leads to incomplete work and reduced team morale. Use historical velocity data from the Analytics page to set realistic capacity targets.',
          },
        ],
      },
      {
        id: 'sprint-execution',
        title: 'Sprint Execution',
        description: 'Track sprint progress, velocity, and story completion',
        content: [
          {
            type: 'paragraph',
            text: 'Once a sprint is created, AgileFlow provides tools to track its progress throughout the iteration. You can monitor committed vs. completed story points, track individual story statuses, and measure team velocity.',
          },
          {
            type: 'heading',
            text: 'Sprint Progress Tracking',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'The Backlog page shows active sprints at the top with a progress summary',
              'Each sprint displays committed points, completed points, and remaining points',
              'Story cards within a sprint show their current status with color-coded badges',
              'The progress bar fills as stories are marked complete',
            ],
          },
          {
            type: 'heading',
            text: 'Velocity Tracking',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Velocity measures how many story points the team completes per sprint. AgileFlow tracks this automatically and displays it on the Analytics page. Over time, velocity data helps you make more accurate sprint planning estimates.',
          },
          {
            type: 'heading',
            text: 'Completing a Sprint',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'When a sprint ends, review the results. Stories that were not completed can be moved back to the backlog or rolled into the next sprint. Completed stories contribute to your velocity metrics.',
          },
          {
            type: 'tip',
            text: 'Hold a sprint retrospective at the end of each sprint. Use the AI assistant with the /performance command to get a quick summary of team metrics to discuss during the retro.',
          },
        ],
      },
      {
        id: 'backlog-prioritization',
        title: 'Backlog Prioritization',
        description: 'Organize and prioritize your product backlog effectively',
        content: [
          {
            type: 'paragraph',
            text: 'A well-prioritized backlog ensures your team always works on the most valuable items first. AgileFlow provides filtering, sorting, and search tools to keep your backlog organized.',
          },
          {
            type: 'heading',
            text: 'Prioritization Strategies',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Use the priority field (Critical, High, Medium, Low) to rank stories by business value',
              'Assign story points to represent effort — high-value, low-effort items should be prioritized',
              'Review the backlog regularly with your product owner to re-rank items as priorities change',
              'Move high-priority items to the top of the backlog list',
            ],
          },
          {
            type: 'heading',
            text: 'Filtering the Backlog',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Use the search bar at the top of the Backlog page to find stories by title. Use the priority filter dropdown to narrow the list to a specific priority level (e.g., show only Critical and High priority stories).',
          },
          {
            type: 'heading',
            text: 'Drag-and-Drop Reordering',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Stories in the backlog support drag-and-drop reordering. Grab a story card and drag it up or down to change its position. Items at the top of the backlog are considered the highest priority.',
          },
          {
            type: 'tip',
            text: 'Review and groom your backlog at least once per sprint. Remove outdated stories, update estimates, and ensure the top items are ready for the next sprint planning session.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. CALENDAR & SCHEDULING
  // ─────────────────────────────────────────────
  {
    id: 'calendar',
    title: 'Calendar & Scheduling',
    description: 'Plan meetings, milestones, and deadlines on a shared calendar',
    icon: 'Calendar',
    articles: [
      {
        id: 'calendar-overview',
        title: 'Calendar Overview',
        description: 'Navigate the monthly calendar view and understand event types',
        content: [
          {
            type: 'paragraph',
            text: 'The Calendar page provides a monthly view of all your scheduled events. It supports multiple event types, color coding, and quick event creation by clicking on any date.',
          },
          {
            type: 'heading',
            text: 'Navigating the Calendar',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Use the left and right arrow buttons to move between months',
              'The current month and year are displayed in the header',
              'Today\'s date is highlighted with a distinct background color',
              'Days outside the current month are dimmed for context',
            ],
          },
          {
            type: 'heading',
            text: 'Event Types',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow supports several event types, each with a distinct color for quick visual identification:',
          },
          {
            type: 'list',
            items: [
              'Meeting (blue) — team meetings, standups, one-on-ones',
              'Milestone (green) — project milestones and deliverables',
              'Deadline (red) — hard deadlines and due dates',
              'Review (purple) — code reviews, design reviews, sprint reviews',
              'Retrospective (yellow) — sprint retrospectives and team reflections',
              'Planning (sky blue) — sprint planning and roadmap sessions',
              'Holiday (orange) — team holidays and time off',
              'Other (gray) — miscellaneous events',
            ],
          },
          {
            type: 'tip',
            text: 'Click on any event dot on the calendar to see its details. Click on an empty date to quickly create a new event for that day.',
          },
        ],
      },
      {
        id: 'creating-events',
        title: 'Creating Events',
        description: 'Add meetings, milestones, deadlines, and other events to the calendar',
        content: [
          {
            type: 'paragraph',
            text: 'Creating calendar events is straightforward. You can either click the "+ New Event" button or click directly on a date in the calendar.',
          },
          {
            type: 'heading',
            text: 'How to Create an Event',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click the "+ New Event" button in the top-right corner, or click on a specific date in the calendar.',
              'Enter an event title that describes the event clearly.',
              'Select the event type from the dropdown (Meeting, Milestone, Deadline, etc.).',
              'Set the date for the event.',
              'Optionally set a start time and end time for timed events.',
              'Toggle "All Day" if the event spans the entire day (like a holiday or milestone).',
              'Add a location if the event is in-person or has a virtual meeting link.',
              'Add attendees by selecting team members.',
              'Add an optional description for additional context.',
              'Click "Create Event" to save.',
            ],
          },
          {
            type: 'heading',
            text: 'All-Day Events',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'All-day events span the full day and do not have specific start/end times. Milestones, deadlines, and holidays are typically set as all-day events. They appear at the top of the date cell in the calendar.',
          },
          {
            type: 'tip',
            text: 'Use descriptive titles for your events. Instead of "Meeting", write "Sprint 24 Planning — Backend Team" so events are identifiable at a glance.',
          },
        ],
      },
      {
        id: 'managing-events',
        title: 'Managing Events',
        description: 'Edit, delete, and organize your calendar events',
        content: [
          {
            type: 'paragraph',
            text: 'Once events are on your calendar, you can easily modify or remove them as plans change.',
          },
          {
            type: 'heading',
            text: 'Editing Events',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click on an event in the calendar to open its details.',
              'Click "Edit" to modify the event title, type, time, location, or attendees.',
              'Make your changes and click "Save" to update the event.',
            ],
          },
          {
            type: 'heading',
            text: 'Deleting Events',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click on an event to open its details.',
              'Click the "Delete" button.',
              'Confirm the deletion in the prompt that appears.',
            ],
          },
          {
            type: 'heading',
            text: 'Color Coding',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Events are automatically color-coded based on their type. This makes it easy to scan the calendar and understand your schedule at a glance. Blue dots indicate meetings, red dots indicate deadlines, green dots indicate milestones, and so on.',
          },
          {
            type: 'warning',
            text: 'Deleting an event is permanent and cannot be undone. Make sure you no longer need the event before confirming deletion.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. ANALYTICS & REPORTING
  // ─────────────────────────────────────────────
  {
    id: 'analytics',
    title: 'Analytics & Reporting',
    description: 'Visualize project metrics with charts and dashboards',
    icon: 'BarChart3',
    articles: [
      {
        id: 'analytics-dashboard',
        title: 'Analytics Dashboard',
        description: 'Overview of available analytics and how to access them',
        content: [
          {
            type: 'paragraph',
            text: 'The Analytics page provides a comprehensive overview of your project metrics through interactive charts and summaries. Access it from the "Analytics" link in the left sidebar.',
          },
          {
            type: 'heading',
            text: 'Available Analytics',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Task Distribution — see how tasks are distributed across statuses, priorities, and boards',
              'Team Performance — view per-member workload and completion metrics',
              'Sprint Analytics — track velocity, burndown, and sprint completion rates',
              'Board-level Analytics — access analytics specific to each board from the board\'s analytics panel',
            ],
          },
          {
            type: 'heading',
            text: 'Board-Level Analytics',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Each board also has its own analytics panel accessible from the board toolbar. This shows metrics specific to that board\'s tasks, including status distribution, priority breakdown, and completion trends.',
          },
          {
            type: 'tip',
            text: 'Visit the Analytics page regularly to identify trends and bottlenecks. A sudden spike in "Stuck" tasks, for example, might indicate a blocker that needs attention.',
          },
        ],
      },
      {
        id: 'task-distribution',
        title: 'Task Distribution',
        description: 'View status breakdown and priority distribution charts',
        content: [
          {
            type: 'paragraph',
            text: 'Task distribution charts help you understand the overall health of your projects by showing how tasks are spread across different statuses and priority levels.',
          },
          {
            type: 'heading',
            text: 'Status Distribution',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The status distribution chart shows the breakdown of tasks by their current status: Not Started, Working on it, Done, and Stuck. It is displayed as a donut or bar chart with color-coded segments matching the status colors.',
          },
          {
            type: 'list',
            items: [
              'A healthy project has a growing "Done" segment over time',
              'A large "Stuck" segment indicates blockers that need resolution',
              'A large "Not Started" segment may mean the backlog needs grooming',
            ],
          },
          {
            type: 'heading',
            text: 'Priority Distribution',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The priority distribution chart shows how tasks are distributed across priority levels. Use this to ensure your team is not overwhelmed with Critical tasks or neglecting High-priority work.',
          },
          {
            type: 'heading',
            text: 'Board-Level Breakdown',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'You can also view task distribution for individual boards. Open a board and click the analytics icon in the toolbar to see that board\'s specific metrics.',
          },
          {
            type: 'tip',
            text: 'If more than 20% of your tasks are in "Stuck" status, consider holding a blocker-resolution session with the team.',
          },
        ],
      },
      {
        id: 'team-performance',
        title: 'Team Performance',
        description: 'Track per-member metrics and workload analysis',
        content: [
          {
            type: 'paragraph',
            text: 'Team performance analytics provide visibility into how work is distributed across team members and how each person is progressing.',
          },
          {
            type: 'heading',
            text: 'Per-Member Metrics',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Tasks assigned — total number of tasks assigned to each team member',
              'Tasks completed — number of tasks marked as "Done"',
              'Completion rate — percentage of assigned tasks that are complete',
              'Active tasks — number of tasks currently in progress',
            ],
          },
          {
            type: 'heading',
            text: 'Workload Analysis',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The workload chart shows the distribution of active tasks across team members. Use this to identify team members who may be overloaded or underutilized.',
          },
          {
            type: 'paragraph',
            text: 'A balanced workload distribution leads to better outcomes. If one person has significantly more active tasks than others, consider redistributing work during the next planning session.',
          },
          {
            type: 'tip',
            text: 'Use the /performance command in the AI assistant to get a quick narrative summary of team performance metrics.',
          },
        ],
      },
      {
        id: 'sprint-analytics',
        title: 'Sprint Analytics',
        description: 'Velocity tracking, burndown charts, and sprint completion rates',
        content: [
          {
            type: 'paragraph',
            text: 'Sprint analytics help you measure and improve your team\'s agile performance over time. These metrics are essential for accurate planning and continuous improvement.',
          },
          {
            type: 'heading',
            text: 'Velocity Tracking',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Velocity measures the number of story points completed per sprint. AgileFlow tracks this automatically and displays a velocity chart showing trends across recent sprints. Use your average velocity to set realistic capacity targets for future sprints.',
          },
          {
            type: 'heading',
            text: 'Burndown Charts',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The burndown chart shows the remaining work in a sprint over time. The ideal line represents steady, linear progress. A burndown line above the ideal indicates the team is behind schedule; below means the team is ahead.',
          },
          {
            type: 'list',
            items: [
              'Ideal line — represents perfectly even work distribution across sprint days',
              'Actual line — shows real remaining story points day by day',
              'Flat sections — indicate periods where no stories were completed (possible blockers)',
              'Steep drops — indicate bursts of completed work',
            ],
          },
          {
            type: 'heading',
            text: 'Sprint Completion Rate',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The sprint completion rate is the percentage of committed story points that were actually completed by the end of the sprint. A consistent rate above 80% indicates reliable planning and execution.',
          },
          {
            type: 'warning',
            text: 'If your sprint completion rate is consistently below 70%, you may be overcommitting. Reduce the number of story points in your next sprint to a level the team can realistically complete.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. AI ASSISTANT
  // ─────────────────────────────────────────────
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    description: 'Get intelligent suggestions and insights from the built-in AI',
    icon: 'Bot',
    articles: [
      {
        id: 'using-ai-assistant',
        title: 'Using the AI Assistant',
        description: 'Open the AI chat, ask questions, and get project insights',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow includes a built-in AI assistant that can help with task assignments, sprint planning, performance summaries, and general project management questions.',
          },
          {
            type: 'heading',
            text: 'Opening the Assistant',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Look for the floating chat bubble icon in the bottom-right corner of the screen.',
              'Click it to open the AI assistant panel.',
              'The assistant greets you and shows quick action buttons for common commands.',
              'Type your message in the input field at the bottom and press Enter or click Send.',
            ],
          },
          {
            type: 'heading',
            text: 'What You Can Ask',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'General project management advice and best practices',
              'Help with agile ceremonies (standups, retrospectives, planning)',
              'Task assignment suggestions based on team workload',
              'Sprint planning recommendations based on velocity data',
              'Team performance summaries and metrics',
              'Explanations of AgileFlow features and how to use them',
            ],
          },
          {
            type: 'heading',
            text: 'Response Modes',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The AI assistant supports two response modes, selectable via the toggle in the panel header:',
          },
          {
            type: 'list',
            items: [
              'Fast Mode (lightning icon) — quick responses using lightweight models like Claude Haiku 4.5, Gemini 2.0 Flash, and GPT-4o Mini. Best for simple questions and quick actions.',
              'Thinking Mode (brain icon) — extended analysis using more powerful thinking-optimized models. Best for complex planning, detailed recommendations, and in-depth analysis.',
            ],
          },
          {
            type: 'heading',
            text: 'Quick Action Buttons',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Below the chat input, three quick action buttons provide one-click access to the most common AI commands: "Suggest Assignments", "Sprint Recommendations", and "Performance Summary". Click any of them to automatically trigger that command.',
          },
          {
            type: 'tip',
            text: 'The AI assistant is context-aware. It automatically loads your boards, tasks, sprints, and team data to provide relevant, specific suggestions rather than generic advice.',
          },
        ],
      },
      {
        id: 'ai-commands',
        title: 'AI Commands',
        description: 'Use /assign, /sprint, and /performance for targeted insights',
        content: [
          {
            type: 'paragraph',
            text: 'The AI assistant supports three special slash commands that trigger specific, data-driven analyses. These commands pull your actual project data and provide actionable recommendations.',
          },
          {
            type: 'heading',
            text: '/assign — Task Assignment Suggestions',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Type /assign to get AI-suggested task assignments based on your team\'s current workload, skills, and availability. The assistant analyzes unassigned tasks across your boards and recommends the best team member for each one.',
          },
          {
            type: 'list',
            items: [
              'Considers each member\'s current task count and active workload',
              'Factors in priority levels — Critical tasks get priority attention',
              'Provides reasoning for each suggestion',
              'You can follow up with questions about specific assignments',
            ],
          },
          {
            type: 'heading',
            text: '/sprint — Sprint Recommendations',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Type /sprint to get AI-powered sprint planning recommendations. The assistant reviews your backlog, team velocity, and current sprint status to suggest what to include in the next sprint.',
          },
          {
            type: 'list',
            items: [
              'Recommends optimal sprint capacity based on historical velocity',
              'Suggests which backlog items to include by priority and effort',
              'Identifies potential risks and dependencies',
              'Helps balance workload across team members',
            ],
          },
          {
            type: 'heading',
            text: '/performance — Team Metrics Summary',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Type /performance to get a comprehensive summary of your team\'s recent performance. The assistant compiles metrics across boards and sprints into a readable narrative.',
          },
          {
            type: 'list',
            items: [
              'Overall task completion rate and trend',
              'Sprint velocity and consistency',
              'Per-member productivity highlights',
              'Identified bottlenecks and areas for improvement',
            ],
          },
          {
            type: 'tip',
            text: 'You do not need to use exact command syntax. The assistant also responds to natural language like "suggest assignments for my team" or "how is the sprint going?".',
          },
        ],
      },
      {
        id: 'how-ai-works',
        title: 'How the AI Works',
        description: 'Understanding the AI model, context, and data usage',
        content: [
          {
            type: 'paragraph',
            text: 'The AgileFlow AI assistant is powered by a multi-model architecture that routes requests through several language models to ensure reliability and performance.',
          },
          {
            type: 'heading',
            text: 'Model Fallback System',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'When you send a message, AgileFlow selects AI models based on your chosen response mode (Fast or Thinking). If the first model is unavailable or returns an error, it automatically falls back to the next one. This ensures the assistant is always responsive.',
          },
          {
            type: 'list',
            items: [
              'Fast Mode models: Claude Haiku 4.5, Gemini 2.0 Flash, GPT-4o Mini — optimized for quick responses',
              'Thinking Mode models: thinking-optimized variants for deeper analysis and planning',
              'Automatic fallback — if one model is unavailable, the next in the chain is tried seamlessly',
            ],
          },
          {
            type: 'heading',
            text: 'Context-Aware Responses',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The assistant automatically gathers context from your workspace before generating a response. This includes your boards, tasks, sprint data, and team information. You do not need to copy-paste data into the chat — the assistant fetches it automatically.',
          },
          {
            type: 'heading',
            text: 'Data Privacy',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Your project data is sent to the AI model only when you actively interact with the assistant. The data is used solely to generate your response and is not stored by the AI provider. All communication is encrypted in transit.',
          },
          {
            type: 'warning',
            text: 'Avoid sharing sensitive personal information (passwords, API keys, financial data) with the AI assistant. While the communication is encrypted, the assistant is designed for project management queries only.',
          },
        ],
      },
      {
        id: 'ai-chat-page',
        title: 'AI Chat Page',
        description: 'Use the full-page AI experience with conversation history and sessions',
        content: [
          {
            type: 'paragraph',
            text: 'In addition to the floating AI panel, AgileFlow provides a dedicated AI Chat page accessible from the sidebar. This full-page experience offers a richer interface for extended AI conversations.',
          },
          {
            type: 'heading',
            text: 'Features',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Full-page chat interface with a centered message area for comfortable reading',
              'Fast/Thinking mode toggle in the header to switch between quick and deep analysis responses',
              'Chat session history — previous conversations are saved in the sidebar for easy reference',
              'Session management — load, rename, or delete previous chat sessions',
              'Suggestion chips displayed when starting a new conversation to help you get started',
              'Streaming responses with a stop button to cancel long-running AI responses',
              'Auto-expanding text input with keyboard support (Enter to send, Shift+Enter for new line)',
            ],
          },
          {
            type: 'heading',
            text: 'How to Access',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click "AI Chat" in the left sidebar navigation.',
              'Start typing your message or click a suggestion chip.',
              'Use the mode toggle at the top to switch between Fast and Thinking modes.',
              'Your conversation is saved automatically and appears in the session sidebar on the left.',
            ],
          },
          {
            type: 'tip',
            text: 'Use the AI Chat page for longer conversations and planning sessions. The floating panel is better for quick questions while you are working on a board.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. TEAM COLLABORATION
  // ─────────────────────────────────────────────
  {
    id: 'team-collaboration',
    title: 'Team Collaboration',
    description: 'Invite members, manage roles, and track activity',
    icon: 'Users',
    articles: [
      {
        id: 'inviting-members',
        title: 'Inviting Team Members',
        description: 'Add teammates to your workspace via email invitation',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow is built for teams. Invite your colleagues to collaborate on boards, share tasks, and track progress together.',
          },
          {
            type: 'heading',
            text: 'How to Invite a Team Member',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click the "Invite" button in the sidebar navigation area.',
              'The Invite Team Modal opens.',
              'Enter the email address of the person you want to invite.',
              'Select their role: Member or Admin.',
              'Click "Send Invite" to dispatch the invitation.',
              'The invited person will need to create an AgileFlow account using that email address.',
            ],
          },
          {
            type: 'heading',
            text: 'Managing Invitations',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Once invited, team members appear in your workspace after they sign up with the invited email. They will have access to shared boards and can be assigned tasks via the People column.',
          },
          {
            type: 'tip',
            text: 'Invite team members early in your project setup. Having the full team onboard allows you to assign tasks, use the People column for filtering, and generate meaningful workload analytics.',
          },
        ],
      },
      {
        id: 'roles-permissions',
        title: 'Roles & Permissions',
        description: 'Understand the three roles: Admin, Member, and Viewer',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow uses a three-role system to control access and permissions within your workspace. Each role has a different level of access, from full control to read-only.',
          },
          {
            type: 'heading',
            text: 'Admin Role',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Full system access — manage users, change roles, and access all data',
              'Can access the Admin panel from the sidebar',
              'Can view and manage all users in the workspace',
              'Can change user roles (promote or demote)',
              'Can reset passwords for other users',
              'Can view system performance metrics and health data',
              'Can manage all boards across the workspace',
            ],
          },
          {
            type: 'heading',
            text: 'Member Role',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Can create, edit, and delete their own boards and tasks',
              'Can view shared boards and contribute tasks',
              'Can manage user stories and participate in sprint planning',
              'Can use the calendar, analytics, and AI assistant',
              'Can update their own profile and settings',
              'Cannot access the Admin panel or manage other users',
            ],
          },
          {
            type: 'heading',
            text: 'Viewer Role',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Read-only access to boards and tasks — can view but not create or edit',
              'Cannot drag and drop tasks or change statuses',
              'Cannot add items, columns, or groups to boards',
              'Can view analytics, calendar, and backlog in read-only mode',
              'Can use the AI assistant for questions and insights',
              'Can update their own profile and settings',
            ],
          },
          {
            type: 'paragraph',
            text: 'New users are assigned the Member role by default when they join the workspace. Admins can change roles at any time from the Admin panel.',
          },
          {
            type: 'warning',
            text: 'Be selective about who you grant Admin access. Admin users can see and modify all data in the workspace, including other users\' boards and settings. Downgrading someone from Admin to Member removes their ability to manage other users.',
          },
        ],
      },
      {
        id: 'permission-enforcement',
        title: 'Permission Enforcement',
        description: 'How roles affect what actions you can take across the platform',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow enforces permissions throughout the platform based on your assigned role. This ensures that Viewers cannot accidentally modify data, and only Admins can perform sensitive operations.',
          },
          {
            type: 'heading',
            text: 'Board Permissions',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Admins and Members can create, edit, and delete boards, groups, columns, and tasks',
              'Viewers see boards in read-only mode — add/edit buttons and drag-and-drop are disabled',
              'The "Add Item", "New Group", and "Add Column" buttons are hidden for Viewers',
              'Task edit modals open in view-only mode for Viewers',
            ],
          },
          {
            type: 'heading',
            text: 'Kanban & Calendar Permissions',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Viewers cannot drag Kanban cards between columns',
              'Calendar event creation is restricted to Admins and Members',
              'Timeline view is read-only for Viewers',
            ],
          },
          {
            type: 'heading',
            text: 'Settings Permissions',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'All users can view and update their own profile and preferences. Only Admins can access the Admin panel to manage other users and workspace settings.',
          },
          {
            type: 'tip',
            text: 'If you see disabled buttons or missing actions on a board, check your role in the Admin panel or ask a workspace Admin. You may have Viewer access.',
          },
        ],
      },
      {
        id: 'activity-tracking',
        title: 'Activity Tracking',
        description: 'Monitor who changed what with the activity log and audit trail',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow automatically tracks all significant actions in your workspace. This creates an audit trail that helps you understand what changed, who changed it, and when.',
          },
          {
            type: 'heading',
            text: 'What Gets Tracked',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Task creation, updates, and deletion',
              'Status and priority changes',
              'Board creation and modifications',
              'User story creation and sprint assignments',
              'Sprint creation, starts, and completions',
              'Team member additions and role changes',
              'Calendar event creation and modifications',
            ],
          },
          {
            type: 'heading',
            text: 'Viewing Activity',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Dashboard Activity Feed — shows the most recent events across all projects',
              'Board Analytics Panel — shows activity specific to a single board',
              'Admin Panel — provides a workspace-wide activity log with user attribution',
            ],
          },
          {
            type: 'paragraph',
            text: 'Each activity entry includes a timestamp, the user who performed the action, and a description of what changed. This is invaluable for accountability and understanding project history.',
          },
          {
            type: 'tip',
            text: 'Use the activity log during sprint retrospectives to review what happened during the sprint and identify process improvements.',
          },
        ],
      },
      {
        id: 'notifications',
        title: 'Notifications',
        description: 'Stay informed with real-time notifications for tasks, mentions, and sprints',
        content: [
          {
            type: 'paragraph',
            text: 'Notifications keep you informed about important events in your workspace. AgileFlow sends notifications for task assignments, mentions, sprint updates, and system alerts.',
          },
          {
            type: 'heading',
            text: 'Notification Types',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Info — general informational notifications about workspace activity',
              'Success — confirmations of completed actions (e.g., sprint completed successfully)',
              'Warning — alerts about potential issues (e.g., sprint capacity exceeded)',
              'Error — system errors that need attention',
              'Task — notifications related to task assignments, status changes, and due dates',
              'Mention — when another team member mentions you in a comment or description',
              'Sprint — sprint-related events like sprint starts, endings, and planning reminders',
            ],
          },
          {
            type: 'heading',
            text: 'Viewing Notifications',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click the bell icon in the top navigation bar.',
              'A dropdown shows your recent notifications with unread ones highlighted.',
              'The badge count on the bell icon shows the number of unread notifications.',
              'Click "Mark all as read" to clear all unread notifications.',
              'Click on a notification to navigate to the related item.',
            ],
          },
          {
            type: 'heading',
            text: 'Notification Preferences',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'You can customize which notifications you receive in Settings → Notifications. Toggle on or off categories like task assignments, mentions, due date reminders, sprint updates, and daily digests.',
          },
          {
            type: 'tip',
            text: 'Notifications auto-refresh every 30 seconds, so you stay up to date without manually refreshing the page.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. SETTINGS & PREFERENCES
  // ─────────────────────────────────────────────
  {
    id: 'settings',
    title: 'Settings & Preferences',
    description: 'Customize your profile, theme, notifications, and account',
    icon: 'Settings',
    articles: [
      {
        id: 'profile-settings',
        title: 'Profile Settings',
        description: 'Update your name, job title, department, and avatar',
        content: [
          {
            type: 'paragraph',
            text: 'Your profile information helps teammates identify you across boards, assignments, and notifications. Keep it up to date for the best collaboration experience.',
          },
          {
            type: 'heading',
            text: 'Editing Your Profile',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click "Settings" in the sidebar navigation.',
              'Select the "Profile" tab.',
              'Update your full name, job title, and department.',
              'Your email address is displayed but cannot be changed from this screen (it is tied to your authentication account).',
              'Click "Save Changes" to apply your updates.',
            ],
          },
          {
            type: 'heading',
            text: 'Avatar',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow automatically generates an avatar using your initials and a unique color derived from your name. This avatar appears in the sidebar, on task assignments, in the People column, and in notification entries. The color is consistent — the same name always produces the same color.',
          },
          {
            type: 'tip',
            text: 'Set your job title and department to help teammates understand your role. For example, "Frontend Developer" in the "Engineering" department helps when assigning tasks to the right skill set.',
          },
        ],
      },
      {
        id: 'theme-appearance',
        title: 'Theme & Appearance',
        description: 'Switch between light mode, dark mode, and automatic system detection',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow offers three theme options to match your visual preference and reduce eye strain in different lighting conditions.',
          },
          {
            type: 'heading',
            text: 'Theme Options',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Light — a clean white interface with high contrast, ideal for well-lit environments',
              'Dark — a dark gray interface that reduces eye strain in low-light conditions',
              'System — automatically matches your operating system\'s theme preference and switches as your OS does',
            ],
          },
          {
            type: 'heading',
            text: 'How to Change Your Theme',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Quick toggle: Click the sun/moon icon in the top navigation bar to switch between light and dark mode instantly.',
              'Settings: Go to Settings → Appearance and select your preferred theme from Light, Dark, or System.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Your theme preference is saved to your profile and persists across sessions and devices. Dark mode adjusts all colors, backgrounds, borders, and text to provide a comfortable dark interface.',
          },
          {
            type: 'tip',
            text: 'The System option is great if you use your operating system\'s scheduled dark mode (e.g., switching to dark mode at sunset). AgileFlow will follow along automatically.',
          },
        ],
      },
      {
        id: 'notification-preferences',
        title: 'Notification Preferences',
        description: 'Configure which types of notifications you receive',
        content: [
          {
            type: 'paragraph',
            text: 'Fine-tune your notification settings to stay informed without being overwhelmed. You can enable or disable specific notification categories from the Settings page.',
          },
          {
            type: 'heading',
            text: 'Notification Categories',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Email Notifications — master toggle for all email-based notifications',
              'Task Assignments — get notified when a task is assigned to you',
              'Mentions — get notified when someone mentions you',
              'Due Date Reminders — receive alerts when task due dates are approaching',
              'Sprint Updates — get notified about sprint starts, completions, and planning events',
              'Daily Digest — receive a daily summary email of all workspace activity',
            ],
          },
          {
            type: 'heading',
            text: 'How to Configure',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Navigate to Settings from the sidebar.',
              'Select the "Notifications" tab.',
              'Toggle each notification category on or off using the switches.',
              'Click "Save Changes" to apply your preferences.',
            ],
          },
          {
            type: 'tip',
            text: 'If you find notifications distracting during focus time, turn off the Daily Digest and keep only Task Assignments and Mentions active for the essentials.',
          },
        ],
      },
      {
        id: 'account-management',
        title: 'Account Management',
        description: 'Manage your password, sessions, and additional account settings',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow provides several account management features to keep your workspace secure and your preferences in order.',
          },
          {
            type: 'heading',
            text: 'Password Management',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'If you need to reset your password, use the "Forgot password?" link on the login page. Supabase Auth will send a password reset email to your registered address. Follow the link in the email to set a new password.',
          },
          {
            type: 'heading',
            text: 'Session Management',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Your authentication session is managed automatically. Sessions are refreshed behind the scenes using secure tokens, so you stay logged in across visits. If your session expires, you will be redirected to the login page.',
          },
          {
            type: 'heading',
            text: 'Signing Out',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click your user avatar or name in the bottom of the sidebar.',
              'Select "Sign Out" from the dropdown menu.',
              'You will be redirected to the login page.',
            ],
          },
          {
            type: 'heading',
            text: 'Additional Settings',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Language — set your preferred language (default: English)',
              'Timezone — set your timezone for accurate date and time display',
              'Date Format — choose between MM/DD/YYYY and other formats',
              'Week Start — set whether your week starts on Sunday or Monday',
              'Profile Visibility — control whether your profile is visible to the team',
              'Activity Tracking — toggle whether your actions are logged in the activity feed',
            ],
          },
          {
            type: 'warning',
            text: 'Signing out clears your session on the current device. You will need to sign in again with your email and password.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. KEYBOARD SHORTCUTS
  // ─────────────────────────────────────────────
  {
    id: 'keyboard-shortcuts',
    title: 'Keyboard Shortcuts',
    description: 'Speed up your workflow with keyboard shortcuts',
    icon: 'Keyboard',
    articles: [
      {
        id: 'global-shortcuts',
        title: 'Global Shortcuts',
        description: 'Shortcuts that work from anywhere in AgileFlow',
        content: [
          {
            type: 'paragraph',
            text: 'Global keyboard shortcuts work from any page in AgileFlow. They provide instant access to search, navigation, and common actions.',
          },
          {
            type: 'heading',
            text: 'Search & Navigation',
            level: 2,
          },
          {
            type: 'shortcut',
            keys: 'Ctrl + K',
            description: 'Open global search — search across all boards and tasks',
          },
          {
            type: 'shortcut',
            keys: 'Escape',
            description: 'Close the current modal, dialog, or dropdown',
          },
          {
            type: 'heading',
            text: 'Theme',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Use the theme toggle button in the top navigation bar to switch between light and dark mode. A keyboard shortcut is not currently assigned, but you can quickly click the sun/moon icon.',
          },
          {
            type: 'heading',
            text: 'Quick Navigation via Sidebar',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The sidebar provides one-click navigation to all major sections. On mobile devices, tap the hamburger menu icon to reveal the sidebar, then tap any navigation item.',
          },
          {
            type: 'tip',
            text: 'The global search (Ctrl+K) is the fastest way to navigate. Start typing a board or task name and select it from the results to jump directly there.',
          },
        ],
      },
      {
        id: 'board-shortcuts',
        title: 'Board Shortcuts',
        description: 'Shortcuts for working with boards and tasks',
        content: [
          {
            type: 'paragraph',
            text: 'These shortcuts help you work more efficiently when you are on a board page.',
          },
          {
            type: 'heading',
            text: 'Task Management',
            level: 2,
          },
          {
            type: 'shortcut',
            keys: 'Enter',
            description: 'Confirm a task title when adding a new item',
          },
          {
            type: 'shortcut',
            keys: 'Escape',
            description: 'Cancel the current edit or close the Task Edit Modal',
          },
          {
            type: 'shortcut',
            keys: 'Tab',
            description: 'Move focus to the next cell in the task row',
          },
          {
            type: 'heading',
            text: 'View Switching',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Switch between Table, Kanban, Calendar, and Timeline views using the view tabs at the top of the board. Click or tap the tab for your desired view.',
          },
          {
            type: 'heading',
            text: 'Drag and Drop',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Drag-and-drop interactions require mouse or touch input. Click and hold a task row or Kanban card, drag to the desired position, and release.',
          },
          {
            type: 'tip',
            text: 'When editing a cell, press Escape to cancel without saving or Tab to move to the next field. This helps you quickly fill in multiple columns for a task.',
          },
        ],
      },
      {
        id: 'power-user-tips',
        title: 'Tips for Power Users',
        description: 'Advanced tips for maximizing productivity with AgileFlow',
        content: [
          {
            type: 'paragraph',
            text: 'Once you are comfortable with the basics, these advanced tips will help you get even more out of AgileFlow.',
          },
          {
            type: 'heading',
            text: 'Fast Navigation Pattern',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Use Ctrl+K to open search, type a board name, and select it — faster than scrolling through the sidebar',
              'Search also finds tasks — type a task title to jump directly to its board',
              'Bookmark frequently visited boards in your browser for one-click access',
            ],
          },
          {
            type: 'heading',
            text: 'Efficient Task Entry',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Click "+ Add Item", type a title, and press Enter to create a task quickly',
              'Use Tab to move through cells and fill in data without leaving the keyboard',
              'Create multiple tasks in succession — after pressing Enter, the input stays ready for the next task',
            ],
          },
          {
            type: 'heading',
            text: 'Combining Filters and Group By',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'For maximum insight, combine the Group By feature with filters. For example, group by Assignee and filter by "Working on it" status to see exactly what each person is actively working on. Add a Sort by Priority to surface the most important tasks first.',
          },
          {
            type: 'heading',
            text: 'AI-Powered Planning',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Before each sprint planning session, run /performance in the AI assistant to get a snapshot of team metrics. Then use /sprint to get AI-recommended backlog items for the upcoming sprint. This data-driven approach leads to better planning outcomes.',
          },
          {
            type: 'heading',
            text: 'Dashboard as Command Center',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Start each day on the Dashboard. Check the stats cards for overall health, scan the activity feed for overnight changes, and use Quick Actions to capture any new tasks or stories before diving into board-level work.',
          },
          {
            type: 'tip',
            text: 'Set up your board columns during initial project setup, then use the same column configuration across similar projects. This creates consistency and makes analytics comparable across boards.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 11. SECURITY & PRIVACY
  // ─────────────────────────────────────────────
  {
    id: 'security',
    title: 'Security & Privacy',
    description: 'How AgileFlow protects your data and manages access',
    icon: 'Shield',
    articles: [
      {
        id: 'authentication',
        title: 'Authentication',
        description: 'How user authentication works with Supabase Auth',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow uses Supabase Authentication, a production-grade auth system built on top of PostgreSQL and GoTrue. It provides secure email/password authentication with industry-standard security practices.',
          },
          {
            type: 'heading',
            text: 'How Authentication Works',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Users sign up with an email address and password',
              'Passwords are hashed using bcrypt before storage — plain-text passwords are never stored',
              'On successful login, a JWT (JSON Web Token) is issued and stored securely',
              'The JWT is included automatically in all API requests to Supabase',
              'Sessions are managed via secure cookies with HttpOnly and SameSite attributes',
            ],
          },
          {
            type: 'heading',
            text: 'Session Tokens',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'After authentication, Supabase issues an access token and a refresh token. The access token is short-lived (typically 1 hour) and is automatically refreshed using the refresh token. This means you stay logged in without re-entering your password, while maintaining security.',
          },
          {
            type: 'heading',
            text: 'Login Security',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Rate limiting prevents brute-force password attacks',
              'All auth endpoints are served over HTTPS',
              'Failed login attempts do not reveal whether the email exists in the system',
              'Password reset flows use time-limited tokens sent to the registered email',
            ],
          },
          {
            type: 'tip',
            text: 'Use a strong, unique password for your AgileFlow account. A good password is at least 12 characters long and includes a mix of letters, numbers, and symbols.',
          },
        ],
      },
      {
        id: 'row-level-security',
        title: 'Row Level Security',
        description: 'How RLS ensures users only access their own data',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow uses PostgreSQL Row Level Security (RLS) to enforce data access rules at the database level. This means that even if there were a bug in the application code, the database itself prevents unauthorized access.',
          },
          {
            type: 'heading',
            text: 'How RLS Works',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Every table in the AgileFlow database has RLS policies that check the authenticated user\'s ID against the data\'s owner. When you query the database, PostgreSQL automatically filters results to only include rows that belong to you.',
          },
          {
            type: 'list',
            items: [
              'Boards — you can only see boards you created or that are shared with you',
              'Tasks — you can only see tasks on boards you have access to',
              'User Stories — you can only manage stories you created',
              'Sprints — you can only access sprints tied to your boards',
              'Calendar Events — you can only see events you created',
              'Notifications — you only receive your own notifications',
            ],
          },
          {
            type: 'heading',
            text: 'Why RLS Matters',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'RLS is a defense-in-depth measure. Traditional applications rely solely on application-level checks, which can be bypassed if there is a bug. RLS moves access control into the database engine itself, creating a security boundary that is extremely difficult to circumvent.',
          },
          {
            type: 'tip',
            text: 'You do not need to do anything to benefit from RLS — it works automatically. Every query you make is filtered by the database to return only the data you are authorized to see.',
          },
        ],
      },
      {
        id: 'data-protection',
        title: 'Data Protection',
        description: 'Encryption, secure communication, and data handling practices',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow is designed with data protection in mind. Your project data is protected both in transit and at rest using industry-standard encryption.',
          },
          {
            type: 'heading',
            text: 'Encryption in Transit',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'All communication between your browser and the AgileFlow backend is encrypted using TLS (HTTPS). This means that no one can intercept or read the data as it travels over the network.',
          },
          {
            type: 'heading',
            text: 'Supabase Security Model',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Database hosted on Supabase\'s managed PostgreSQL infrastructure',
              'Automatic backups ensure data recovery in case of failures',
              'Supabase applies security patches and updates to the database infrastructure',
              'API keys are scoped — the anonymous key used by the frontend has limited permissions enforced by RLS',
            ],
          },
          {
            type: 'heading',
            text: 'Client-Side Security',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'No sensitive data is stored in localStorage or sessionStorage',
              'Authentication tokens are managed by Supabase\'s secure cookie handling',
              'Environment variables (API keys) are embedded at build time and not exposed to end users',
              'The application never logs sensitive data to the browser console in production',
            ],
          },
          {
            type: 'warning',
            text: 'Never share your browser\'s developer tools console output with untrusted parties. While AgileFlow does not log sensitive data, session information visible in network requests should be kept private.',
          },
        ],
      },
      {
        id: 'session-management',
        title: 'Session Management',
        description: 'How sessions are maintained, refreshed, and expired',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow manages your authentication session automatically so you can focus on your work without frequent re-authentication.',
          },
          {
            type: 'heading',
            text: 'Auto-Refresh Tokens',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Your access token expires after a set period (typically 1 hour). Before it expires, Supabase automatically refreshes it using a long-lived refresh token. This happens silently in the background — you will not notice any interruption.',
          },
          {
            type: 'heading',
            text: 'Session Expiry Handling',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'If your session cannot be refreshed (e.g., the refresh token has expired or been revoked), you will be redirected to the login page. This typically happens only after extended periods of inactivity.',
          },
          {
            type: 'heading',
            text: 'Secure Logout',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'When you sign out, AgileFlow calls Supabase\'s signOut method which invalidates your session tokens on both the client and server. This ensures that your session cannot be reused after logout.',
          },
          {
            type: 'list',
            items: [
              'All local session data is cleared from the browser',
              'The refresh token is invalidated on the server',
              'You are redirected to the login page',
              'Subsequent requests with the old token will fail gracefully',
            ],
          },
          {
            type: 'tip',
            text: 'Always sign out when using a shared or public computer. This prevents others from accessing your AgileFlow workspace.',
          },
        ],
      },
      {
        id: 'admin-controls-security',
        title: 'Admin Controls',
        description: 'Admin-only security features and access management',
        content: [
          {
            type: 'paragraph',
            text: 'Admin users have additional security capabilities to manage the workspace and ensure that access is properly controlled.',
          },
          {
            type: 'heading',
            text: 'Admin-Only Routes',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Admin panel and Performance monitor are restricted to users with the Admin role. Regular Members cannot access these pages — attempting to navigate there will redirect them to the Dashboard.',
          },
          {
            type: 'heading',
            text: 'Role-Based Access',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Admins can view all users registered in the workspace',
              'Admins can change a user\'s role between Member and Admin',
              'Admins can monitor workspace activity across all users',
              'Admins can view system performance metrics and database health',
            ],
          },
          {
            type: 'heading',
            text: 'User Management',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'From the Admin panel, administrators can review user accounts, check when they last signed in, and modify their access level. This is useful for onboarding new team members, offboarding departing ones, and conducting security reviews.',
          },
          {
            type: 'warning',
            text: 'Changing a user\'s role takes effect immediately. If you demote an Admin to Member, they will lose access to the Admin panel on their next page load.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 12. ADMIN GUIDE
  // ─────────────────────────────────────────────
  {
    id: 'admin-guide',
    title: 'Admin Guide',
    description: 'Manage users, monitor performance, and administer the workspace',
    icon: 'ShieldCheck',
    articles: [
      {
        id: 'admin-dashboard',
        title: 'Admin Dashboard',
        description: 'Access the admin panel and get a workspace management overview',
        content: [
          {
            type: 'paragraph',
            text: 'The Admin Dashboard provides a centralized view of your entire workspace. It is the control center for user management, system monitoring, and workspace administration.',
          },
          {
            type: 'heading',
            text: 'Accessing the Admin Panel',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click the shield icon or "Admin" link in the sidebar navigation.',
              'The Admin panel opens with an overview of workspace stats.',
              'Only users with the Admin role can access this page.',
            ],
          },
          {
            type: 'heading',
            text: 'Admin Overview',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Total registered users and their roles',
              'Active boards and total tasks across the workspace',
              'Recent activity log showing actions by all users',
              'System health indicators and quick links to management sections',
            ],
          },
          {
            type: 'paragraph',
            text: 'The Admin Dashboard is designed for quick situational awareness. From here, you can drill down into user management, performance monitoring, and board administration.',
          },
          {
            type: 'tip',
            text: 'Check the Admin Dashboard regularly, especially after adding new team members or before sprint planning sessions, to ensure the workspace is healthy and properly configured.',
          },
        ],
      },
      {
        id: 'user-management',
        title: 'User Management',
        description: 'View users, change roles, and monitor account activity',
        content: [
          {
            type: 'paragraph',
            text: 'The User Management section lets admins oversee all registered accounts in the workspace. You can review profiles, adjust permissions, and monitor user activity.',
          },
          {
            type: 'heading',
            text: 'Viewing All Users',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The user list shows all registered workspace members with their name, email, role, and last activity date. Use the search bar to find specific users quickly.',
          },
          {
            type: 'heading',
            text: 'Changing User Roles',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Find the user in the user list.',
              'Click the role badge or dropdown next to their name.',
              'Select the new role: Member or Admin.',
              'The change takes effect immediately.',
            ],
          },
          {
            type: 'heading',
            text: 'Monitoring User Activity',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Each user entry shows their recent activity and when they last interacted with the workspace. This helps identify inactive accounts and verify that new team members have successfully set up their profiles.',
          },
          {
            type: 'warning',
            text: 'Exercise caution when promoting users to Admin. Admin users gain full access to all workspace data and management functions. Only grant Admin access to trusted team leads and managers.',
          },
        ],
      },
      {
        id: 'performance-monitoring',
        title: 'Performance Monitoring',
        description: 'Monitor system health, database stats, and application performance',
        content: [
          {
            type: 'paragraph',
            text: 'The Performance page provides real-time metrics about the AgileFlow application\'s health and responsiveness. It is accessible from the sidebar for Admin users.',
          },
          {
            type: 'heading',
            text: 'System Health Metrics',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Page load times — how quickly pages render for users',
              'API response times — how fast the Supabase backend responds to queries',
              'Error rates — percentage of failed requests',
              'Active sessions — number of currently active users',
            ],
          },
          {
            type: 'heading',
            text: 'Database Statistics',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Total records across all tables (boards, tasks, stories, events)',
              'Query performance metrics',
              'Storage usage and growth trends',
              'Connection pool utilization',
            ],
          },
          {
            type: 'heading',
            text: 'When to Check Performance',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'After adding a large number of tasks or boards',
              'When users report slow loading times',
              'Before onboarding a new team to ensure the system can handle increased load',
              'As part of weekly admin health checks',
            ],
          },
          {
            type: 'tip',
            text: 'If you notice response times increasing, consider archiving completed boards and removing unused data. AgileFlow\'s performance is directly related to the volume of active data.',
          },
        ],
      },
      {
        id: 'board-administration',
        title: 'Board Administration',
        description: 'Manage all boards across the workspace with admin privileges',
        content: [
          {
            type: 'paragraph',
            text: 'As an admin, you have visibility into all boards across the workspace, regardless of who created them. This enables oversight, auditing, and support for team members.',
          },
          {
            type: 'heading',
            text: 'Viewing All Boards',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Admin panel provides a list of all boards in the workspace, including their owner, creation date, task count, and last activity. This gives you a comprehensive view of all ongoing projects.',
          },
          {
            type: 'heading',
            text: 'Audit Capabilities',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Review board configurations and column setups',
              'Check task distribution and completion rates per board',
              'Identify boards that have been inactive or abandoned',
              'Monitor how team members are organizing their work',
            ],
          },
          {
            type: 'heading',
            text: 'Supporting Team Members',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Admin board access is primarily for support and oversight, not for making changes to other users\' boards. If a team member needs help with their board setup, you can review it and provide guidance without modifying their data.',
          },
          {
            type: 'heading',
            text: 'Best Practices',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Establish naming conventions for boards across the team',
              'Set up template boards with pre-configured columns that team members can duplicate',
              'Review board analytics monthly to identify process improvements',
              'Archive completed projects to keep the workspace organized',
            ],
          },
          {
            type: 'tip',
            text: 'Create a "Board Template" with your team\'s standard columns (Status, Priority, Assignee, Due Date, Story Points). New team members can use it as a starting point for their projects.',
          },
        ],
      },
    ],
  },
];
