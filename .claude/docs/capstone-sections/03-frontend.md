
AgileFlow consists of two core components: the frontend client (SPA) and backend data services (BDS), complemented by agile process and analytics subsystem.

## **3.1. Frontend Client Application**

The Frontend sub-system (SPA) is developed using React and TypeScript. It provides all of the user interface, state management, and interaction logic as described in the conceptual solution requirements.

### **3.1.1. Requirements**

**Behaviors of the Software Application:**

| Actor Name | Name of Behavior | Description of behavior |
| ----- | :---: | :---: |
|     User |     Drag & Drop Task | Users can instantly update a task card's status by dragging it between columns (like from "To Do" to "Done"). |
|   User |   Plan Sprint | Users can choose items from their backlog of user stories that will be included in the current sprint cycle. |
|     User |     Switch View | Users have the flexibility of viewing their data through the Kanban view, Table view, Timeline view, or Calendar view. |
|   System   |   Display Analytics   | The system will produce and display real-time graphs (Completion Rate, Velocity) by using recharts library |

 

  **Attributes of the Software Application**

| Actor Name | Name of Attribute | Description of Attribute |
| :---: | ----- | :---: |
|     User Story |     Story points | numerical values attributed to each requirement by developers to estimate how much effort they'll need to invest into completing that requirement. |
|   Task |   Priority level | indicates how urgent a particular task is classified into (e.g., Critical, High, Medium, Low). |
|   Board |   Visibility | Defines who has access to the Project Board (Private or Shared). |
|     User |     Theme Preference | Determined by the User preference on how they want their User Interface to appear (Light Mode or Dark Mode). |

 

**Performance Requirements**

·     	Response Time: Response time for dashboard metrics can be established by defining the maximum acceptable load time that would provide an ideal user experience for web applications.

Interactivity: To create a seamless user experience without noticeable lag and provide immediate visual feedback from the interface transitions and task movements (drag-and-drop), optimistic UI updates should be used.

  **Security Requirements**

·     	Unauthenticated Redirection: The application's user interface will automatically identify when an unauthenticated user attempts to reach the views of the application and redirect them to the login page to prevent accessing those views of the application without a valid context.

**Safety Requirements**

·     	Data Integrity: The form's input fields should verify that the entered values match the data types defined for the input field (i.e. date inputs should contain dates and number inputs should only contain numbers) before saving the record in the database. If a value does not meet the requirements, the database should not have records created that may eventually corrupt the database.

·     	Errors: If the API cannot be accessed, or if there is any issue with the user connecting to the API, the user should receive a message informing them of the problem and requesting they try again, rather than just having the browser "crash" with no communication as to what is happening.

**Business Rules**

·     	Role-Based Access Control (RBAC): All access to project boards will follow the defined RBAC policies for access. All users can only view and/or modify the resources for which they have official "Owner" or "Member" permissions.

·     	Sprint Logic Enforcement: The assignment of User Stories to Sprint Cycles marked "Completed" is prohibited in order to preserve the accuracy of historical velocity data.

### **3.1.2. Technologies and methods**

**Literature Survey on Frontend Architectures**

Modern approaches to web development advocate for a Single Page Application over traditional server-side rendering. SPAs are described in contemporary software development literature as follows: SPAs improve user experience by loading a single HTML document and using JavaScript APIs to dynamically change content. This significantly reduces transition times and, in turn, reduces server loads. Another widely cited approach to designing interfaces for scalable software models is Component-Based Architecture, which has become a standard for scalable design. This approach breaks down complex interfaces into separate, independent, and reusable units of code, known as components, that can enhance maintainability and facilitate isolation in automated tests.

**Software and Libraries**

On the basis of the above survey, the following are specific technologies that were chosen for implementation:

1\.  	 Core Architecture:

o   React: Chosen as the app’s core library because of its component model and efficient Virtual DOM operations.

o   TypeScript: Provides an additional layer of security through enforced static typing, allowing the developer to catch potential errors at compile time, leading to fewer problems during development, better maintainability, and overall fewer bugs.

2\.  	User Interface & Experience:

o   Tailwind CSS: Utilised for quick styling through utility classes, allowing the app to easily meet mobile-first responsive designs across multiple devices.

o   shadcn/ui: An accessibility-first library of pre-built interactive components like modals and dropdowns to ensure the app's design remains consistent across multiple platforms.

o   Framer Motion is an optional addition to the app that allows the developer to create complex animations and smooth transitions between layouts when using drag and drop features.

3\.  	State & Data Management:

o   React Query: The preferred choice for asynchronous server state management because it provides functions for caching, updating stale data, and synchronising data when the client and server are out of sync.

o   React Router is a specific choice used for client-side routing/navigation without reloading the web page (i.e., changing the URL) between pages.

4\.  	Data Visualization:

o   Recharts is a composed charting library that provides responsive chart displays for performance metrics and velocity graphs.

###     **3.1.3. Conceptualization**

**Actor Glossary**

The Frontend sub-system involves interaction with the following actors:

| Actor Name | Description |
| :---: | :---: |
| Team Member (user) | A normal authenticated user who can view boards, move tasks, and leave comments. |
|   Project Manager | A user with elevated permissions to create boards, configure settings, and finalize Sprint plans. |
|   System | The automated backend service that processes requests, validates tokens, and returns data. |

 

**Use-case Glossary**  
  The following use-cases define the core functionality of the Frontend Client:

| Use-case Name | Description | Participating Actors |
| :---: | :---: | :---: |
|   Authenticate | User logs in using credentials to access the dashboard. | User, System |
| Manage Board | User creates, edits, or deletes a project board. | Project Manager, System |
|   Execute Task | User updates task status via drag-and-drop or edits details. | Team Member, System |
|   Plan Sprint | User assigns backlog stories to an active sprint cycle. | Project Manager, System |
| View Analytics | User views real-time performance graphs. | Project Manager, System |

  **Use-case Scenarios**  
  Below is the detailed scenario for the Manage Sprint Backlog use-case, representing the core Agile planning functionality.

| Use-case Name | Manage Sprint Backlog |
| :---: | ----- |
| Use-case Description | A Project Manager organizes the backlog and assigns User Stories to a specific Sprint. |
| Actors | Project Manager, System |
| Pre-Condition | 1\. The user must be authenticated.      	 2\. A Project Board must exist. |
| Post-Condition | Selected stories are moved from "Backlog" to "Active Sprint" status in the database. |
|   Normal Flow | 1\. User navigates to the "Backlog" view of the specific board.  2\. User clicks "Create Story" and inputs details (Title, Points, Priority). 3\. System saves the story to the Backlog list.              4\. User selects multiple stories and clicks the "Plan Sprint" button. 5\. System validates that the total story points do not exceed Sprint capacity.                                                                6\. System moves stories to the "Active Sprint" column. |
|   Alternative Flow | Step 5a: Total points exceed capacity.     	1\. System displays a warning toast notification. 2\. User removes a story or overrides the warning. |

 

![][image10]

**Figure 5\. Manage Sprint Backlog Use-Case Diagram**

**Execute Task**

| Use-case Name | Execute Task (Drag & Drop) |
| :---: | ----- |
| **Use-case Description** | A Team Member updates the status of a task by moving it across Kanban columns. |
| **Actors** | Team Member, System |
| **Pre-Condition** | User is logged in and viewing an active Board. |
| **Post-Condition** | Task status is updated in the database and visible to all users. |
|  **Normal Flow** |  User drags a task card from "To Do" to "In Progress". System (Frontend) immediately updates the UI (Optimistic Update) System (Frontend) sends a request to the API. System (Backend) validates permissions and persists the change. System (Backend) returns a success confirmation. |
| **Alternate Flow** | Step 4a: User does not have permission. System reverts the card to the original column. System displays an error toast. |

**![][image11]**

**Figure 6\. Execute Task Sequence Diagram.**

**Data Flow explanation:** In Figure 6 Example, there is an Interaction Between the Client and the API Gateway. When making a request, the Client uses an Optimistic UI Update, which means it will move the task visually before the request is completed, as defined in the Performance Requirements for responsiveness. A PUT request is then sent using an Asynchronous call to the Backend. When the request reaches the Service Layer, it will validate the JWT token and permissions of the user before storing the new state in the NoSQL Database. If the Service Layer fails to persist the request, it will return an error signal to the Frontend, which will revert the user's interface state to maintain data consistency.

**Sprint Planning**

| Use-case Name | Sprint Capacity Planning |
| :---: | ----- |
| **Use-case Description** | A Project Manager adds stories to a sprint while ensuring workload does not exceed capacity. |
| **Actors** | Project Manager, System |
| **Pre-Condition** | An active Sprint exists with a defined Story Point limit. |
| **Post-Condition** | Stories are assigned to the Sprint in the database. |
|  **Normal Flow** | 1\. User selects multiple User Stories from the backlog.  2\. User clicks "Add to Sprint”. 3\. System calculates total points. 4\. System validates: Total \+ Current Load \<= Capacity. 5\. System assigns stories to the sprint. |
| **Alternate Flow** | Step 4a: Capacity Exceeded. System returns HTTP 409 and displays a warning toast. |

**![][image12]Figure 7\.** Sprint Planning Sequence Diagram.

**Service Responsibility:** In order to accomplish the Sprint Planning meeting it is necessary to have a complex dialogue as depicted in Figure 7\. As in the drag and drop interface, the form has been set up to allow for a drag and drop function. However, unlike this interface, this application requires that the server checks that the data entered is valid before it can be committed to the database. The service is responsible for retrieving information from the database and calculating the current workload by comparing the current sprint's capacity against the new project requests. By enforcing the business rules on the server side we ensure that the data in the application is consistent and valid at all times. This is achieved by forcing the server to approve the state changes made by the client.

  **Comparison of Conceptual Solutions**

In order to identify the best approach for the architecture of the app, the team looked at two conceptual models for their evaluation:

·     	**Concept 1: Single Page Application (SPA)**

 A Single Page Application is downloaded once and remains in memory while the user interacts with the app and dynamically modifies the user interface without the need to refresh the entire page.

·     	**Concept 2: Server-Side Rendering (SSR)**

With each interaction, a new HTML page is retrieved from the server and the page must be refreshed to see that content. 

**Table 7\. Comparison of Frontend Concepts**

| Feature | Concept 1 | Concept 2 |
| :---: | :---: | :---: |
| User Experience | High (instant Drag & Drop) | Low (Page flashes on update) |
| Performance | High (Only fetches JSON data) | Low (Reloads full HTML) |
| Complexity | Medium (Client-side state) | Low (Stateless) |

Selection: Concept 1 (SPA) is selected because the Drag & Drop and Real-time Analytics features require the instant feedback that only an SPA can provide.

 

**Interface Designs**

The interface conceptualization focuses on a "Dashboard-Centric" layout.

 

Dashboard View (Figure 2): Aggregates high-level KPIs (Total Boards, Completion Rates) so users can monitor status without navigation.

![][image13]

**Figure 8\. AgileFlow Dashboard Interface**

Board Workspace: Uses a horizontal Kanban layout with collapsible columns to facilitate the visual flow of tasks from left (To Do) to right (Done).

 

### **3.1.4. Software architecture** 

**Component Hierarchy**

The Frontend's low-level architecture consists of a tree structure comprised of React Components. This modular structure allows for independent operation of various application areas (as an example, the Sidebar & Board), resulting in enhanced maintainability and rendering speed/ efficiency.

Four distinct layers of the architecture actually represent Figure 3 when viewed as a whole.

1\.  	The first layer of the system, Provider (Root), contains a top-level Application component. This component wraps the entire application with several Context Providers.

2\.  	The Routing Layer directs URL paths using React Router, which can dynamically render the appropriate Page component based on the address shown (i.e., either /dashboard or /board/:id).

3\.  	The Page Layer is made up of container components, containing the complete screen view. Some of these significant pages are:

o   Dashboard Page: Contains KPI cards and activity feeds.

o   Board Page: Controls a project board's individual state (how columns are ordered).

o   Calendar Page: Displays a date grid as well as event logic.

4\.  	The Atomic Component Layer (shadcn/ui) contains reusable UI components that may include, for example: Buttons, Cards, Dialogs, etc., or any custom business components, such as Task Cards.

![][image14]

**Figure 9\. Frontend Component Hierarchy Diagram**  
 

 **Process Chart (Data Flow)**

Unidirectional Data Flow is the model by which the system operates. In Figure 4, we can see how to handle user related tasks, from the user interaction (i.e., to complete a task), to how data is managed.

1\.  	User Interaction (Action): The user triggers an action (i.e., "onDrop" when the user drags a task)

2\.  	Handler (Event Handler): An event is triggered by a specific Page component that will call a mutation function.

3\.  	Optimistic Update: We instantly update the Local State from which we will be showing visually the outcome of this change.

4\.  	API (Asynchronous) Communication: React Query manages this process by sending a PUT request (asynchronously) to our Backend API.

5\.  	Revalidation: Once we get an HTTP 200 back, the client cache will invalidate. Therefore, we have ensured that what you see on the client side corresponds to what you will see when you retrieve this information again from the server.

 

![][image15]

**Figure 10\.  Frontend Data Flow Process Chart**

 

###    **3.1.5. Materialization**

**Component Sourcing and Resources**

The Frontend subsystem consists of software-based components. Sourcing will take the form of obtaining open source library components and configuring an environment for development. The source of all component libraries will be through the NPM Registry.

·     	Development Environment: Visual Studio Code (VS Code) is an IDE which will be used to support development of the application.

·     	Version Control: Source Code will be maintained and tracked using GitHub; this process will also support team collaboration.

·     	Core Libraries: The following libraries were chosen during prototyping as free and open source libraries. React (v18+) framework, Tailwind CSS, and shadcn/ui component libraries.

**Development Timeline**

The materialization phase will follow an iterative Agile schedule over the next semester:

·     	Phase 1 (Environment Setup): Set up a new project using TypeScript and create a Tailwind CSS theme for the "Dark/Light" mode.

·     	Phase 2 (Development): Create atomic components for Buttons, Cards, and Inputs using the shadcn/ui library for consistency.

·     	Phase 3 (Logic): Implement React Query for data fetching and create the more sophisticated Drag & Drop manipulation logic for the Kanban Board.

·     	Phase 4 (Finishing Touches): Make final styling modifications and incorporate the Recharts visualization library for analytics.

 

### **3.1.6. Evaluation**

**Evaluation Plan**

The Front End Subtransmission (Frontend) Sub-Systems requires verification of the functional and/or performance requirements from section 3.1.1 through the creation of verification/test environments separate and outside of the Backend systems therefore allowing independent of Backend dependencies to generate & use mock/dummy data.

  **Planned Experiments**

1\.  	Cross-Browser Testing Verification:

o   Purpose: To confirm that the drag & drop operations with the Dark Mode enable/disable toggles on the front end will operate in Google Chrome

o   Verification Method: Develop a checklist of Use Case Scenarios (i.e. manage task, etc) that will be executed manually on all 3 (3) browsers.

o   Data Collection: Pass/Fail log(s) from original and resubmitted test(s) on every Use Case scenario executed amongst all 3 browsers.

2\.  	Performance Testing:

o   Purpose: To confirm the requirement of the Dashboard is that loading within (200ms).

o   Verification Method: Confirm that the Dashboard loads efficiently under simulated network conditions using standard browser developer tools

o   Data Collection: Each of the loaded times (in milliseconds) will be recorded across multiple trials to calculate an average performance metric.

3\.  	Responsive Design Testing Verification:

o   Purpose: Confirm Tailwind CSS layouts adapt correctly to standard mobile, tablet, and desktop viewports.

o   Verification Method: All layouts will be visually inspected in the Developer Tools (browser based) to verify that there are no layout breaks and or overlapping texts on smaller screens.

**Analysis**

This collected information will be assessed and contrasted with the Performance Requirements Table delineated in Section 3.1.1. A successful outcome will result in all critical functionality pass scenarios being rated 100%.
