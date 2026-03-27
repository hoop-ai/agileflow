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
            text: 'The Calendar page is your team\'s shared scheduling hub. It provides a monthly grid view of all events across your workspace, from daily standups and sprint ceremonies to project milestones and hard deadlines. The calendar is designed to give you a quick visual overview of what is coming up, what is happening today, and how your team\'s time is distributed across different types of activities.',
          },
          {
            type: 'paragraph',
            text: 'Unlike task due dates on boards (which track when work is due), the calendar is specifically for time-based events — things that happen at a particular date and time. Think of boards as your "what needs to get done" tool and the calendar as your "when things are happening" tool. Together, they give you a complete picture of your team\'s commitments.',
          },
          {
            type: 'heading',
            text: 'Monthly Grid Layout',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The calendar displays one month at a time in a traditional grid layout. Each cell represents a single day, with rows for each week. The current month and year are displayed prominently in the header area. Days that belong to the previous or next month appear dimmed at the edges of the grid, providing context for how weeks flow across month boundaries.',
          },
          {
            type: 'list',
            items: [
              'Each day cell shows the date number and any events scheduled for that day',
              'Events appear as small colored dots or badges within the day cell, color-coded by event type',
              'If a day has multiple events, a badge displays the total event count so you can see busy days at a glance',
              'Today\'s date is highlighted with a distinct background color and border, making it immediately identifiable',
              'Weekdays and weekends are displayed equally — AgileFlow does not hide weekend days',
            ],
          },
          {
            type: 'heading',
            text: 'Navigating Between Months',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Navigation controls in the calendar header let you move backward and forward through months. These controls are designed to be intuitive and quick.',
          },
          {
            type: 'list',
            items: [
              'Left arrow button — moves to the previous month',
              'Right arrow button — moves to the next month',
              'Today button — jumps back to the current month regardless of how far you have navigated, centering on today\'s date',
              'The month and year label updates automatically as you navigate',
            ],
          },
          {
            type: 'tip',
            text: 'If you have navigated several months ahead while planning future sprints or milestones, click the "Today" button to instantly return to the current month without having to click the back arrow repeatedly.',
          },
          {
            type: 'heading',
            text: 'Today Highlighting',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The current date is always visually emphasized in the calendar grid. This serves as an anchor point so you can quickly orient yourself relative to upcoming events. When you open the calendar, your eye is naturally drawn to today\'s highlighted cell, and you can scan forward to see what is coming next.',
          },
          {
            type: 'heading',
            text: 'Event Types and Color Coding',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow supports eight distinct event types, each assigned a specific color. This color coding is consistent throughout the application — in the calendar grid, in event details, and in the upcoming events list. Learning the color associations helps you scan the calendar quickly and understand your schedule at a glance.',
          },
          {
            type: 'list',
            items: [
              'Meeting (blue) — team meetings, standups, one-on-ones, and sync calls',
              'Milestone (green) — significant project deliverables and achievement markers',
              'Deadline (red) — hard deadlines, submission dates, and non-negotiable due dates',
              'Review (purple) — code reviews, design reviews, sprint reviews, and feedback sessions',
              'Retrospective (yellow) — sprint retrospectives, team reflections, and process improvement sessions',
              'Planning (sky blue) — sprint planning, roadmap sessions, and strategy meetings',
              'Holiday (orange) — team holidays, company days off, and individual time off',
              'Other (gray) — miscellaneous events that do not fit the categories above',
            ],
          },
          {
            type: 'heading',
            text: 'Clicking on Dates',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The calendar is interactive — clicking on a date opens the event creation form with that date pre-filled. This is the fastest way to add an event for a specific day. If a date already has events, clicking on an event dot or badge opens that event\'s details, where you can view, edit, or delete it.',
          },
          {
            type: 'heading',
            text: 'Upcoming Events List',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Below the calendar grid, an upcoming events list displays events in chronological order. This list shows events from today forward, giving you a linear timeline view that complements the grid layout. Each entry in the list shows the event title, type badge, date, time (if set), and any other relevant details. This is especially useful when you want to see what is next without scanning the entire calendar grid.',
          },
          {
            type: 'tip',
            text: 'Use the upcoming events list as your daily briefing. Check it at the start of each day to see what meetings, deadlines, and milestones are coming up in the near future.',
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
            text: 'Creating calendar events is one of the most common actions in AgileFlow. Events help your team stay aligned on schedules, deadlines, and ceremonies. There are two ways to create an event: using the dedicated button or clicking directly on a calendar date. Both methods open the same creation form — the only difference is whether the date is pre-filled.',
          },
          {
            type: 'heading',
            text: 'Method 1: The New Event Button',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Navigate to the Calendar page from the left sidebar.',
              'Click the "+ New Event" button located in the top area of the calendar page.',
              'The event creation dialog opens. Fill in the event details (described below).',
              'Click "Create Event" to save the event to the calendar.',
            ],
          },
          {
            type: 'heading',
            text: 'Method 2: Click on a Date',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Navigate to the Calendar page from the left sidebar.',
              'Click on any date cell in the calendar grid.',
              'The event creation dialog opens with the selected date already filled in.',
              'Complete the remaining fields and click "Create Event" to save.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Clicking on a date is the faster approach when you already know when the event should occur. It saves you the step of manually selecting a date in the form.',
          },
          {
            type: 'heading',
            text: 'Event Creation Fields',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The event creation form includes several fields that let you fully describe the event. Only the title and date are required — all other fields are optional but recommended for clarity.',
          },
          {
            type: 'list',
            items: [
              'Title (required) — a clear, descriptive name for the event. Good titles include context, such as "Sprint 12 Planning — Frontend Team" rather than just "Planning".',
              'Event Type (required) — select from the eight available types: Meeting, Milestone, Deadline, Review, Retrospective, Planning, Holiday, or Other. The type determines the event\'s color on the calendar.',
              'Date (required) — the day the event occurs. Pre-filled if you clicked on a date in the calendar.',
              'Start Time (optional) — when the event begins. Leave blank for all-day events.',
              'End Time (optional) — when the event ends. Should be after the start time.',
              'All-Day Toggle — switch this on for events that span the entire day, such as holidays, milestones, or deadlines. When toggled on, the start and end time fields are hidden.',
              'Location (optional) — the physical location or virtual meeting link (Zoom, Google Meet, etc.).',
              'Attendees (optional) — select team members who should attend. They will see the event on their calendar.',
              'Description (optional) — additional context, agenda items, preparation notes, or any other information attendees should know.',
            ],
          },
          {
            type: 'heading',
            text: 'All-Day Events',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'All-day events represent activities or markers that apply to an entire day rather than a specific time window. When you toggle the "All Day" switch, the start and end time fields disappear because they are not relevant. All-day events appear at the top of the date cell in the calendar grid, making them prominent and easy to notice.',
          },
          {
            type: 'paragraph',
            text: 'Common all-day events include project milestones (marking the completion of a phase), deadlines (the final day something is due), holidays (company or personal days off), and multi-day conferences or off-sites.',
          },
          {
            type: 'heading',
            text: 'Tips for Effective Event Creation',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Use descriptive titles that include the team or project name — "Sprint 24 Planning" is better than "Planning"',
              'Always set the correct event type so the color coding is meaningful for your team',
              'Add attendees so team members can see events relevant to them',
              'Include a brief agenda or purpose in the description field to help attendees prepare',
              'For recurring ceremonies (daily standups, sprint planning), create events for each occurrence so they appear on the calendar',
            ],
          },
          {
            type: 'warning',
            text: 'Events are visible to all team members in the workspace. Do not include sensitive personal information in event titles or descriptions. Use the location field for meeting links rather than putting them in the title.',
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
            text: 'Once events are on the calendar, you will often need to update them — changing times, adding attendees, or canceling events altogether. AgileFlow makes event management straightforward with click-to-edit functionality and clear delete confirmations.',
          },
          {
            type: 'heading',
            text: 'Viewing Event Details',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Click on any event in the calendar grid or in the upcoming events list to open its details. The event detail view shows all the information you entered when creating the event, including the title, type, date, times, location, attendees, and description.',
          },
          {
            type: 'heading',
            text: 'Editing Events',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click on the event you want to edit in the calendar grid or upcoming events list.',
              'The event detail dialog opens, showing all current information.',
              'Click the "Edit" button to enter edit mode.',
              'Modify any fields — title, type, date, times, location, attendees, or description.',
              'Click "Save" to apply your changes.',
            ],
          },
          {
            type: 'paragraph',
            text: 'All changes take effect immediately and are visible to all team members. If you change the event type, its color on the calendar updates automatically to match the new type.',
          },
          {
            type: 'heading',
            text: 'Deleting Events',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click on the event you want to delete to open its details.',
              'Click the "Delete" button.',
              'A confirmation dialog appears asking you to confirm the deletion.',
              'Click "Confirm" or "Delete" to permanently remove the event.',
            ],
          },
          {
            type: 'warning',
            text: 'Deleting an event is permanent and cannot be undone. The event is removed from the calendar for all team members. If you are unsure, consider changing the event\'s date or adding a note to the description instead of deleting it.',
          },
          {
            type: 'heading',
            text: 'Color Coding for Quick Scanning',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Every event on the calendar is color-coded based on its type. This is one of the most useful features for managing a busy calendar because it lets you instantly distinguish between meetings (blue), deadlines (red), milestones (green), and other event types without reading each title. When scanning a week or month, the color distribution tells you whether you are heavy on meetings, approaching many deadlines, or have a balanced schedule.',
          },
          {
            type: 'heading',
            text: 'Upcoming Events List',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The upcoming events list below the calendar provides a chronological view of events starting from today. This list is particularly useful for day-to-day planning because events are sorted by date and time, giving you a clear picture of what is next. Each entry shows the event\'s color-coded type badge, title, date, and time, making it easy to scan without opening each event.',
          },
          {
            type: 'tip',
            text: 'Regularly review the upcoming events list at the start of each week. It helps you prepare for upcoming deadlines, schedule necessary meetings, and avoid conflicts in your team\'s calendar.',
          },
        ],
      },
      {
        id: 'event-types-deep-dive',
        title: 'Event Types Deep Dive',
        description: 'Understand each event type, its purpose, color meaning, and when to use it',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow includes eight carefully chosen event types that cover the full range of activities in an agile team\'s calendar. Each type has a dedicated color and is designed for a specific category of event. Using the correct event type is important because it enables visual scanning — when everyone on your team categorizes events consistently, the calendar becomes a powerful communication tool where colors tell the story at a glance.',
          },
          {
            type: 'heading',
            text: 'Meeting (Blue)',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Meetings are the most common event type. Use this for any gathering where team members come together to discuss, align, or make decisions. The blue color was chosen because meetings are a neutral, everyday activity — present but not alarming.',
          },
          {
            type: 'list',
            items: [
              'Daily standups — brief check-ins where each team member shares what they did, what they will do, and any blockers',
              'One-on-ones — private conversations between a manager and a direct report',
              'Team sync meetings — regular alignment sessions for a project or department',
              'Client meetings — external-facing discussions with stakeholders or customers',
              'Ad-hoc discussions — unplanned meetings that arise from urgent issues',
            ],
          },
          {
            type: 'tip',
            text: 'Keep meeting titles specific. "Backend Team Standup" is better than "Standup", and "Q2 Roadmap Review with Product" is better than "Review Meeting". Specific titles make the calendar useful even at a glance.',
          },
          {
            type: 'heading',
            text: 'Milestone (Green)',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Milestones mark significant achievements or deliverables in a project\'s lifecycle. They are not about time spent — they are about outcomes reached. Green signifies completion and progress, making milestone markers feel positive and forward-looking on the calendar.',
          },
          {
            type: 'list',
            items: [
              'Feature completion dates — when a major feature is expected to be finished',
              'Release dates — when a version ships to production or users',
              'Phase transitions — the boundary between project phases (e.g., "Design Complete, Development Begins")',
              'Demo dates — when work will be presented to stakeholders',
              'Go-live dates — when a product or feature becomes available to end users',
            ],
          },
          {
            type: 'paragraph',
            text: 'Milestones are typically set as all-day events because they represent a date marker rather than a timed activity. They are visible checkpoints that help the team understand the bigger picture of where a project is heading.',
          },
          {
            type: 'heading',
            text: 'Deadline (Red)',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Deadlines are non-negotiable dates by which something must be completed. The red color is intentional — it signals urgency and importance. When you see red on the calendar, it should trigger awareness that something critical is due.',
          },
          {
            type: 'list',
            items: [
              'Submission deadlines — reports, proposals, or deliverables due to external parties',
              'Compliance dates — regulatory or legal deadlines that cannot be moved',
              'Client deliverable due dates — work promised to clients by a specific date',
              'Budget or funding deadlines — financial commitments tied to dates',
              'Contract renewal dates — time-sensitive administrative deadlines',
            ],
          },
          {
            type: 'warning',
            text: 'Reserve the Deadline type for hard, immovable dates. If you overuse red for soft deadlines, the visual urgency loses its meaning. Use Milestone (green) for target dates that have some flexibility.',
          },
          {
            type: 'heading',
            text: 'Review (Purple)',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Reviews are events where work is examined, evaluated, or critiqued. The purple color distinguishes them from regular meetings — reviews have a specific purpose of assessing quality or progress.',
          },
          {
            type: 'list',
            items: [
              'Code reviews — team sessions for reviewing pull requests or architecture decisions',
              'Design reviews — evaluating mockups, prototypes, or UX flows',
              'Sprint reviews — demonstrating completed work to stakeholders at the end of a sprint',
              'Performance reviews — evaluating individual or team performance',
              'Architectural reviews — assessing system design decisions and trade-offs',
            ],
          },
          {
            type: 'heading',
            text: 'Retrospective (Yellow)',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Retrospectives are dedicated sessions where the team reflects on how they worked during a sprint or project phase. The goal is continuous improvement — identifying what went well, what did not, and what to change. Yellow conveys a reflective, thoughtful tone.',
          },
          {
            type: 'list',
            items: [
              'Sprint retrospectives — end-of-sprint reflection sessions (the most common use)',
              'Project retrospectives — post-mortem analysis after a project concludes',
              'Process improvement workshops — focused sessions on improving specific workflows',
              'Incident retrospectives — post-incident reviews after outages or critical bugs',
            ],
          },
          {
            type: 'tip',
            text: 'Schedule retrospectives immediately after sprint reviews. The sprint review shows what was built, and the retrospective reflects on how it was built. This sequence keeps insights fresh.',
          },
          {
            type: 'heading',
            text: 'Planning (Sky Blue)',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Planning events are forward-looking sessions where the team decides what to work on next. Sky blue is a lighter, more optimistic shade that differentiates planning from regular meetings (darker blue). Planning sessions are about the future — setting goals, prioritizing work, and committing to deliverables.',
          },
          {
            type: 'list',
            items: [
              'Sprint planning — selecting user stories from the backlog for the upcoming sprint',
              'Roadmap planning — defining features and priorities for the next quarter or release',
              'Capacity planning — assessing team availability and allocating work accordingly',
              'Release planning — coordinating what goes into a specific release',
              'Backlog grooming sessions — refining, estimating, and prioritizing backlog items',
            ],
          },
          {
            type: 'heading',
            text: 'Holiday (Orange)',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Holiday events mark days when team members are unavailable. Orange is a warm, neutral color that signals reduced availability without the urgency of red. Tracking holidays on the calendar is important for sprint planning and workload distribution.',
          },
          {
            type: 'list',
            items: [
              'Company-wide holidays — national holidays, company days off',
              'Individual time off — vacation days, personal days, sick leave',
              'Team off-sites — days when the team is away from normal work',
              'Conference attendance — when team members are at industry events',
              'Reduced availability — half-days or partial availability',
            ],
          },
          {
            type: 'paragraph',
            text: 'Knowing who is out and when is critical for sprint planning. If half the team is on holiday during a sprint, velocity will be lower. Adding holidays to the calendar helps the team plan realistically.',
          },
          {
            type: 'heading',
            text: 'Other (Gray)',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Other type is a catch-all for events that do not fit neatly into the seven specific categories. Gray is intentionally neutral — it does not draw attention or imply any particular urgency. Use it sparingly, and consider whether one of the specific types might be more appropriate.',
          },
          {
            type: 'list',
            items: [
              'Social events — team lunches, celebrations, happy hours',
              'Training sessions — workshops, courses, or learning events',
              'Administrative tasks — account setup, tool migrations, office logistics',
              'External events — industry webinars, community meetups',
            ],
          },
          {
            type: 'tip',
            text: 'If you find yourself using "Other" frequently, consider whether the events share a common theme. Consistent use of the specific event types makes your calendar much more informative for the whole team.',
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
    description: 'Visualize progress, track performance, and make data-driven decisions',
    icon: 'BarChart3',
    articles: [
      {
        id: 'analytics-dashboard',
        title: 'Analytics Dashboard',
        description: 'Overview of analytics capabilities and how to access them',
        content: [
          {
            type: 'paragraph',
            text: 'Analytics in AgileFlow help you move beyond gut feelings and make decisions based on real data. Instead of guessing whether your team is on track or wondering where bottlenecks exist, analytics give you concrete numbers, charts, and trends that reveal the true state of your projects.',
          },
          {
            type: 'paragraph',
            text: 'AgileFlow provides analytics at two levels: workspace-level analytics (accessible from the Analytics page in the sidebar) and board-level analytics (accessible from the analytics panel within any board). Both levels complement each other — workspace analytics show the big picture across all projects, while board analytics zoom in on a specific project\'s health.',
          },
          {
            type: 'heading',
            text: 'Accessing Workspace Analytics',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click "Analytics" in the left sidebar navigation.',
              'The Analytics page loads with charts and metrics spanning all your boards and tasks.',
              'Use the available filters and tabs to focus on specific data dimensions.',
            ],
          },
          {
            type: 'heading',
            text: 'Accessing Board-Level Analytics',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Open any board from the Boards page.',
              'Click the bar chart icon in the board header toolbar.',
              'The Analytics panel slides open on the right side, showing metrics specific to that board.',
            ],
          },
          {
            type: 'heading',
            text: 'What Analytics Cover',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Task distribution — how tasks are spread across statuses, priorities, and team members',
              'Team performance — individual and team-level completion rates, workload balance, and productivity trends',
              'Sprint analytics — velocity tracking, burndown charts, and sprint completion rates over time',
              'Board health — total tasks, completion rates, overdue items, and progress indicators',
            ],
          },
          {
            type: 'heading',
            text: 'Why Analytics Matter',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'In agile development, the ability to inspect and adapt is fundamental. Analytics provide the "inspect" part of that equation. When you can see that tasks are piling up in the "Working" column, or that one team member has three times the workload of others, or that sprint velocity is declining, you can take corrective action before problems become serious. Teams that regularly review their analytics tend to deliver more predictably and maintain healthier work-life balance.',
          },
          {
            type: 'tip',
            text: 'Make analytics review part of your regular routine. Check workspace analytics at the start of each week and board analytics during standups. The data is most useful when reviewed frequently, not just at the end of a sprint.',
          },
        ],
      },
      {
        id: 'task-distribution',
        title: 'Task Distribution',
        description: 'Understand how tasks are distributed across statuses, priorities, and team members',
        content: [
          {
            type: 'paragraph',
            text: 'Task distribution analytics show you how your work is spread across different dimensions — status, priority, and team members. This is one of the most fundamental analytics views because it answers the question: "Where is all our work right now?" Understanding distribution patterns helps you identify bottlenecks, imbalances, and potential risks before they impact delivery.',
          },
          {
            type: 'heading',
            text: 'Status Distribution',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The status distribution chart shows how many tasks are in each workflow state (Not Started, Working On It, Stuck, Done, and any custom statuses). This chart typically appears as a donut or bar chart, giving you an immediate visual sense of your project\'s progress.',
          },
          {
            type: 'list',
            items: [
              'A healthy distribution shows a moderate number of tasks in "Working" and a growing proportion in "Done"',
              'Too many tasks in "Not Started" may indicate the team has not begun enough work or the sprint was overcommitted',
              'A large number of "Stuck" tasks is a red flag that needs immediate attention — it means blockers are preventing progress',
              'If most tasks are "Done" early in a sprint, the team may have capacity for additional work or the sprint was undercommitted',
              'An even split between all statuses mid-sprint is generally a sign of steady, healthy progress',
            ],
          },
          {
            type: 'heading',
            text: 'Priority Distribution',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The priority distribution chart breaks down tasks by urgency level: Critical, High, Medium, and Low. This view helps you assess whether your team is focusing on the right things and whether your backlog is properly prioritized.',
          },
          {
            type: 'list',
            items: [
              'A project dominated by "Critical" and "High" priority tasks may indicate poor prioritization or a genuine crisis',
              'A balanced mix of priorities (with most tasks at Medium) suggests a well-maintained backlog',
              'Too many "Low" priority tasks in an active sprint may mean the team is not working on what matters most',
              'If critical tasks are not being completed first, it suggests the team needs to re-evaluate their work order',
            ],
          },
          {
            type: 'heading',
            text: 'Board-Level Breakdown',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'At the workspace level, task distribution can be viewed per board, showing you which projects have the most work, which are closest to completion, and which might need attention. This cross-board view is invaluable for managers overseeing multiple projects.',
          },
          {
            type: 'heading',
            text: 'Reading Distribution Patterns',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Distribution charts tell a story when you learn to read them. The shape of the distribution — whether it is evenly spread, clustered at one end, or bimodal — reveals important information about your team\'s workflow health.',
          },
          {
            type: 'list',
            items: [
              'Healthy pattern — tasks flow steadily from left to right (Not Started → Working → Done) with no pile-ups',
              'Bottleneck pattern — a large concentration of tasks in one status (usually "Working" or "Stuck") indicates a blockage in the workflow',
              'Front-loaded pattern — most tasks in "Not Started" suggests the team has not yet ramped up or is overwhelmed with scope',
              'Tail-heavy pattern — most tasks in "Done" early in a sprint means capacity is available for more work',
              'Priority inversion — low-priority tasks completing while high-priority items remain stuck signals a prioritization issue',
            ],
          },
          {
            type: 'tip',
            text: 'Compare task distribution snapshots at the beginning, middle, and end of each sprint. The movement patterns reveal whether your team works steadily or in bursts, which affects how you plan future sprints.',
          },
        ],
      },
      {
        id: 'team-performance',
        title: 'Team Performance',
        description: 'Track individual and team productivity, workload balance, and completion rates',
        content: [
          {
            type: 'paragraph',
            text: 'Team performance analytics provide visibility into how work is distributed among team members and how effectively each person is completing their assignments. This data is not meant for punishment or surveillance — it exists to help teams work more sustainably, identify when someone needs help, and ensure workloads are fair.',
          },
          {
            type: 'heading',
            text: 'Per-Member Metrics',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'For each team member, AgileFlow tracks several key metrics that together paint a picture of their workload and output.',
          },
          {
            type: 'list',
            items: [
              'Tasks Assigned — the total number of tasks currently assigned to this person across all boards. A high number may indicate overload.',
              'Tasks Completed — the number of tasks this person has moved to "Done" status. This shows output over the selected time period.',
              'Completion Rate — the percentage of assigned tasks that have been completed. A rate below 50% may indicate blockers or overcommitment.',
              'Active Tasks — tasks currently in a "Working" status, showing what the person is actively focused on right now.',
            ],
          },
          {
            type: 'heading',
            text: 'Workload Analysis',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The workload analysis chart visualizes task distribution across all team members, making imbalances immediately visible. When one bar is dramatically taller than others, it signals an uneven distribution that should be addressed.',
          },
          {
            type: 'list',
            items: [
              'Overloaded members — significantly more tasks than average. Risk of burnout, missed deadlines, and quality issues. Consider redistributing work.',
              'Underutilized members — significantly fewer tasks than average. They may have capacity to take on more work or could help overloaded colleagues.',
              'Balanced team — similar task counts across members with proportional completion rates. This is the ideal state for sustainable delivery.',
            ],
          },
          {
            type: 'heading',
            text: 'Identifying and Addressing Overload',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Workload imbalance is one of the most common problems in project teams. It happens naturally as certain people become go-to experts for specific areas, and tasks gravititate toward them. Without analytics, this imbalance often goes unnoticed until burnout or missed deadlines make it obvious.',
          },
          {
            type: 'steps',
            items: [
              'Review the workload chart weekly to spot imbalances early.',
              'If one person has more than 1.5x the average task count, flag it in standup.',
              'Use the /assign AI command to get suggestions for redistributing tasks based on skills and availability.',
              'During sprint planning, use the workload chart to guide assignment decisions — assign new tasks to people with more capacity.',
              'Track completion rates alongside task counts. A person with many tasks and a high completion rate may be fine, while someone with fewer tasks and a low rate may be struggling.',
            ],
          },
          {
            type: 'heading',
            text: 'Using Performance Data for Planning',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Team performance data from past sprints is one of the best inputs for future planning. If you know that your team consistently completes 30 story points per sprint, you can plan the next sprint with confidence. If you see that a particular team member completes tasks 20% faster than average, you can factor that into capacity planning.',
          },
          {
            type: 'list',
            items: [
              'Use historical completion rates to set realistic sprint goals',
              'Factor in individual velocities when assigning complex tasks',
              'Identify training opportunities — if someone\'s completion rate drops for a specific type of task, they may need support or pairing',
              'Celebrate improvements in team metrics during retrospectives to reinforce positive patterns',
            ],
          },
          {
            type: 'warning',
            text: 'Performance metrics should never be used to rank or shame team members. They exist to make workloads visible, identify people who need help, and improve planning accuracy. Always use these numbers in the context of supporting your team.',
          },
        ],
      },
      {
        id: 'sprint-analytics',
        title: 'Sprint Analytics',
        description: 'Track velocity, burndown, and completion rates across sprints',
        content: [
          {
            type: 'paragraph',
            text: 'Sprint analytics are the heartbeat of agile project management. They track how much work your team accomplishes in each sprint and whether the pace is sustainable, improving, or declining. For teams practicing Scrum or sprint-based agile, these metrics are essential for planning, retrospectives, and stakeholder communication.',
          },
          {
            type: 'heading',
            text: 'Understanding Velocity',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Velocity is the amount of work your team completes in a single sprint, typically measured in story points. It is one of the most important agile metrics because it provides a data-driven basis for planning future sprints. Rather than guessing how much work the team can handle, you use historical velocity to make informed commitments.',
          },
          {
            type: 'list',
            items: [
              'Velocity is calculated by summing the story points of all tasks completed (moved to "Done") during a sprint',
              'Only fully completed tasks count — partially done work does not contribute to velocity',
              'Track velocity across multiple sprints to establish a reliable average. Three to five sprints of data usually provides a stable baseline.',
              'Velocity naturally varies from sprint to sprint. Small fluctuations are normal — look for trends rather than reacting to individual sprint numbers.',
            ],
          },
          {
            type: 'heading',
            text: 'Velocity Trends',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'A velocity trend chart plots your team\'s velocity over multiple sprints, revealing patterns that are invisible when looking at one sprint at a time.',
          },
          {
            type: 'list',
            items: [
              'Stable velocity (flat line) — your team has found a sustainable pace. This is the ideal state and means your sprint planning is accurate.',
              'Increasing velocity (upward trend) — the team is becoming more efficient, possibly due to better processes, fewer blockers, or improved tooling. Enjoy it, but watch for burnout.',
              'Decreasing velocity (downward trend) — something is slowing the team down. Common causes: increasing technical debt, more meetings, scope creep, team changes, or burnout.',
              'Erratic velocity (up and down) — inconsistent delivery that makes planning difficult. Investigate causes: varying team availability, inconsistent estimation, or unplanned work disrupting sprints.',
            ],
          },
          {
            type: 'heading',
            text: 'Burndown Charts',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'A burndown chart shows how much work remains in a sprint over time. The horizontal axis represents the sprint duration (days), and the vertical axis represents the remaining work (story points or task count). Two lines tell the story: the ideal line and the actual line.',
          },
          {
            type: 'list',
            items: [
              'Ideal line — a straight diagonal from the total work at sprint start to zero at sprint end. It represents the theoretical perfect pace where work is completed evenly each day.',
              'Actual line — the real remaining work as tasks are completed. This line moves down (work completed), stays flat (no progress), or occasionally moves up (scope added mid-sprint).',
            ],
          },
          {
            type: 'heading',
            text: 'Reading Burndown Patterns',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The shape of the actual line compared to the ideal line reveals how your team is working throughout the sprint. Learning to read these patterns is one of the most valuable skills for a Scrum Master or team lead.',
          },
          {
            type: 'list',
            items: [
              'Actual tracks ideal closely — the team is delivering at a steady, predictable pace. This is the healthiest pattern.',
              'Flat sections (horizontal line) — no tasks were completed during this period. The team may be blocked, stuck in meetings, or working on tasks that are not yet ready to close. Investigate the cause.',
              'Steep drops (sharp downward line) — a burst of task completions in a short period. This may mean the team works in batches or that tasks were completed earlier but not updated until later. Frequent steep drops suggest inconsistent workflow.',
              'Actual above ideal — the team is behind schedule. If this persists past the sprint midpoint, the team is unlikely to complete all planned work.',
              'Actual below ideal — the team is ahead of schedule. They may have capacity for additional work, or the sprint was undercommitted.',
              'Line goes up — work was added to the sprint (scope creep). This makes it harder to complete the original commitment and should be discussed in the retrospective.',
            ],
          },
          {
            type: 'heading',
            text: 'Sprint Completion Rate',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The sprint completion rate is the percentage of planned work that was actually completed by the end of the sprint. A rate of 100% means the team delivered everything they committed to. Rates consistently below 70% suggest the team is overcommitting, while rates consistently above 95% may mean the team has more capacity than they are using.',
          },
          {
            type: 'list',
            items: [
              '90-100% — excellent sprint execution, the team is committing accurately and delivering reliably',
              '70-90% — acceptable range, with some room for improvement in estimation or capacity planning',
              '50-70% — concerning range, the team may be overcommitting, facing too many interruptions, or dealing with significant blockers',
              'Below 50% — immediate attention needed. Either the estimation process is broken, external factors are disrupting the sprint, or the team lacks capacity for the committed scope',
            ],
          },
          {
            type: 'heading',
            text: 'Using Sprint Data for Future Planning',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The true value of sprint analytics is not in measuring past performance — it is in improving future planning. Every sprint produces data that makes the next sprint more predictable.',
          },
          {
            type: 'list',
            items: [
              'Use average velocity from the last 3-5 sprints as the baseline for the next sprint\'s commitment',
              'If completion rate is consistently low, reduce the amount of work planned rather than pushing the team harder',
              'If burndowns show flat sections on specific days (like meeting-heavy days), account for reduced capacity on those days',
              'Track which types of tasks take longer than estimated and adjust story point values accordingly',
              'Share sprint analytics in retrospectives to ground discussions in data rather than opinions',
            ],
          },
          {
            type: 'tip',
            text: 'Velocity is a planning tool, not a performance measure. Never compare velocity between different teams — each team\'s point scale is unique. A team with velocity 20 is not "worse" than a team with velocity 50; they simply estimate differently.',
          },
        ],
      },
      {
        id: 'board-analytics-panel',
        title: 'Board Analytics Panel',
        description: 'Access detailed metrics and charts for individual boards',
        content: [
          {
            type: 'paragraph',
            text: 'Every board in AgileFlow has a built-in analytics panel that provides project-specific metrics without leaving the board view. This panel gives you a focused look at a single project\'s health, making it ideal for team leads who want to quickly assess progress during standups or check-ins.',
          },
          {
            type: 'heading',
            text: 'Opening the Analytics Panel',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Open any board from the Boards page.',
              'Look for the bar chart icon in the board header toolbar (next to the view selector and other controls).',
              'Click the bar chart icon to toggle the analytics panel open.',
              'The panel slides open, displaying stat cards and charts specific to this board.',
              'Click the icon again to close the panel when you are done.',
            ],
          },
          {
            type: 'heading',
            text: 'Stat Cards',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'At the top of the analytics panel, three stat cards provide key numbers at a glance. Each card includes an information tooltip (hover over the info icon) that explains what the metric means and why it matters.',
          },
          {
            type: 'list',
            items: [
              'Total Tasks — the total number of tasks on the board across all groups and statuses. This gives you a sense of the project\'s scope. The tooltip explains that this includes tasks in every status, from Not Started to Done.',
              'Completion Rate — the percentage of tasks that have been moved to "Done" status, displayed with a progress bar for quick visual assessment. A rising completion rate over time indicates steady progress. The tooltip clarifies that only tasks with "Done" status count as completed.',
              'Overdue Tasks — the number of tasks whose due date has passed but are not yet marked as "Done". This is a critical health indicator — overdue tasks represent broken commitments. The tooltip explains that reducing this number should be a priority.',
            ],
          },
          {
            type: 'heading',
            text: 'Info Tooltips',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Each stat card has a small info icon (usually a circled "i") that displays a tooltip when hovered. These tooltips provide context about what the metric measures, how it is calculated, and what constitutes a healthy value. They are designed to help team members who are new to project analytics understand what the numbers mean without needing to consult external documentation.',
          },
          {
            type: 'heading',
            text: 'Distribution Charts',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Below the stat cards, the analytics panel displays distribution charts that break down the board\'s tasks by different dimensions.',
          },
          {
            type: 'list',
            items: [
              'Status Distribution — shows how many tasks are in each status (Not Started, Working On It, Stuck, Done). Helps identify bottlenecks and workflow health.',
              'Team Distribution — shows how tasks are distributed among team members. Helps spot workload imbalances where one person has too many or too few tasks.',
              'Priority Distribution — shows the breakdown by priority level (Critical, High, Medium, Low). Helps assess whether the team is focused on the most important work.',
            ],
          },
          {
            type: 'heading',
            text: 'AI Explain Button',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The analytics panel includes an "AI Explain" button that sends the current board data to the AI assistant and returns a natural-language summary of what the analytics reveal. Instead of interpreting the charts yourself, you can click this button to get a narrative explanation like "Your board has 45 tasks with a 62% completion rate. There are 5 overdue items, mostly assigned to two team members. The priority distribution is healthy, but the 8 stuck tasks suggest blockers that need to be discussed in the next standup."',
          },
          {
            type: 'steps',
            items: [
              'Open the board analytics panel by clicking the bar chart icon.',
              'Scroll down to find the "AI Explain" button.',
              'Click it to send your board data to the AI assistant.',
              'The AI generates a summary that interprets the metrics, identifies patterns, and suggests actions.',
            ],
          },
          {
            type: 'tip',
            text: 'Use the AI Explain button during sprint reviews or stakeholder updates. It generates a ready-made summary that you can share verbally or paste into a message. It saves time translating charts into words.',
          },
        ],
      },
      {
        id: 'using-ai-for-analytics',
        title: 'Using AI for Analytics',
        description: 'Leverage AI to interpret metrics and generate actionable insights',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow\'s AI assistant is not just for task management — it is also a powerful analytics tool. The AI can interpret your project data, generate narrative summaries, answer questions about metrics, and suggest improvements based on what the numbers reveal. This is especially valuable for team members who are less comfortable reading charts or for generating quick reports without manual analysis.',
          },
          {
            type: 'heading',
            text: 'AI Explain Buttons on Analytics',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Throughout the analytics interface — both on the workspace Analytics page and within board analytics panels — you will find "AI Explain" buttons. These buttons pass the current data context to the AI and request an interpretation. The AI analyzes the numbers, identifies notable patterns, and returns a plain-language summary with actionable suggestions.',
          },
          {
            type: 'paragraph',
            text: 'The AI Explain feature is context-aware. When triggered from a board analytics panel, it focuses on that specific board\'s data. When triggered from the workspace Analytics page, it considers data across all boards. This means the insights are always relevant to what you are looking at.',
          },
          {
            type: 'heading',
            text: 'The /performance Command',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The /performance command in the AI assistant generates a comprehensive team performance summary. It pulls data from all boards and all team members to create a report that covers workload distribution, completion rates, overdue items, and potential issues.',
          },
          {
            type: 'steps',
            items: [
              'Open the AI assistant (floating panel or AI Chat page).',
              'Type /performance and press Enter.',
              'The AI fetches current workspace data and generates a performance report.',
              'Review the report, which includes individual member metrics, team-level trends, and recommendations.',
            ],
          },
          {
            type: 'heading',
            text: 'Getting Narrative Summaries',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Beyond the specific commands, you can ask the AI free-form questions about your project data. The AI has access to your workspace context — boards, tasks, statuses, assignments, and sprint data — and can answer questions in natural language.',
          },
          {
            type: 'list',
            items: [
              '"How is the current sprint going?" — the AI summarizes completion progress, remaining work, and any risks',
              '"Which tasks are overdue?" — the AI lists overdue items with their assignees and how overdue they are',
              '"Who has the most work right now?" — the AI ranks team members by current task load',
              '"Are we on track to finish the sprint?" — the AI compares completed work to the remaining timeline and gives an assessment',
              '"What should we focus on this week?" — the AI prioritizes based on deadlines, priority levels, and blocking dependencies',
            ],
          },
          {
            type: 'heading',
            text: 'Asking Follow-Up Questions',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'After the AI provides an analytics summary, you can ask follow-up questions to dig deeper. The AI maintains conversation context, so you do not need to re-explain what you are asking about. For example, if the AI reports that Sprint 12 has a 65% completion rate, you can follow up with "Why is it lower than Sprint 11?" or "Which tasks are blocking progress?" and the AI will provide additional analysis.',
          },
          {
            type: 'tip',
            text: 'Use Thinking mode (the brain icon) for complex analytics questions that require deeper analysis. Thinking mode uses more capable models that are better at reasoning through multi-step calculations and identifying subtle patterns in data.',
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
    description: 'Get intelligent help with task management, analysis, and team insights',
    icon: 'Bot',
    articles: [
      {
        id: 'using-ai-assistant',
        title: 'Using the AI Assistant',
        description: 'Access the AI through the floating panel or full-page chat',
        content: [
          {
            type: 'paragraph',
            text: 'The AI assistant is one of AgileFlow\'s most powerful features. It understands your project context — your boards, tasks, team members, sprints, and analytics — and can help you with everything from quick questions to in-depth analysis. The assistant is available in two different interfaces, each designed for different use cases.',
          },
          {
            type: 'heading',
            text: 'Two Ways to Access the AI',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow provides two distinct ways to interact with the AI assistant, each optimized for different workflows.',
          },
          {
            type: 'list',
            items: [
              'Floating Panel — a compact chat panel that overlays the current page. Ideal for quick questions while you are working on a board, reviewing analytics, or doing any other task. It stays out of your way but is always accessible.',
              'AI Chat Page — a dedicated full-page experience accessible from the sidebar. Designed for longer conversations, complex analysis, session management, and deep dives into your project data. Use this when you want to focus on the AI conversation.',
            ],
          },
          {
            type: 'heading',
            text: 'Opening the Floating Panel',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Look for the chat bubble icon in the bottom-right corner of any page.',
              'Click the icon to open the floating AI panel.',
              'Type your question or command in the text input area.',
              'Press Enter to send your message.',
              'The AI responds within the panel while you continue viewing your current page.',
            ],
          },
          {
            type: 'heading',
            text: 'Opening the AI Chat Page',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click "AI Chat" in the left sidebar navigation.',
              'The full-page chat interface loads with a centered message area.',
              'Type your question in the text area at the bottom.',
              'Press Enter to send (or Shift+Enter for a new line within your message).',
              'View responses in the scrollable conversation area.',
            ],
          },
          {
            type: 'heading',
            text: 'What You Can Ask',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The AI assistant can help with a wide range of project management tasks. It automatically loads your workspace data so responses are grounded in your actual projects, not generic advice.',
          },
          {
            type: 'list',
            items: [
              'Task management questions — "What tasks are overdue?", "Who has the most work?", "What should I work on next?"',
              'Sprint planning — "How much work is left in the sprint?", "Are we on track?", "What is our velocity?"',
              'Team insights — "How is the team performing?", "Who is overloaded?", "Show me completion rates"',
              'Analytics interpretation — "Explain the burndown chart", "Why is our velocity dropping?", "What do the analytics suggest?"',
              'Process guidance — "How should I set up a Kanban board?", "What is a good sprint length?", "How do story points work?"',
              'Quick actions — use slash commands like /assign, /sprint, and /performance for structured outputs',
            ],
          },
          {
            type: 'heading',
            text: 'Quick Action Buttons',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Both the floating panel and AI Chat page display suggestion chips — pre-built prompts you can click instead of typing. These chips cover common questions and commands, making it faster to get insights without having to formulate your own prompt. They are especially useful when you are new to the AI assistant and want to see what it can do.',
          },
          {
            type: 'heading',
            text: 'Response Modes: Fast vs Thinking',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The AI assistant operates in two modes, each using different underlying models optimized for different types of questions.',
          },
          {
            type: 'list',
            items: [
              'Fast Mode (Zap icon) — uses lightweight, fast models like Claude Haiku 4.5, Gemini 2.0 Flash, and GPT-4o Mini. Responses come back in seconds. Best for simple questions, quick lookups, status checks, and straightforward commands. This is the default mode.',
              'Thinking Mode (Brain icon) — uses more capable models designed for deeper analysis and complex reasoning. Responses may take slightly longer but are more thorough. Best for complex analytics questions, multi-step planning, detailed performance analysis, and situations where you need nuanced insights.',
            ],
          },
          {
            type: 'paragraph',
            text: 'You can toggle between modes using the mode selector button next to the text input. The Zap icon represents Fast mode and the Brain icon represents Thinking mode. The current mode is visually indicated so you always know which mode is active.',
          },
          {
            type: 'tip',
            text: 'Start with Fast mode for most interactions. Switch to Thinking mode when you need the AI to reason through complex scenarios, compare multiple options, or analyze trends across many data points. Fast mode handles 80% of typical questions well.',
          },
        ],
      },
      {
        id: 'ai-commands',
        title: 'AI Commands',
        description: 'Use slash commands for structured task assignment, sprint planning, and performance analysis',
        content: [
          {
            type: 'paragraph',
            text: 'While you can ask the AI assistant any free-form question, slash commands provide structured, predictable outputs for common project management needs. Each command triggers a specific analysis that considers multiple factors from your workspace data and returns a formatted, actionable response.',
          },
          {
            type: 'heading',
            text: 'The /assign Command',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The /assign command asks the AI to recommend task assignments based on your team\'s current workload, skills, and availability. Instead of manually reviewing each person\'s task list and trying to balance the distribution, you let the AI analyze all the relevant factors and suggest optimal assignments.',
          },
          {
            type: 'list',
            items: [
              'What it considers: current task count per team member, completion rates, active vs completed work, task priority levels, and overall workload balance',
              'What it returns: specific suggestions for which team member should handle unassigned or pending tasks, with reasoning for each recommendation',
              'When to use it: during sprint planning, when new tasks are created, when someone is out and their tasks need redistribution, or when you suspect workload imbalance',
            ],
          },
          {
            type: 'paragraph',
            text: 'To use the /assign command, simply type "/assign" in the AI chat input and press Enter. The AI fetches your current workspace data, analyzes team workloads, and returns assignment suggestions. You can follow up with questions like "Why do you recommend assigning the login feature to Sarah?" and the AI will explain its reasoning.',
          },
          {
            type: 'heading',
            text: 'The /sprint Command',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The /sprint command generates sprint planning recommendations. It analyzes your backlog, team capacity, historical velocity, and current commitments to suggest what should go into the next sprint.',
          },
          {
            type: 'list',
            items: [
              'What it considers: backlog priority order, story point estimates, team velocity from previous sprints, current team capacity, dependencies between tasks, and deadline pressure',
              'What it returns: a recommended sprint scope with specific user stories or tasks, estimated total story points, risk assessment, and suggestions for handling dependencies',
              'When to use it: before sprint planning meetings, when prioritizing the backlog, when deciding whether to add or remove items from an active sprint',
            ],
          },
          {
            type: 'paragraph',
            text: 'Type "/sprint" in the AI chat to trigger this command. The AI evaluates your workspace and produces a sprint plan recommendation that you can use as a starting point for your planning discussion. It is not meant to replace the team\'s judgment — it provides a data-informed suggestion that the team can then discuss and refine.',
          },
          {
            type: 'heading',
            text: 'The /performance Command',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The /performance command generates a comprehensive team performance summary. It pulls metrics from all boards and team members to create a report covering productivity, workload distribution, and potential issues.',
          },
          {
            type: 'list',
            items: [
              'What it considers: task completion rates per member, workload distribution, overdue task counts, sprint completion percentages, and trend data from recent sprints',
              'What it returns: a formatted performance report with per-member statistics, team-level metrics, highlights (who is excelling), concerns (who might need support), and actionable recommendations',
              'When to use it: before retrospectives, during one-on-one meetings with team members, when preparing status reports for stakeholders, or weekly as part of your team health check routine',
            ],
          },
          {
            type: 'paragraph',
            text: 'Type "/performance" in the AI chat to generate the report. The output is typically detailed enough to share directly in retrospective meetings or status updates. It saves significant time compared to manually compiling metrics from multiple boards and analytics views.',
          },
          {
            type: 'heading',
            text: 'Combining Commands with Follow-Up Questions',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Slash commands are most powerful when combined with follow-up questions. After running /performance, you might ask "Why has Ahmed\'s completion rate dropped?" or after /sprint, you might ask "What happens if we add the payment feature to this sprint?". The AI maintains context from the command output and can reason about your follow-up questions using the same data.',
          },
          {
            type: 'tip',
            text: 'Use slash commands as conversation starters, not final answers. Run /assign to get initial recommendations, then discuss them with your team and ask the AI follow-up questions to refine the assignments based on factors the AI might not know about (like someone learning a new technology).',
          },
        ],
      },
      {
        id: 'ai-chat-page',
        title: 'AI Chat Page',
        description: 'Use the full-page AI experience with session history, streaming, and advanced features',
        content: [
          {
            type: 'paragraph',
            text: 'The AI Chat page is a dedicated, full-page interface for extended conversations with the AI assistant. While the floating panel is great for quick questions, the Chat page is designed for longer, more complex interactions — multi-step analysis, planning sessions, and detailed discussions where you need space and context.',
          },
          {
            type: 'heading',
            text: 'Accessing the AI Chat Page',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click "AI Chat" in the left sidebar navigation.',
              'The full-page chat interface loads.',
              'Start typing in the message input area at the bottom of the screen.',
            ],
          },
          {
            type: 'heading',
            text: 'Interface Layout',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The AI Chat page has a clean, centered layout optimized for conversation. The main message area takes up most of the screen, with messages displayed in a scrollable thread. Your messages appear on one side and the AI\'s responses on the other, similar to a messaging application.',
          },
          {
            type: 'list',
            items: [
              'Centered message area — the conversation thread occupies the main content area, with comfortable reading width',
              'Message input — an auto-expanding text area at the bottom that grows as you type longer messages',
              'Mode toggle — the Fast/Thinking mode selector (Zap/Brain icons) is accessible next to the input area',
              'Session history sidebar — a collapsible panel listing previous chat sessions for easy access',
              'Suggestion chips — pre-built prompts displayed when the conversation is empty or after a response',
            ],
          },
          {
            type: 'heading',
            text: 'Session Management',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Unlike the floating panel, the AI Chat page supports full session management. Your conversations are saved and organized so you can return to them later.',
          },
          {
            type: 'list',
            items: [
              'Sessions are automatically created when you start a new conversation',
              'Previous sessions appear in the sidebar history, listed with their title and timestamp',
              'Click any session in the history to reload that conversation and continue where you left off',
              'Rename sessions to make them easier to find later (e.g., "Sprint 12 Planning" or "Q2 Roadmap Analysis")',
              'Delete sessions you no longer need to keep your history clean',
              'Start a new session at any time to begin a fresh conversation without losing previous ones',
            ],
          },
          {
            type: 'heading',
            text: 'Streaming Responses',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The AI Chat page displays responses as they stream in — you see the text appear in real-time rather than waiting for the entire response to finish generating. This provides immediate feedback and lets you start reading while the AI is still working on the full answer.',
          },
          {
            type: 'list',
            items: [
              'Responses appear word by word or sentence by sentence as the AI generates them',
              'A stop button appears while the AI is generating, allowing you to cancel the response if it is going in the wrong direction',
              'Click the stop button to halt generation immediately — you keep whatever has been generated so far',
              'Stopping a response does not count as an error; you can send a new message to redirect the conversation',
            ],
          },
          {
            type: 'heading',
            text: 'Keyboard Support',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Enter — sends the current message',
              'Shift + Enter — inserts a new line within the message (for multi-line prompts without sending)',
              'The text input auto-expands as you type, accommodating longer messages without scrolling within the input',
            ],
          },
          {
            type: 'heading',
            text: 'When to Use the Chat Page vs the Floating Panel',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Use the AI Chat page when you want to have an extended conversation with multiple follow-up questions',
              'Use the AI Chat page when you want to save the conversation for later reference',
              'Use the AI Chat page for complex analysis that produces long responses you need to read carefully',
              'Use the floating panel for quick, one-off questions while working on a board',
              'Use the floating panel when you do not want to leave your current page',
              'Use the floating panel for fast status checks and simple commands',
            ],
          },
          {
            type: 'tip',
            text: 'Name your AI Chat sessions descriptively. When you revisit session history weeks later, "Sprint 14 retrospective analysis" is much more useful than "New chat" or "Untitled session".',
          },
        ],
      },
      {
        id: 'how-ai-works',
        title: 'How the AI Works',
        description: 'Understand the multi-model architecture, fallback system, and data handling',
        content: [
          {
            type: 'paragraph',
            text: 'Understanding how the AI assistant works behind the scenes helps you use it more effectively and set appropriate expectations for its capabilities. AgileFlow\'s AI is powered by a multi-model architecture that balances speed, quality, and reliability.',
          },
          {
            type: 'heading',
            text: 'Multi-Model Architecture',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Instead of relying on a single AI model, AgileFlow uses multiple language models through a service called OpenRouter. This architecture provides several advantages: if one model is slow or unavailable, the system automatically falls back to another; different models can be used for different tasks; and the system can balance cost and performance.',
          },
          {
            type: 'heading',
            text: 'Fast Mode Models',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'When you use Fast mode (the Zap icon), your request is routed to lightweight, fast-response models. These models are optimized for quick answers and can handle most everyday project management questions in seconds.',
          },
          {
            type: 'list',
            items: [
              'Claude Haiku 4.5 — Anthropic\'s fast, efficient model designed for quick tasks and simple analysis',
              'Gemini 2.0 Flash — Google\'s fast model optimized for speed and responsiveness',
              'GPT-4o Mini — OpenAI\'s compact model balancing capability with speed',
            ],
          },
          {
            type: 'heading',
            text: 'Thinking Mode Models',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Thinking mode (the Brain icon) routes your request to more capable models designed for deeper analysis, complex reasoning, and multi-step problem-solving. These models take slightly longer but produce more thorough, nuanced responses. The specific models used in Thinking mode are selected for their strength in analytical and reasoning tasks.',
          },
          {
            type: 'heading',
            text: 'Automatic Fallback',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'If the primary model for your selected mode is unavailable or experiencing high latency, the system automatically falls back to the next available model. This cascading fallback ensures that you always get a response, even if a specific AI provider is having issues. The fallback is seamless — you do not need to do anything, and you may not even notice it happened.',
          },
          {
            type: 'heading',
            text: 'Context-Aware Responses',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The AI assistant does not operate in a vacuum. When you send a message, the system automatically loads relevant workspace data — your boards, tasks, team members, sprints, and recent activity — and includes it as context for the AI model. This is why the AI can answer questions like "Who has the most overdue tasks?" without you needing to specify which board or which team. The AI sees your actual data and responds based on it.',
          },
          {
            type: 'list',
            items: [
              'Board data — names, descriptions, task counts, and statuses from your boards',
              'Task data — individual task details including status, priority, assignee, and due dates',
              'Team data — team member names, roles, and current assignments',
              'Sprint data — active and past sprint details, velocity, and completion rates',
            ],
          },
          {
            type: 'heading',
            text: 'Data Privacy',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Your workspace data is sent to third-party AI model providers (Anthropic, Google, OpenAI) to generate responses. The data is used only for generating the immediate response and is not stored or used for training by the AI providers. AgileFlow sends only the minimum data needed for the AI to understand your question. Sensitive information like passwords and authentication tokens is never included in AI requests.',
          },
          {
            type: 'warning',
            text: 'While AI providers do not store your data for training, your workspace information (task titles, team member names, sprint details) is transmitted to external servers to generate responses. Avoid putting highly sensitive or confidential information in task titles, descriptions, or other fields if this is a concern for your organization.',
          },
        ],
      },
      {
        id: 'ai-best-practices',
        title: 'AI Best Practices',
        description: 'Tips for getting the most accurate and useful responses from the AI',
        content: [
          {
            type: 'paragraph',
            text: 'The AI assistant is a powerful tool, but like any tool, the results depend on how you use it. These best practices will help you get more accurate, useful, and actionable responses from the AI.',
          },
          {
            type: 'heading',
            text: 'Be Specific in Your Questions',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The more specific your question, the more useful the response. Vague questions produce vague answers. Compare these two approaches:',
          },
          {
            type: 'list',
            items: [
              'Vague: "How is the project going?" — The AI gives a generic overview that may not address what you actually want to know.',
              'Specific: "What is the completion rate for Sprint 12, and are there any overdue tasks blocking the release?" — The AI provides targeted metrics and actionable information.',
              'Vague: "Help with assignments." — The AI does not know which tasks or which team members you mean.',
              'Specific: "Suggest assignments for the 5 unassigned tasks on the Payment Board, considering current workloads." — The AI can provide concrete, useful recommendations.',
            ],
          },
          {
            type: 'heading',
            text: 'Use Slash Commands for Structured Output',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'When you want a specific type of analysis, use the slash commands (/assign, /sprint, /performance) rather than asking free-form questions. Slash commands trigger pre-defined analysis workflows that produce consistently formatted, comprehensive outputs. They are the most reliable way to get structured data from the AI.',
          },
          {
            type: 'heading',
            text: 'Choose the Right Mode',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Use Fast mode for: quick status checks, simple questions, task lookups, basic commands, and anything where speed matters more than depth',
              'Use Thinking mode for: complex multi-factor analysis, sprint planning discussions, deep performance evaluations, trend analysis across multiple sprints, and questions that require weighing trade-offs',
              'Rule of thumb: if you can answer the question in one sentence, use Fast mode. If it requires a paragraph or more, consider Thinking mode.',
            ],
          },
          {
            type: 'heading',
            text: 'How Context Works',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The AI automatically loads your workspace data before generating a response. This means it knows about your boards, tasks, team members, and sprints without you needing to explain them. However, the AI does not know about things outside AgileFlow — external tools, private conversations, company policies, or context that is not captured in your task data. If the AI needs information that is not in AgileFlow, provide it in your message.',
          },
          {
            type: 'heading',
            text: 'Iterate and Follow Up',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Do not treat AI interactions as one-shot queries. The best results come from conversation — ask an initial question, review the response, and then follow up with clarifying or deepening questions. The AI maintains context within a session, so each follow-up builds on what came before.',
          },
          {
            type: 'list',
            items: [
              'Start broad: "How is the team performing this sprint?"',
              'Narrow down: "Tell me more about the stuck tasks you mentioned."',
              'Get actionable: "What do you suggest we do about the blocked items?"',
              'Validate: "Would reassigning the API task to Jendawy help unblock things?"',
            ],
          },
          {
            type: 'heading',
            text: 'Limitations to Keep in Mind',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'The AI can only see data that exists in AgileFlow. If tasks are tracked in other tools, the AI cannot factor them in.',
              'AI suggestions are recommendations, not decisions. Always apply human judgment before acting on AI output, especially for assignments and sprint planning.',
              'The AI does not have real-time awareness of changes happening while you are chatting. If you update tasks mid-conversation, the AI may reference stale data until you start a new message.',
              'Complex calculations or very large datasets may occasionally produce approximate rather than exact numbers. Verify critical metrics manually if precision matters.',
              'The AI does not remember conversations between separate sessions. Each new session starts with a fresh context (though it always has access to your current workspace data).',
            ],
          },
          {
            type: 'tip',
            text: 'Treat the AI as a knowledgeable colleague, not an authority. It is excellent at summarizing data, identifying patterns, and suggesting options, but it does not understand the full context of your team dynamics, organizational politics, or domain-specific nuances that affect real-world decisions.',
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
    description: 'Manage your team, roles, permissions, and communication',
    icon: 'Users',
    articles: [
      {
        id: 'inviting-members',
        title: 'Inviting Team Members',
        description: 'Add people to your workspace with email invitations and role selection',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow is designed for team collaboration, and the first step is getting your teammates onto the platform. The invitation process is straightforward — you invite people by email, select their role, and they create an account to join your workspace.',
          },
          {
            type: 'heading',
            text: 'How to Invite a Team Member',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Navigate to the Admin panel (accessible from the sidebar if you have Admin privileges).',
              'Click the "Invite Members" or "Invite" button.',
              'Enter the email address of the person you want to invite.',
              'Select a role for the new member — either Member (default, full create/edit access) or Admin (full access plus user management).',
              'Click "Send Invite" to send the invitation.',
            ],
          },
          {
            type: 'heading',
            text: 'What Happens After Inviting',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'When you send an invitation, the invited person receives instructions to create an account on AgileFlow using the email address you specified. Once they sign up, they automatically join your workspace with the role you selected.',
          },
          {
            type: 'list',
            items: [
              'The invited person must create an account using the exact email address that was invited',
              'Their assigned role (Member or Admin) takes effect immediately upon account creation',
              'New members are automatically set to the "Member" role if no specific role is selected during invitation',
              'They can immediately see shared boards, tasks, and events after signing in',
              'Their auto-generated avatar (initials with a unique color) appears in people columns and team lists',
            ],
          },
          {
            type: 'heading',
            text: 'Managing Invitations',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Admin panel shows the status of all team members and allows you to manage the roster. You can search for specific members, filter by role, and update roles or information as your team evolves.',
          },
          {
            type: 'tip',
            text: 'Invite team members with the "Member" role by default. This gives them full ability to create boards, manage tasks, and collaborate without the risk of accidental administrative changes. Upgrade to Admin only for people who need to manage users and workspace settings.',
          },
          {
            type: 'warning',
            text: 'Only Admins can invite new members and manage roles. If you are a Member or Viewer, you will not see the invitation options. Ask your workspace Admin to add new teammates.',
          },
        ],
      },
      {
        id: 'roles-permissions',
        title: 'Roles & Permissions',
        description: 'Understand what Admins, Members, and Viewers can and cannot do',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow uses a role-based access control system with three roles: Admin, Member, and Viewer. Each role has a clearly defined set of capabilities, ensuring that people have exactly the level of access they need. Understanding these roles is important for workspace security and smooth collaboration.',
          },
          {
            type: 'heading',
            text: 'Admin Role',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Admins have full, unrestricted access to every feature in AgileFlow. They are the workspace owners and managers who oversee the team, configure settings, and maintain the platform.',
          },
          {
            type: 'list',
            items: [
              'Can create, edit, and delete boards, tasks, groups, and columns',
              'Can create, edit, and delete calendar events',
              'Can drag and drop tasks in Kanban view and reorder items in table view',
              'Can access and use the AI assistant with all commands',
              'Can view all analytics at workspace and board level',
              'Can access the Admin panel for user management',
              'Can invite new team members and select their roles',
              'Can edit other users\' profiles — change names, roles, and departments',
              'Can reset other users\' passwords',
              'Can manage workspace-wide settings and preferences',
              'Can see admin-specific statistics: Total Members, Admins, Members, Active This Week',
            ],
          },
          {
            type: 'heading',
            text: 'Member Role',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Members are the standard role for active team contributors. They can do everything needed for daily project work but cannot manage other users or access administrative features. This is the default role for newly invited team members.',
          },
          {
            type: 'list',
            items: [
              'Can create, edit, and delete boards, tasks, groups, and columns',
              'Can create, edit, and delete calendar events',
              'Can drag and drop tasks in Kanban view and reorder items in table view',
              'Can access and use the AI assistant with all commands',
              'Can view analytics at workspace and board level',
              'Can edit their own profile settings and preferences',
              'Cannot access the Admin panel',
              'Cannot invite new members or manage other users\' roles',
              'Cannot reset other users\' passwords',
              'Cannot modify workspace-level administrative settings',
            ],
          },
          {
            type: 'heading',
            text: 'Viewer Role',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Viewers have read-only access to the workspace. They can see boards, tasks, calendar events, and analytics, but they cannot create, edit, or modify anything. This role is ideal for stakeholders, clients, or anyone who needs visibility without the ability to make changes.',
          },
          {
            type: 'list',
            items: [
              'Can view boards, tasks, groups, and columns in read-only mode',
              'Can view calendar events but cannot create, edit, or delete them',
              'Can view analytics at workspace and board level',
              'Cannot create, edit, or delete boards, tasks, groups, or columns',
              'Cannot drag and drop tasks — Kanban drag is disabled for Viewers',
              'Cannot add items — the "+ Add Item" button is hidden or disabled',
              'Cannot modify any cell values in the table view',
              'Cannot access the Admin panel or manage users',
              'Can edit only their own profile settings',
            ],
          },
          {
            type: 'heading',
            text: 'Changing Roles',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Only an Admin can change user roles.',
              'Go to the Admin panel from the sidebar.',
              'Find the user whose role you want to change (use the search or filter by role).',
              'Click "Edit" on that user\'s entry.',
              'Select the new role from the role dropdown.',
              'Save the changes. The new role takes effect immediately.',
            ],
          },
          {
            type: 'warning',
            text: 'Be cautious when assigning the Admin role. Admins can manage all users, reset passwords, and make workspace-wide changes. Only give Admin access to people who genuinely need administrative capabilities.',
          },
          {
            type: 'tip',
            text: 'Use the Viewer role for external stakeholders who need to monitor progress without making changes. It provides full visibility while ensuring they cannot accidentally modify tasks, move items, or disrupt the team\'s workflow.',
          },
        ],
      },
      {
        id: 'permission-enforcement',
        title: 'Permission Enforcement',
        description: 'How permissions affect the user interface and what controls are shown or hidden',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow does not just check permissions on the server — it enforces them visually in the user interface. When a user lacks permission to perform an action, the corresponding button, control, or interaction is either hidden entirely or displayed in a disabled state. This approach prevents confusion and accidental actions by making the available actions clear at a glance.',
          },
          {
            type: 'heading',
            text: 'Board and Task Permissions',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The board is where permission differences are most visible. Admins and Members see a fully interactive board with editable cells, add buttons, and delete controls. Viewers see the same data but in a read-only presentation.',
          },
          {
            type: 'list',
            items: [
              'Admins and Members: clickable cells, editable fields, "+ Add Item" buttons, delete icons, drag handles on rows',
              'Viewers: cells display data but do not respond to clicks, no add/edit/delete buttons appear, cursor does not change to indicate editability',
            ],
          },
          {
            type: 'heading',
            text: 'Kanban Drag-and-Drop',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'In Kanban view, permission enforcement is particularly important because drag-and-drop is the primary interaction method. Moving a card between columns changes the task\'s status, which is a data modification.',
          },
          {
            type: 'list',
            items: [
              'Admins and Members: cards are draggable. Grab a card and move it between columns to change its status, priority, or assignment.',
              'Viewers: cards are not draggable. The drag handle does not appear, and attempting to drag does nothing. Cards are static and informational only.',
            ],
          },
          {
            type: 'heading',
            text: 'Calendar Permissions',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Admins and Members: can click dates to create events, can click events to edit or delete them, see the "+ New Event" button',
              'Viewers: can view events on the calendar and see event details, but cannot create, edit, or delete events. Creation controls are hidden.',
            ],
          },
          {
            type: 'heading',
            text: 'Settings and Admin Panel',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'All roles: can access Settings and edit their own profile, notification preferences, and theme',
              'Admins only: can access the Admin panel, see user management controls, invite members, edit other users, and reset passwords',
              'Members and Viewers: the Admin panel link is not visible in the sidebar navigation',
            ],
          },
          {
            type: 'heading',
            text: 'Analytics and AI',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Analytics and AI features are available to all roles. Viewing analytics and asking the AI assistant questions does not modify data, so there is no permission restriction. All users can view charts, run AI commands, and access the AI Chat page regardless of their role.',
          },
          {
            type: 'tip',
            text: 'If you are a Viewer and need to make a change (like updating a task status or creating an event), ask your workspace Admin to upgrade your role to Member. Role changes take effect immediately.',
          },
        ],
      },
      {
        id: 'activity-tracking',
        title: 'Activity Tracking',
        description: 'Monitor what is happening across your workspace and who made changes',
        content: [
          {
            type: 'paragraph',
            text: 'Activity tracking in AgileFlow provides a record of what is happening across your workspace. It answers the questions "who did what, and when?" which is essential for accountability, coordination, and understanding how your projects are evolving. Activity data appears in several places throughout the application.',
          },
          {
            type: 'heading',
            text: 'What Gets Tracked',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Task creation — when a new task is added to a board, including who created it',
              'Status changes — when a task moves between statuses (e.g., from "Working" to "Done")',
              'Assignment changes — when a task is assigned or reassigned to a team member',
              'Task updates — edits to priority, due date, description, and other fields',
              'Board creation and updates — new boards, name changes, and configuration updates',
              'Calendar events — creation, modification, and deletion of events',
              'Sprint activity — sprint creation, items added/removed, sprint start/completion',
            ],
          },
          {
            type: 'heading',
            text: 'Where to View Activity',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Dashboard — the activity feed on the Dashboard shows recent activity across all your boards, providing a workspace-wide timeline',
              'Board Analytics — the analytics panel within a board shows activity specific to that project, including task movements and completion events',
              'Admin Panel — admins can view activity statistics including "Active This Week" counts and user-level activity summaries',
            ],
          },
          {
            type: 'heading',
            text: 'Timestamps and User Attribution',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Every tracked activity includes a timestamp (when it happened) and user attribution (who did it). This combination lets you reconstruct the timeline of changes to any task or project. Timestamps are displayed relative to the current time for recent activity (e.g., "2 hours ago") and as full dates for older activity.',
          },
          {
            type: 'heading',
            text: 'Using Activity Data for Accountability',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Activity tracking creates transparency. When everyone can see who is working on what and when changes happen, it naturally encourages ownership and follow-through. Team members know their contributions are visible, and managers can verify progress without micromanaging.',
          },
          {
            type: 'list',
            items: [
              'Review the Dashboard activity feed during standups to catch up on overnight progress',
              'Check board analytics before one-on-one meetings to understand a team member\'s recent work',
              'Use Admin panel activity statistics to identify inactive users who may need onboarding help or re-engagement',
              'Reference activity timestamps when discussing timeline questions like "when was this task completed?"',
            ],
          },
          {
            type: 'tip',
            text: 'Activity tracking works best when the team consistently updates task statuses in AgileFlow. If work is done but statuses are not updated, the activity feed will not reflect reality. Encourage your team to update task statuses as part of their daily workflow.',
          },
        ],
      },
      {
        id: 'notifications',
        title: 'Notifications',
        description: 'Stay informed with real-time alerts for tasks, mentions, sprints, and more',
        content: [
          {
            type: 'paragraph',
            text: 'Notifications keep you informed about what is happening in your workspace without requiring you to constantly check every board and calendar. AgileFlow supports multiple notification types, each designed to alert you about different kinds of events. Effective notification management means you stay informed about important changes while avoiding notification fatigue.',
          },
          {
            type: 'heading',
            text: 'Notification Types',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow categorizes notifications into seven types, each with a distinct purpose and visual style.',
          },
          {
            type: 'list',
            items: [
              'Info — general informational updates about your workspace, such as system announcements or feature updates',
              'Success — positive confirmations that an action was completed, like a task being marked as Done or a sprint being completed',
              'Warning — alerts about potential issues that may need attention, such as approaching deadlines or capacity concerns',
              'Error — notifications about problems that require action, like failed operations or system errors',
              'Task — updates related to tasks you are involved with, including status changes, assignments, and due date modifications',
              'Mention — notifications when someone mentions you in a task description, comment, or discussion',
              'Sprint — sprint-related updates including sprint starts, sprint ends, items being added to or removed from sprints',
            ],
          },
          {
            type: 'heading',
            text: 'Accessing Notifications',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The notification center is accessible from the bell icon in the top navigation bar. When you have unread notifications, a badge appears on the bell showing the count of unread items.',
          },
          {
            type: 'steps',
            items: [
              'Click the bell icon in the top navigation bar.',
              'The notification panel opens, showing your recent notifications sorted by time.',
              'Unread notifications are visually distinct from read ones.',
              'Click on any notification to navigate to the relevant item (task, board, event, etc.).',
              'Click "Mark all as read" to clear the unread badge and mark everything as seen.',
            ],
          },
          {
            type: 'heading',
            text: 'Auto-Refresh',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Notifications refresh automatically every 30 seconds while you are using AgileFlow. This means you do not need to manually refresh the page to see new notifications — they appear in the notification panel and update the badge count automatically. If something important happens while you are working, you will see the badge update within half a minute.',
          },
          {
            type: 'heading',
            text: 'Click to Navigate',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Notifications are not just informational — they are actionable. Clicking on a notification navigates you directly to the relevant item. If you receive a notification about a task assignment, clicking it takes you to that board and highlights the task. If you receive a sprint notification, clicking it takes you to the sprint view. This makes notifications a fast way to jump to where action is needed.',
          },
          {
            type: 'heading',
            text: 'Configuring Notification Preferences',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'You can control which notifications you receive from Settings → Notifications. This is covered in detail in the "Notification Preferences" article under Settings. The key categories you can toggle include email notifications, task assignments, mentions, due date reminders, sprint updates, and daily digest emails.',
          },
          {
            type: 'tip',
            text: 'Keep Task and Mention notifications enabled at minimum. These are the most actionable notification types — they tell you when work is assigned to you and when someone needs your attention. You can safely disable Info and Success notifications if they feel too noisy.',
          },
          {
            type: 'warning',
            text: 'If you disable all notifications, you may miss important updates like task reassignments, deadline changes, or sprint completions. Review your notification settings periodically to make sure you are receiving the alerts that matter to your role.',
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
    description: 'Customize your profile, theme, notifications, privacy, and account',
    icon: 'Settings',
    articles: [
      {
        id: 'profile-settings',
        title: 'Profile Settings',
        description: 'Edit your name, job title, department, bio, and skills',
        content: [
          {
            type: 'paragraph',
            text: 'Your profile is how you appear to other team members throughout AgileFlow. When you are assigned to a task, mentioned in a conversation, or listed in team analytics, your profile information is what others see. A complete, accurate profile makes collaboration smoother because teammates can quickly identify who you are, what you do, and how to reach you.',
          },
          {
            type: 'heading',
            text: 'Accessing Profile Settings',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click "Settings" in the left sidebar navigation (or access it from the user dropdown menu at the bottom of the sidebar).',
              'The Settings page opens with the "Profile" tab selected by default.',
              'Edit any field and click "Save Changes" when you are done.',
            ],
          },
          {
            type: 'heading',
            text: 'Profile Fields',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Full Name — your display name throughout AgileFlow. This appears in task assignments, people columns, team lists, and activity feeds. Use your real name so teammates can identify you.',
              'Email — your email address associated with your account. This is used for sign-in and for notification emails. It is set during account creation.',
              'Job Title — your role or position (e.g., "Frontend Developer", "Product Manager", "Scrum Master"). Displayed in team views and helps others understand your function.',
              'Department — the team or department you belong to (e.g., "Engineering", "Design", "Product"). Useful for filtering and organizing team members across a larger organization.',
              'Bio — a brief description of yourself, your responsibilities, or your expertise. This is optional but helpful for new team members trying to understand who does what.',
              'Skills — tags representing your areas of expertise (e.g., "React", "Python", "UX Design", "Data Analysis"). Skills help the AI assistant make better task assignment recommendations and help team leads assign work to the right people.',
            ],
          },
          {
            type: 'heading',
            text: 'Auto-Generated Avatar',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow automatically generates a visual avatar for every user based on their initials and a unique color. For example, if your name is "Sarah Kim", your avatar will display "SK" on a distinct background color. This avatar appears everywhere your identity is shown — in people columns, task assignments, team lists, and the sidebar. The color is algorithmically assigned to be unique and consistent, so each team member gets a different color that never changes.',
          },
          {
            type: 'heading',
            text: 'Why Profile Matters for Collaboration',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'A complete profile is not just cosmetic — it directly impacts how effectively you collaborate. When the AI assistant considers task assignments via the /assign command, it factors in skills listed in profiles. When a teammate is trying to figure out who owns a specific domain area, job titles and departments help them find the right person. When new members join the team, profiles give them a quick orientation to who does what.',
          },
          {
            type: 'tip',
            text: 'Fill in your skills carefully. The AI assistant uses this information when generating task assignment suggestions. The more accurate your skills list, the better the AI recommendations will be for matching tasks to people.',
          },
        ],
      },
      {
        id: 'theme-appearance',
        title: 'Theme & Appearance',
        description: 'Switch between Light, Dark, and System theme modes',
        content: [
          {
            type: 'paragraph',
            text: 'AgileFlow supports three theme options to match your visual preference and working environment. Whether you prefer the crispness of light mode, the reduced eye strain of dark mode, or automatic matching with your operating system, AgileFlow adapts to you.',
          },
          {
            type: 'heading',
            text: 'Available Themes',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Light Mode — a bright, white-background interface with dark text. This is the default theme and works well in well-lit environments. Charts and color coding are most vivid in light mode.',
              'Dark Mode — a dark-background interface with light text. Reduces eye strain in low-light environments, reduces screen glare, and can save battery on OLED displays. All UI elements, charts, and color coding are adapted for dark backgrounds.',
              'System — automatically matches your operating system\'s theme preference. If your OS is set to dark mode, AgileFlow uses dark mode. If your OS is in light mode, AgileFlow uses light mode. It also switches automatically if your OS changes (e.g., on a schedule).',
            ],
          },
          {
            type: 'heading',
            text: 'Quick Toggle (Top Bar)',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The fastest way to switch between light and dark mode is the toggle icon in the top navigation bar. Look for the sun icon (when in dark mode) or moon icon (when in light mode). Clicking it instantly switches to the opposite theme.',
          },
          {
            type: 'steps',
            items: [
              'Locate the sun or moon icon in the top navigation bar (right side).',
              'Click the icon to toggle between light and dark mode.',
              'The theme changes immediately without a page reload.',
              'Your preference is saved and persists across sessions.',
            ],
          },
          {
            type: 'heading',
            text: 'Settings Page Option',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Go to Settings from the sidebar.',
              'Switch to the "Preferences" tab.',
              'Find the Theme or Appearance section.',
              'Select Light, Dark, or System from the available options.',
              'Save your changes.',
            ],
          },
          {
            type: 'paragraph',
            text: 'The Settings page is the only place where you can select the "System" option (auto-detect). The top bar quick toggle only switches between Light and Dark directly.',
          },
          {
            type: 'heading',
            text: 'Dark Mode Details',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Dark mode is not simply an inverted light mode — every component in AgileFlow has been designed with specific dark mode colors. Backgrounds use dark grays rather than pure black for comfortable readability. Text uses off-white rather than pure white to reduce contrast glare. Charts, badges, status indicators, and event colors are all adjusted to maintain visibility and aesthetics on dark backgrounds.',
          },
          {
            type: 'tip',
            text: 'If you work in varying lighting conditions throughout the day, use the "System" theme and set your operating system to switch between light and dark mode on a schedule. AgileFlow will follow automatically.',
          },
        ],
      },
      {
        id: 'notification-preferences',
        title: 'Notification Preferences',
        description: 'Control which notifications you receive and how they are delivered',
        content: [
          {
            type: 'paragraph',
            text: 'Notification preferences let you fine-tune which alerts you receive, helping you stay informed without being overwhelmed. AgileFlow offers granular control over each notification category so you can enable the ones that matter and disable the ones that do not.',
          },
          {
            type: 'heading',
            text: 'Accessing Notification Preferences',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Go to Settings from the sidebar.',
              'Switch to the "Notifications" tab.',
              'Toggle each notification category on or off.',
              'Save your changes.',
            ],
          },
          {
            type: 'heading',
            text: 'Notification Categories',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Each category can be independently enabled or disabled. Here is what each one controls:',
          },
          {
            type: 'list',
            items: [
              'Email Notifications — master toggle for all email-based alerts. When disabled, you only receive in-app notifications. When enabled, critical alerts are also sent to your email.',
              'Task Assignments — notifications when a task is assigned to you or when your assignment changes. This is one of the most important categories for active contributors.',
              'Mentions — alerts when someone mentions you by name in a task description, comment, or note. Mentions indicate that someone specifically needs your attention.',
              'Due Date Reminders — warnings when tasks assigned to you are approaching their due date or have become overdue. Helps you stay ahead of deadlines.',
              'Sprint Updates — notifications about sprint events: when a sprint starts, when items are added or removed, and when a sprint is completed.',
              'Daily Digest — a once-daily email summary of activity across your workspace. Useful if you prefer a single, comprehensive update rather than individual notifications throughout the day.',
            ],
          },
          {
            type: 'heading',
            text: 'Recommended Defaults',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The right configuration depends on your role and how you prefer to stay informed. Here are recommendations for common scenarios:',
          },
          {
            type: 'list',
            items: [
              'Active developers — enable Task Assignments, Mentions, and Due Date Reminders. These are directly actionable and relevant to daily work. Consider disabling the daily digest if you check AgileFlow regularly.',
              'Team leads and managers — enable all categories. You need visibility into sprint changes, team assignments, and overall activity.',
              'Stakeholders and Viewers — enable Daily Digest and Sprint Updates. This provides a summary view without the noise of individual task notifications.',
              'Everyone — keep Mentions enabled. When someone mentions you by name, it means they specifically need your attention, and missing it can block their work.',
            ],
          },
          {
            type: 'tip',
            text: 'Start with most notifications enabled and turn off categories that feel noisy over time. It is better to receive a few extra notifications at first than to miss important updates because something was disabled.',
          },
        ],
      },
      {
        id: 'privacy-settings',
        title: 'Privacy Settings',
        description: 'Control your visibility, profile exposure, and activity tracking preferences',
        content: [
          {
            type: 'paragraph',
            text: 'Privacy settings give you control over how much of your information is visible to other team members and what is tracked about your activity. While AgileFlow is a collaborative tool where some visibility is necessary for teamwork, these settings let you adjust the balance between transparency and personal privacy.',
          },
          {
            type: 'heading',
            text: 'Accessing Privacy Settings',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Go to Settings from the sidebar.',
              'Switch to the "Privacy" tab.',
              'Adjust each privacy control as desired.',
              'Save your changes.',
            ],
          },
          {
            type: 'heading',
            text: 'Profile Visibility Levels',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Your profile visibility determines who can see your full profile details (bio, skills, department, job title). The three levels offer progressively more privacy.',
          },
          {
            type: 'list',
            items: [
              'Public — your full profile is visible to everyone in the workspace. Anyone can see your bio, skills, job title, and department. Best for open, transparent teams.',
              'Team — your full profile is visible only to members of your workspace. This is functionally similar to Public in most single-workspace setups but provides a conceptual boundary.',
              'Private — only your name and avatar are visible to others. Your bio, skills, and other details are hidden. Use this if you prefer minimal exposure.',
            ],
          },
          {
            type: 'heading',
            text: 'Show Email Toggle',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'This toggle controls whether your email address is visible to other team members. When enabled, teammates can see your email in your profile. When disabled, your email is hidden and only you (and Admins) can see it.',
          },
          {
            type: 'paragraph',
            text: 'Consider keeping this enabled if your team communicates via email frequently, or disable it if you prefer that teammates reach out through AgileFlow rather than direct email.',
          },
          {
            type: 'heading',
            text: 'Activity Tracking Toggle',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Activity Tracking toggle controls whether your actions in AgileFlow are visible in activity feeds. When enabled, actions like completing a task, updating a status, or creating an event appear in the Dashboard activity feed and board analytics. When disabled, your actions are still recorded for system purposes but are not displayed in public-facing activity feeds.',
          },
          {
            type: 'paragraph',
            text: 'Most team members should keep this enabled because activity visibility is important for team coordination. Disabling it means teammates cannot easily see your recent contributions, which can lead to miscommunication about who is working on what.',
          },
          {
            type: 'tip',
            text: 'In most team settings, the default privacy levels (Public visibility, email shown, activity tracking on) work well. Only adjust these if you have a specific reason to restrict visibility. Excessive privacy settings can actually hinder collaboration.',
          },
        ],
      },
      {
        id: 'account-management',
        title: 'Account Management',
        description: 'Manage passwords, sessions, and account security',
        content: [
          {
            type: 'paragraph',
            text: 'Account management covers the administrative aspects of your AgileFlow account — your password, active sessions, and security settings. Keeping your account secure is important because your AgileFlow workspace may contain sensitive project information, team data, and business-critical tasks.',
          },
          {
            type: 'heading',
            text: 'Password Management',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow uses Supabase Authentication for secure credential management. Your password is never stored in plain text — it is cryptographically hashed and verified through Supabase\'s auth service.',
          },
          {
            type: 'list',
            items: [
              'To reset your own password, use the "Forgot Password" link on the login page. You will receive an email with a password reset link.',
              'Admins can trigger a password reset for any team member from the Admin panel. This is useful when someone is locked out of their account.',
              'Choose a strong password — at least 8 characters with a mix of letters, numbers, and special characters.',
            ],
          },
          {
            type: 'heading',
            text: 'Session Management',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow maintains an active session after you sign in, so you do not need to log in every time you visit the application. Sessions persist through browser cookies managed by Supabase. If you sign in on multiple devices or browsers, each one maintains its own session.',
          },
          {
            type: 'heading',
            text: 'Signing Out',
            level: 2,
          },
          {
            type: 'steps',
            items: [
              'Click on the user dropdown menu at the bottom of the left sidebar.',
              'Click "Sign Out" or "Logout".',
              'Your session is terminated and you are redirected to the login page.',
              'To access AgileFlow again, you will need to sign in with your email and password.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Signing out invalidates your current session token. If you are signed in on other devices, those sessions remain active. To sign out everywhere, you would need to sign out on each device individually.',
          },
          {
            type: 'heading',
            text: 'Account Security Best Practices',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Use a unique password for AgileFlow — do not reuse passwords from other services',
              'If you suspect your account has been compromised, reset your password immediately using the login page "Forgot Password" feature',
              'Sign out when using shared or public computers',
              'Keep your email address up to date — it is used for password resets and notification delivery',
              'If you are an Admin, regularly review the team roster in the Admin panel and remove accounts that are no longer needed',
              'Report any suspicious activity (unexpected notifications, tasks you did not create, settings changes you did not make) to your workspace Admin immediately',
            ],
          },
          {
            type: 'warning',
            text: 'If you lose access to the email address associated with your AgileFlow account, contact your workspace Admin. They can reset your password from the Admin panel, allowing you to regain access.',
          },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 10. TROUBLESHOOTING & FAQ
  // ─────────────────────────────────────────────
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & FAQ',
    description: 'Solve common issues, find answers to frequent questions, and learn best practices',
    icon: 'HelpCircle',
    articles: [
      {
        id: 'common-issues',
        title: 'Common Issues',
        description: 'Solutions for frequently encountered problems in AgileFlow',
        content: [
          {
            type: 'paragraph',
            text: 'Most issues in AgileFlow have straightforward solutions. This guide covers the problems users encounter most frequently, along with step-by-step troubleshooting for each one. If your issue is not listed here, check the FAQ section or reach out to your workspace Admin.',
          },
          {
            type: 'heading',
            text: 'Board Not Loading',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'If a board is not loading or showing a blank screen, the issue is usually related to network connectivity, browser cache, or a temporary server issue.',
          },
          {
            type: 'steps',
            items: [
              'Refresh the page using your browser\'s refresh button or pressing F5 (Ctrl+R on Windows, Cmd+R on Mac).',
              'Check your internet connection — try loading another website to confirm connectivity.',
              'Clear your browser cache: go to browser settings → clear browsing data → clear cached images and files.',
              'Try a different browser to rule out browser-specific issues.',
              'If the issue persists, the AgileFlow server may be experiencing temporary downtime. Wait a few minutes and try again.',
            ],
          },
          {
            type: 'heading',
            text: 'Tasks Not Saving',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'If you edit a task and the changes do not persist after refreshing, the issue is typically a network interruption or a permissions problem.',
          },
          {
            type: 'steps',
            items: [
              'Check your internet connection — changes require an active connection to save to the server.',
              'Verify your role — if you are a Viewer, you cannot save changes. Ask an Admin to check your role.',
              'Look for error messages — toast notifications or console messages may indicate what went wrong.',
              'Try making the change again. If it fails repeatedly, clear your browser cache and sign in again.',
              'Check if other users are experiencing the same issue — it may be a server-side problem.',
            ],
          },
          {
            type: 'heading',
            text: 'Drag and Drop Not Working',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'If you cannot drag tasks in Kanban view or reorder items in table view, the most common cause is a permissions issue.',
          },
          {
            type: 'list',
            items: [
              'Check your role — Viewers cannot drag and drop. The drag handle will not appear for users with the Viewer role. Ask an Admin to upgrade you to Member if you need edit access.',
              'Ensure you are clicking and holding the drag handle (the grip icon), not just clicking the card body.',
              'Try refreshing the page — occasionally, the drag-and-drop library needs a fresh page load to initialize correctly.',
              'If drag works in some columns but not others, check if the target column has any restrictions or if the board has reached a column limit.',
              'Disable browser extensions temporarily — some ad blockers or accessibility extensions can interfere with drag-and-drop functionality.',
            ],
          },
          {
            type: 'heading',
            text: 'AI Assistant Not Responding',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'If the AI assistant does not generate a response, shows an error, or takes an unusually long time, several factors could be at play.',
          },
          {
            type: 'list',
            items: [
              'Wait a moment and try again — the AI model providers (Anthropic, Google, OpenAI) occasionally experience high load or temporary outages. The automatic fallback system will try alternative models.',
              'Check your internet connection — the AI requires an active connection to communicate with external model providers.',
              'Try switching between Fast and Thinking modes — if one mode is having issues, the other uses different models that may be available.',
              'If the response is stuck "generating" for more than 30 seconds, click the stop button and send your message again.',
              'Clear the chat and start a new session if the conversation has become very long — extremely long conversation histories can slow down AI responses.',
            ],
          },
          {
            type: 'heading',
            text: 'Calendar Events Not Appearing',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Make sure you are viewing the correct month — use the navigation arrows or "Today" button to return to the current month.',
              'Check the event date — the event may have been created for the wrong date. Look in the upcoming events list below the calendar for a chronological view.',
              'Refresh the page to ensure the latest data is loaded from the server.',
              'Verify that the event was actually saved — if your connection dropped during creation, the event may not have been saved. Try creating it again.',
              'Check your role — while Viewers can see events, permission issues in rare cases might affect visibility. Ask an Admin to verify.',
            ],
          },
          {
            type: 'tip',
            text: 'When troubleshooting any issue, always check your browser\'s developer console (F12 → Console tab) for error messages. These messages provide technical details that can help identify the root cause and are useful if you need to escalate the issue.',
          },
        ],
      },
      {
        id: 'faq',
        title: 'Frequently Asked Questions',
        description: 'Answers to the most commonly asked questions about AgileFlow',
        content: [
          {
            type: 'paragraph',
            text: 'This section answers questions that AgileFlow users ask most frequently. If your question is not covered here, try asking the AI assistant — it has access to your workspace context and can provide personalized answers.',
          },
          {
            type: 'heading',
            text: 'Can I change my email address?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Your email address is tied to your Supabase authentication account and serves as your login credential. Changing it is not supported through the AgileFlow interface directly. If you need to change your email, contact your workspace Admin to discuss options, which may involve creating a new account with the new email and transferring your data.',
          },
          {
            type: 'heading',
            text: 'How do I delete my account?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Account deletion is managed at the administrative level. Contact your workspace Admin to request account removal. They can remove your user record from the Admin panel. Note that tasks you created and any activity history associated with your account will remain in the workspace after deletion to maintain data integrity for the team.',
          },
          {
            type: 'heading',
            text: 'How do I export my data?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow does not currently have a built-in data export feature. However, you can use the board views to copy data manually, or ask the AI assistant to summarize your data in a format that can be pasted into a spreadsheet or document. For larger exports, workspace Admins with database access can export data directly from the Supabase dashboard.',
          },
          {
            type: 'heading',
            text: 'Can multiple people edit the same board at the same time?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Yes, multiple team members can work on the same board simultaneously. Each person\'s changes are saved to the server independently. However, AgileFlow does not support real-time collaborative editing (like Google Docs) — changes made by one user do not appear instantly on another user\'s screen. You may need to refresh the page to see changes made by teammates. Data conflicts are rare because tasks are updated at the cell level, and it is uncommon for two people to edit the exact same cell at the exact same time.',
          },
          {
            type: 'heading',
            text: 'Is my data secure?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow takes security seriously. Your data is stored in a Supabase-managed PostgreSQL database with Row Level Security (RLS) policies that ensure users can only access data within their own workspace. Authentication is handled through Supabase Auth with encrypted password storage. All communication between your browser and the server uses HTTPS encryption. AI requests are sent to third-party providers (Anthropic, Google, OpenAI) over encrypted connections and are not stored or used for model training.',
          },
          {
            type: 'heading',
            text: 'What happens when a sprint ends?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'When a sprint is completed, tasks that were marked as "Done" during the sprint are recorded as completed. Tasks that were not finished can be carried over to the next sprint. Sprint analytics (velocity, burndown, completion rate) are calculated and stored, becoming part of your team\'s historical data. The sprint remains viewable in your sprint history for reference and analytics purposes. You can then create a new sprint and pull items from the backlog.',
          },
          {
            type: 'heading',
            text: 'How do I change someone\'s role?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Only Admins can change user roles. To change someone\'s role, go to the Admin panel, find the user (use search or filter by current role), click "Edit" on their entry, select the new role from the dropdown, and save. The change takes effect immediately — the user\'s interface updates to reflect their new permissions the next time they load a page or navigate within AgileFlow.',
          },
          {
            type: 'heading',
            text: 'Why can I not see the Admin panel?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The Admin panel is only visible to users with the Admin role. If you need Admin access, ask a current Admin in your workspace to upgrade your role. If no one in your workspace has Admin access (which can happen if the original Admin\'s account was deleted), you will need to access the Supabase dashboard directly to modify user roles at the database level.',
          },
          {
            type: 'heading',
            text: 'How do I create recurring events?',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'AgileFlow does not currently support automatically recurring events. For ceremonies that repeat every sprint (standups, planning, retrospectives), you need to create each event individually. A practical approach is to create all events for a sprint period at once during sprint planning, so they are on the calendar for the entire sprint duration.',
          },
          {
            type: 'tip',
            text: 'If you have a question that is not covered here, try asking the AI assistant. Type your question in the AI Chat page or floating panel, and the AI will provide an answer based on your workspace context and AgileFlow\'s capabilities.',
          },
        ],
      },
      {
        id: 'tips-best-practices',
        title: 'Tips & Best Practices',
        description: 'Practical advice for getting the most out of AgileFlow',
        content: [
          {
            type: 'paragraph',
            text: 'After using AgileFlow for a while, patterns emerge around what works well and what does not. This collection of best practices is based on common workflows and team configurations. Following these recommendations will help you and your team get more value out of the platform.',
          },
          {
            type: 'heading',
            text: 'Board Naming Conventions',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'Consistent board naming makes it easier to find projects and understand their purpose at a glance. Adopt a naming convention that works for your team and enforce it.',
          },
          {
            type: 'list',
            items: [
              'Include the project or product name: "AgileFlow — Frontend" rather than just "Frontend"',
              'Add the phase or sprint if applicable: "Payment Module — Sprint 14" or "Mobile App — Design Phase"',
              'Use prefixes for board types: "[Active]", "[Backlog]", "[Archive]" to distinguish between current and historical boards',
              'Keep names concise but descriptive — long names get truncated in the sidebar and board lists',
              'Avoid generic names like "Tasks", "Board 1", or "New Board" that do not convey any meaning',
            ],
          },
          {
            type: 'heading',
            text: 'Column Setup Recommendations',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'The columns you add to a board define what information you track for each task. The right column setup depends on your workflow, but here are proven configurations for common scenarios.',
          },
          {
            type: 'list',
            items: [
              'Minimum viable setup: Status, Priority, People (Assignee), Date (Due Date) — these four columns cover 80% of task tracking needs',
              'Development teams: add Tags (for labels like "Bug", "Feature", "Tech Debt"), Number (for story points), and Timeline (for start/end dates)',
              'Design teams: add Dropdown (for design stage: Wireframe, Mockup, Prototype, Final), Text (for design tool links), and Checkbox (for approval status)',
              'Project management: add Budget (for cost tracking), Number (for hours estimated), and Text (for notes or blockers)',
              'Avoid adding too many columns upfront — start lean and add columns as needs emerge. Unused columns create clutter.',
            ],
          },
          {
            type: 'heading',
            text: 'When to Use Each View',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Table View — best for data-heavy work: entering details, bulk updates, filtering, and sorting. Use it for sprint planning and backlog grooming where you need to see and edit many fields at once.',
              'Kanban View — best for workflow visualization: daily standups, tracking work-in-progress, and spotting bottlenecks. Use it when the primary concern is "what status is everything in?"',
              'Calendar View — best for timeline awareness: seeing when tasks are due, avoiding scheduling conflicts, and planning around deadlines. Use it when the primary concern is "when is everything happening?"',
              'Timeline View — best for project planning: understanding task duration, dependencies, and parallel work streams. Use it when planning multi-week efforts or coordinating across teams.',
            ],
          },
          {
            type: 'heading',
            text: 'Sprint Planning Tips',
            level: 2,
          },
          {
            type: 'list',
            items: [
              'Use velocity data from the last 3-5 sprints to determine how much work to commit to. Do not rely on optimistic estimates.',
              'Leave 10-20% capacity buffer for unplanned work, bug fixes, and meetings. Never plan at 100% capacity.',
              'Prioritize ruthlessly — if everything is high priority, nothing is. Ensure the sprint has a clear goal with a few must-do items and several nice-to-have items.',
              'Break large tasks into smaller ones. Tasks that take longer than 2-3 days are harder to track and more likely to slip.',
              'Run the /sprint AI command before your planning meeting to get data-informed suggestions as a starting point.',
              'Review the burndown chart mid-sprint to assess whether you are on track and make adjustments early rather than at the last minute.',
            ],
          },
          {
            type: 'heading',
            text: 'Backlog Grooming Schedule',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'A well-maintained backlog is essential for effective sprint planning. Without regular grooming, the backlog becomes a dumping ground of outdated, vague, and conflicting items that slow down planning sessions.',
          },
          {
            type: 'list',
            items: [
              'Schedule a backlog grooming session once per sprint (or every two weeks for longer sprints)',
              'During grooming: review top items for clarity, add or update story point estimates, remove items that are no longer relevant, and re-prioritize based on current goals',
              'Keep the backlog ordered — the top items should be ready for the next sprint (clear description, estimated, and prioritized)',
              'Items below the top 2-3 sprints worth of work can be less refined. Do not waste time detailing items you will not work on for months.',
              'Use the AI /sprint command to help identify which backlog items should be prioritized next',
            ],
          },
          {
            type: 'heading',
            text: 'Team Onboarding Checklist',
            level: 2,
          },
          {
            type: 'paragraph',
            text: 'When a new member joins your AgileFlow workspace, a structured onboarding process helps them get productive quickly. Share this checklist with new team members.',
          },
          {
            type: 'steps',
            items: [
              'Create your account using the email address your Admin invited.',
              'Complete your profile in Settings: add your name, job title, department, bio, and skills.',
              'Set your preferred theme (Light, Dark, or System) using the toggle in the top bar.',
              'Configure your notification preferences in Settings → Notifications.',
              'Explore the Dashboard to see an overview of the workspace, boards, and activity.',
              'Open each board you will be working on and familiarize yourself with the columns, groups, and tasks.',
              'Try switching between views (Table, Kanban, Calendar, Timeline) on a board to see how each one presents the data.',
              'Visit the Calendar page to see upcoming events and scheduled ceremonies.',
              'Open the AI Chat page from the sidebar and ask a question like "What are the current active sprints?" to test the AI assistant.',
              'Use Ctrl+K (or Cmd+K) to try the global search feature.',
            ],
          },
          {
            type: 'tip',
            text: 'The best way to learn AgileFlow is to use it daily. Start with the basics — check the Dashboard, update your task statuses, and review the calendar — and gradually explore advanced features like analytics, AI commands, and sprint planning as you become comfortable.',
          },
        ],
      },
    ],
  },