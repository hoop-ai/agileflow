
   1. ## **1.1. Identification of the need** 

Modern software development operates at high speed which creates major problems for engineering teams to maintain their alignment and visibility and operational efficiency. The success of projects depends heavily on their ability to handle task management and progress tracking and schedule coordination as projects become more complex. The industry needs an extensive project management solution which follows Agile principles through Scrum and Kanban to support continuous delivery and iterative improvement.

Development teams need a system which solves their essential operational needs:

1. **Real-time Visibility:** As with stakeholders, project members are required to have the ability to see the current status of a project immediately, in real-time. A dashboard that brings together key performance indicators, like the total number of boards, how many tasks have not yet been completed, and the total number of completed tasks into one centralized area is necessary in order to reduce the amount of time it takes for stakeholders/team members to assemble status updates through other means.  
2. **Structured Agile Workflow:** In order for teams to implement Agile best practices, teams require a single digital workspace in order to manage the full lifecycle of the Product. This digital workspace needs to include the ability to create and rank or prioritise "User Stories" from the backlog, to estimate efforts associated with a User Story using Story Points, and to structure work according to distinct Sprint cycles.  
3. **Collaboration Scheduling & Execution:** Teams require a common time frame to collaborate with one another for the purposes of milestone tracking, meeting scheduling, and deadline monitoring. Additionally, a shared visual tool that is designed for intuitive workflow, such as drag & drop completion of tasks and displaying task modifications across the team, is required to complete the phase of the execution cycle.  
4. **Data-Driven Process Improvement:** In order to maximise the velocity of the teams, teams require automated reports reflecting team-wide performance data. In order to identify areas where completion of tasks is lagging, and to enable managers to gauge how workloads are balanced, they need to be able to see data (displayed graphically) \- including distributions of task statuses and team board performance metrics; therefore enabling them to make data-driven factual-based decisions stemming from retrospective performance history.

Often, when using current product offerings, teams will need to resort to using different tools for the different ways they work, creating a disjointed workflow that can create the technical difficulties outlined in the next section of the article (which can be challenging for all parties). Therefore, the need for a combined and coordinated solution (AgileFlow) is recognized by all of those involved in software engineering areas because it will provide a "one-stop-shop" solution in a cohesive, fast-paced environment with an easy-to-navigate interface.

2. ## **1.2. Definition of the problem**

AgileFlow addresses a common technical problem in project-management environments: fragmented data spread across multiple tools that do not integrate consistently. Many organizations use separate platforms for task tracking, documentation, and scheduling, each with its own data model and API. This fragmentation weakens data integrity and makes it difficult to maintain a single trusted source of truth—especially for analytics, which requires consistent and up-to-date project data. AgileFlow reduces this fragmentation by routing application operations through a unified REST API backed by a centralized database. To keep data models consistent across layers, AgileFlow uses shared TypeScript types together with server-side runtime validation so that incoming request payloads are checked before persistence.

A second challenge is performance overhead caused by repeated full-page rendering and unnecessary data transfers. AgileFlow adopts a Single Page Application (SPA) approach with Client-Side Rendering (CSR) to minimize full-page reloads and support smooth UI interactions. Server-state caching and background refetching are handled by a dedicated client data layer (e.g., React Query), which reduces redundant API calls and improves perceived responsiveness. Authentication is implemented using signed JSON Web Tokens (JWTs), enabling stateless request verification on the backend for protected routes.

* **Solution Overview and Scoping:**

A) Functional Requirements (What to Do): This product needs to offer complete CRUD operations for essential Agile artifacts like Stories, Tasks, and Boards. It should also include integrated Analytics and Calendar features. Security will be handled using **JWT authentication.**

B) Performance Requirements (How Well to Perform): The system should provide a very responsive user experience (loading quickly, ideally in under 100ms), even when dealing with a large amount of data in the database.

C) Constraints (Limitations): Given our small staff and limited budget, design decisions should focus on sustainability over time. This means adhering to privacy laws and minimizing the adverse effects of automation through workforce education and skill enhancement. By supporting employee training and development.

1. ###     **1.2.1. Functional requirements**

The primary goal of the system is to provide a protected and modular front-end interface, using Client-Side Rendering (CSR), for managing all Agile-related items. This requires the application to perform CRUD operations (create, read, update, delete) on Project Boards, User Stories, and Tasks through designated **REST API** connections, with all data changes managed by a central **NoSQL Database**. The Product Backlog feature needs to facilitate the entry of new stories, including their categorization using Effort Estimates, Importance, and offer flexible filtering options to assist with Sprint Planning. Providing immediate visual feedback for the initiating user through optimistic UI updates, while ensuring server-side consistency via API confirmation and refresh strategies (e.g., cache invalidation and periodic refetching). Moreover, all requests to access or alter data must be protected by verifying a token using JWT-based authentication.

The second requirement is to offer useful decision-making assistance and efficient scheduling tools. The Analytics dashboard should use built-in calculations to generate and display up-to-date important performance metrics, including  Completion Percentage, Late Items, and Total Items. These metrics should be visually represented using **Recharts**. The Team Schedule feature should allow for the creation of appointments and the ability to sort them based on established categories like Group Discussions, Due Dates, and Evaluations, making sure dates are accurate and formatted correctly using **date-fns**. The whole user interface, created using **React** elements and designed with Tailwind CSS/shadcn/ui, should provide smooth transitions between the main sections (Overview, Task List, Data Insights) using **React**, offering a uniform and fast user experience.

2. ###     **1.2.2. Performance requirements**

The application’s performance is evaluated to ensure a responsive and usable experience under representative academic team conditions. The primary views (Dashboard and Backlog) shall become usable within a realistic web-performance target under typical network conditions. Interaction-level responsiveness shall remain high: UI actions such as drag-and-drop shall provide local feedback within 100 ms (optimistic UI), while the backend shall confirm updates within the response-time targets below.

The system shall support at least 15 simultaneous users performing common operations (creating stories, moving tasks, and updating task fields) without loss of data integrity. Cross-user consistency shall be achieved through API-driven refresh behavior; therefore, updates shall be visible to other users within the configured refresh/refetch interval or upon reloading the board view (depending on the chosen synchronization strategy).

Backend response-time targets are defined to keep the system usable at scale. The worst-case response time for generating analytics reports (e.g., completion summaries and sprint metrics) shall be at most 800 ms when tested with up to 1,000 active task records. Authentication checks shall add no more than 50 ms overhead per protected request under the same test conditions. Performance will be evaluated using recorded request timings (milliseconds) and measured client usability timing (seconds) according to the planned verification approach in Section 4.2

3. ###     **1.2.3. Constraints**

The project is challenged by both a tight deadline and a small team of four software engineers. The team must carefully prioritize tasks and cannot allocate resources to advanced or optional features, keeping attention strictly on the essential **Functional Requirements**.There is also an economic constraint, since the budget is very limited. This makes it necessary to rely on open-source libraries and low-cost hosting services to support the **NoSQL Database** and the **REST API**.

In addition, Industry Standards and Legal Regulations are major factors. The system must adhere to relevant industry guidelines and laws, particularly those related to data privacy. This limits data collection and demands strong security measures. As a result, the project incorporates robust protections through **JWT authentication** and secure user-management functions. Consequently, considerable development time must be dedicated to compliance rather than adding new features.

The project's long-term viability shows both benefits and drawbacks. Economically, it's largely beneficial: the digital format keeps production costs low, and it offers customers cost reductions by automating processes and improving efficiency. Environmentally, there's a concern about the energy used by the cloud servers hosting  the API and database. Socially, the project is beneficial, addressing the  need for workplace transparency and equity in task management. However, a key challenge is the potential impact of automation: by making project management easier, the tool could decrease the need for some administrative jobs. It's important to design the product in a way that encourages the development of new analytical and technical positions, rather than causing job losses.

3. ## **1.3. Conceptual solutions**

   1. ###     **1.3.1. Literature Review**

In recent years, there has been a paradigm shift noticed in the software development field, moving from conventional approaches like Waterfall to Agile methodologies. This is mainly because of the requirements of handling changeable consumer inputs, project complexity, and integration pressures. In most cases, conventional software development methods face challenges related to inflexibility and a lack of project vision towards the end of development. However, Agile software development methods like Scrum and Kanban have proved effective due to iterative development methods, which improve project flexibility (Gaborova et al., 2021). Nonetheless, there is a heavy dependency on appropriate management methods chosen depending on team size and organizational culture (Maden & Yücenur, 2025).

The current state of Agile project management solutions is quite divergent, ranging from simple solutions such as Trello to more complex, full-featured solutions such as Jira and MS Project. On review of each of the solutions, it has been found that there is a trade-off between usability and functionality. For example, although solutions such as Trello are highly commendable for their ease of use, they are often lacking in sophisticated reporting, whereas solutions such as Jira, having many capabilities, are not feasible for small teams and organizations implementing Agile, given their usability and price constraints (Milojević et al., 2023).

Furthermore, the scalability of Agile practices presents a significant challenge. Research indicates that scaling Agile adoption requires strong executive support and a structured approach to requirements management and planning (Jan et al., 2021). While overseeing massive projects or working with several teams requires the use of project management software not only for the purpose of following up with tasks but also for economic and financial data such as man-hours and project profit. Additionally, the psychological factor that pervades group collaboration within the context of the Agile approach should not be underestimated. This is because the software ought to facilitate reflective practice and the creation of a “cohesive framework” (Marder et al., 2021).

Although a plethora of solutions exist, a void still persists in a holistic approach that integrates the gap between task execution and high-level strategic planning phases. Most of these applications are designed to work in a vacuum, so teams are left to adopt multiple solutions separately for backlog management, real-time management, and analysis, making it difficult to reap the benefits of advanced technologies like Artificial Intelligence (AI) techniques that perform well in an integrated environment.

AgileFlow addresses the needs identified in the preceding sections by focusing on accessibility and interactivity as well as scalability. Many of the tools available today often work separately from each other to handle various aspects of the software development process. In contrast, AgileFlow proposes to provide an all-in-one solution in the form of a single interface for planning and tracking (Backlog), performing (Board), and reporting (Analytics) activities.

To achieve this, AgileFlow employs a Dashboard-centric architecture that allows users to access all modules within a single view, thus providing them with a single source of truth regarding the current state of a project. Moreover, this integrated platform is meant to remove any data silos cited in literature reviews in order to give proper KPI information to management engineers. By adding decision-making support capabilities to AgileFlow, this tool aims at striking a balance between ease of use and in-depth analysis that is a gap identified between execution and strategic management.

2. ###     **1.3.2. Concepts**

To address the defined problem, the team evaluated two primary conceptual approaches:

Concept 1: Native Desktop Application

o   A platform-specific app that gets installed directly onto the user's system(s). Essentially, this model means that the application uses the computing power of the user's computer and also has a separately developed version for each operating system (Windows, Mac OS X, and Linux).

 Concept 2: Web-Based Single Page Application (SPA)

o   A cloud-based application that is accessible through the user's web browser (via the internet). The SPA uses a single code base that is hosted on the cloud and provides users with the capability to work collaboratively in real-time without needing to install the application.

**Table 1\. Comparison of Conceptual Solutions**

| Consideration | Concept 1 (Desktop) | Concept 2 (Web SPA) |
| :---- | :---- | :---- |
| Cost | High (Requires multi-platform development) | Low (Single unified codebase) |
| Complexity | High (User installation & updates required) | Medium (Centralized deployment) |
| Performance | Very High (Native resources) | High (Virtual DOM optimization) |
| Accessibility | Low (Device specific) | High (Any browser, any OS) |

 

**Selection of Best Solution**

After careful consideration, the Team chose Concept \#2 (Web Based SPA) as the most effective option. It meets Remote Access requirement and provides Platform Independence; therefore, eliminating the need for Users to install anything on their Machines, and is especially useful for the various Development Teams.

The Selected Conceptual Resolution is based on three foundational Pillars:

1\.      Unified Workspace Architecture: AgileFlow utilizes a dashboard-style architecture, which allows Users to quickly and easily access all the different Modules through one common "view", thus ensuring there is only one source of "truth" for information.

2\.      Dynamic Visualization (Multi-View Approach): In light of the fact that no two Stakeholders will perceive the same information the same way, this Resolution offers the opportunity for Stakeholders to have multiple "views" of the same information. For example:

o   Kanban View: visualizes your work stage and your limits around how many Work in Progress items are in play.

o   Table/List View: provides a way to provide both detailed Data input and auditing of that Data.

o   Timeline/Calendar View: enables you to track Dependencies and Milestones associated with the Tasks that you are currently working on.

3\.      Responsive and Interactive User Experience: The use of React has enabled us to create a solution that allows Users to complete their Tasks by simply Drag and Dropping information onto the applicable area and receive real-time feedback (through the use of visual status indicators) without having to refresh the entire page.

	

**1.4  Software Architecture** 

Figure 1 details the structural design of **AgileFlow**, a cloud-native solution for Agile team coordination. The platform's foundation relies on a **React Single Page Application (SPA)** interface that communicates with a centralized **NoSQL database** through a unified **REST API**, which is protected by **JSON Web Tokens (JWT)**. This specific setup was engineered to fulfill the functional goals established in Sections 1.1–1.3: providing live oversight via **dashboard KPIs**, managing the **Agile workflow** (from **backlog** and **sprint** phases to final **execution**), coordinating team efforts through a **calendar/timeline**, and enabling empirical **process improvement** via **analytics and reporting**.

**Clients & CDN (Delivery Layer):** Handles how users engage with the software, supporting both the **React SPA** web interface and mobile-friendly layouts. To optimize performance, static **SPA assets, specifically** **JavaScript**, **CSS**, and **images** are distributed globally via a **CDN** using **HTTPS**. Meanwhile, verified **REST API** calls manage the flow of live project data. This strategy minimizes latency and allows for highly interactive UI elements, such as **drag-and-drop** task management and instantaneous **dashboard refreshes**.

**API Layer (Gateway \+ Authentication \+ Performance Support)** : Outlines how incoming traffic is managed through a primary **API Gateway** and its integrated **Authentication Middleware**. This section of the architecture acts as a traffic controller, verifying **JWTs** for any restricted pathways and ensuring that all interactions comply with established access rules before directing them to the appropriate destination. Performance is further bolstered by a caching mechanism potentially utilizing **Redis** to minimize redundant database queries and speed up system replies. Additionally, for system health tracking, these components transmit operational data and performance statistics to a dedicated **Logging & Monitoring** system.

**Functional Backend Components (Core Logic) :** The internal logic of **AgileFlow** is partitioned into distinct, independent units that correspond to the platform's primary features:

* **User & Role Service: A**uthentication context, user profiles, role-based access control (RBAC).   
* **Board & Project Service:** Board/project creation and workflow structure (columns, board settings).  
* **Backlog & Task Service:** Stories/tasks, priorities, story points, task status transitions.   
* **Sprint Management Service**: Sprint cycles, sprint planning, sprint progress tracking.   
* **Analytics & Reporting Service:** KPI aggregation (completion, late items, distributions, sprint metrics).   
* **Calendar & Event Service**: Deadlines, meetings, milestones for calendar/timeline views.  
* **AI Task Assignment Service:** Generates assignment suggestions using role/team context and performance indicators to support AI-based collaboration.

**Asynchronous processing (Event Bus support) :** To maintain a high-speed user experience, **AgileFlow** utilizes an **Event Bus** or **Message Broker** for **asynchronous processing**. This design ensures that resource-intensive background tasks, in particular **AI suggestions** and **analytics aggregation,** do not interfere with the responsiveness of the interface. When **domain events** occur, such as **sprint changes** or **task updates**, they are broadcast across the system. This allows the AI and reporting modules to process new information without hindering the primary **REST requests** that drive the user-facing application.

**Data Storage Layer (NoSQL \+ Cloud Storage):** The platform’s long-term information is managed through a **Data Storage Layer** consisting of a **NoSQL database cluster**, such as **MongoDB**, which can be expanded using **sharding (Shard 1–3)** for better scalability. While this centralized database keeps **core board/task documents** lean by holding only **metadata** and structural **references**, large-scale **binary files**, including **exported outputs** and **attachments** that are offloaded to **Cloud/Blob Storage** solutions like **Firebase Storage** or **AWS S3**. This architectural split ensures that primary project data remains highly accessible and efficient.

Here is the completely rephrased version of these process descriptions, ensuring zero plagiarism while maintaining the core **AgileFlow** technical logic and names:

* **Task Management (Drag & Drop)**: When a user moves a task card, the **SPA** immediately adjusts the interface through an optimistic update. Simultaneously, the browser transmits an authenticated **REST request**, secured by a **JWT**, to the **API Gateway**. The gateway then directs this traffic to the **Backlog & Task Service**, which confirms the change and records it within the **NoSQL database**. Finally, the client application performs a refetch to synchronize and show the officially stored state from the server.  
* **AI-Driven Assignments**: Upon the generation or modification of a task, the system broadcasts a domain event via the **Message Broker**. The **AI Task Assignment Service** picks up this event to calculate the best-suited team members, saving these recommendations for later use. The **frontend** then pulls these automated suggestions to display them within the planning screens or specific task information panels.  
* **File Attachments**: To add a file, the user initiates an upload which the backend directs to **Cloud Storage** for long-term persistence. While the actual file resides in the cloud, the associated metadata is logged in the **NoSQL database**. When a user inspects the task later, the client uses these stored references to generate the direct download or viewing link.

**![A diagram of a computer systemAI-generated content may be incorrect.][image1]**  
**Figure 1\.  Software Architecture for AgileFlow**

###    **1.4.1. Process diagram**

The process of working with AgileFlow will begin at the **StartOfSprint** event. This marks the beginning of the main workflow for the **SearchAndCreateStory** process. The role of the workflow will be to link **user requirements** to the **backlog** and determine what specific tasks need to be completed for a given story. From there, the backlog will be populated with stories that are created by the **Front End** when users interact with the Front end. Once the user creates a story, the system will then **estimate** it and make its **priority determination**. The **CriticalPriorityDecision node** is the first point of **filtering** for the stories. If a story is classified as a **high priority block** and must be acted upon no matter what, it will be sent back around through the **Prioritization loop**. This setup ensures that the two modules, **Prioritization and ReadinessCheck**, will serve as **gatekeepers** for the system to ensure that every user story has been successfully checked by a technical team member (as being **technically viable** and defined correctly) prior to being moved into the **Execution phase**. By assigning the **'readiness' logic** to a specific service, the system can **separate the different functions** of the stories, allowing only **'Ready' stories** to move through to then be acted upon.

Once a story has gone through the **ReadyForSprintDecision** phase, the data now transforms from a **planning stage** to an **execution phase**, with the primary focus being on the **SprintAction Module** and the **SystemAction Module**. In this use case, the **frontend** will send a **Ready signal** to the **Backend API**, which updates the status in the **database** and will trigger the **SystemAction**, which is an **automatic, background service** performing tasks related to the **deployment** of the Sprint Story or **logging** of specific Sprint Tasks. In the event that the ReadyForSprintDecision response is **negative**, the flow logic **routes the story back** to **SearchAndCreateStory** for additional refinements to eliminate any risk of **Technical Debt** entering into Sprint Attachments. This cycle only ends at the **EndOfProcess** for the record once the SystemAction responds back with a **Success confirmation**. This cycle of communication serves to create a strong **Data Integrity Check**, keeping the **Frontend and Backend in sync** throughout the lifespan of the Sprint Story.

![A diagram of a processAI-generated content may be incorrect.][image2]

**Figure 2\. Process Diagram for AgileFlow**
