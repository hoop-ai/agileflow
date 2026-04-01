
The backend sub-system acts like a hub for processing and storing all information to be processed as a unit. It exposes a RESTful API to enable the frontend client to store, retrieve or modify securely project-specific data in a NoSQL database.

### **3.2.1. Requirements**

**Behaviors of the Software Application**

| Actor Name | Name of behavior | Description of Behavior |
| :---: | :---: | :---: |
|   Frontend Client |   Request Authentication | Providing user credentials to the server for the purpose of obtaining a secure session token. |
|   Frontend Client |   CRUD Board Data | Creating, reading, updating or deleting project boards and tasks by sending requests from the client. |
|     System |     Validate Token | The server will intercept requests, validate the digital signature of the JWT and allow or deny access based on this verification. |
|   System |   Manage File Storage | The server will work with the Cloud Storage service to upload and download task attachments. |

**Attributes of the Software Application**

| Actor Name | Name of Attribute | Description of Attribute |
| :---: | :---: | :---: |
|     Auth Token |     Payload | Each JWT contains **signed claims** (e.g., user identifier and expiration time). The token is typically **signed for integrity**; encryption is optional and only applies if a separate token-encryption scheme is implemented |
|   Database |   Document Schema | A JSON-like structure used to represent a Board and all its Tasks. |
|     API Response |     Status Code | Standard HTTP Response Codes (200, 401, 404, 500), indicating the outcome of an operation performed on the server. |

   
  **Performance Requirements**

·     	Latency: The API must return a standard read operation response (Get Board Tasks)  minimal delay to maintain system fluidity..

·     	Concurrency: The server must support many simultaneous requests from different team members concurrently without conflicting data.

**Security Requirements**

·     	Authentication: All endpoints (except Login/Register) must require a valid JSON Web Token (JWT) in the request header.

·     	Encryption: All data in transit between the Client and Server must be encrypted using HTTPS.

**Safety Requirements**

·     	Data Validation: The backend must cleanse any incoming text inputs of malicious code to help prevent NoSQL Injection attacks.

·     	Backup: The database should have automatic backup capabilities to protect against potential data loss if the server goes down.

**Business Rules**

·     	Resource Ownership Enforcement: Critical operations cannot be performed by anyone other than the Assigned Owner of that Board. If a Company that is being operated with multiple Users, you can assure that only assigned Users have access to delete, as an Owner.

·     	Account Singularity: The system enforces a one-to-one correspondence between email addresses and user accounts. Therefore; the system will reject any attempt to register an Email Address already registered to another User Account.

###    **3.2.2. Technologies and methods**

**Literature Survey on Data Management**

In modern web architecture, the separation of client and server concerns is achieved through **REST (Representational State Transfer)** APIs. Literature defines REST as an architectural style that uses standard HTTP methods (GET, POST, PUT, DELETE) to manipulate resources, offering excellent scalability and compatibility with various frontend clients. regarding data storage, **NoSQL (Non-Relational)** databases have emerged as a preferred solution for Agile project management tools. Unlike traditional Relational Database Management Systems (RDBMS) which require rigid table schemas, NoSQL databases store data in flexible, document-oriented formats (JSON), making them ideal for handling hierarchical data structures like nested tasks within Kanban boards.

**Comparison of Conceptual Solutions**

In comparing the conceptual options, there were two principal design considerations for the back-end; specifically, the selection of database architecture. The two conceptual choices that were evaluated were:

·     	Concept  1 \- NoSQL Database/Document Oriented: Data is stored as documents (similar to JSON objects) contained within collections. Each document may have a completely different structure from one another; in essence, documents can contain nested data (e.g., having an array of tasks contained within a board document).

·     	Concept 2 \- Relational Database/SQL-Based: Data is stored in distinct tables that have strict rows and columns (for example, a board's table, task's table, column's table, etc.) and tables can be related to each other using foreign keys.

**Table 8\. Comparison of Database Concepts**

| Feature | Concept 1 | Concept 2 |
| :---: | :---: | :---: |
| Schema Flexibility | High (Dynamic fields) | Low (Requires migration scripts) |
| Data Structure | Nested (Good for Boards) | Flat (Requires complex Joins) |
| Scalability | High (Horizontal scaling) | Medium (Vertical scaling) |
| Consistency | Eventual (BASE model) | Strong (ACID model) |

  **Selection of Best Solution**

AgileFlow's best solution is Concept 1 (NoSQL). A Kanban board has a built-in hierarchy (e.g., Columns in a Board, Tasks in a Column, Comments in a Task). Using a nested document structure to store this hierarchy enables the frontend to retrieve the entire state of a board with one API request versus requiring multiple, complex, and costly JOINs to get the same data from an SQL database, significantly improving the load time of the data.

**Software and Libraries**

The backend of the application uses REST API architecture. The technologies used for the backend are:

·     	Database Management System- A NoSQL Database is located on the server to store the application data, and has a secure connection driver that allows for pool management and query execution.

·     	Authentication- JWT (JSON Web Tokens) are used to authenticate the user in a stateless manner. The server generates a token signed with the User's ID when the User logs in; this token must be included in the header of all future requests.

·     	File Storage- To manage the user uploads (e.g. task attachments), the backend integrates with Cloud Storage. The Backend generates secure upload URLs to store the files, preventing binary files from increasing the size of the main database.

**Database Design**

There are two Collections used to design the database:

·     	Users Collection: stores the authentication details (Email, Password Hash and Preferences).

·     	Boards Collection: stores the project specific data. Each Board document stores metadata (Title, Owner), and contains an array of Columns and Tasks; therefore, there is no need to have multiple tables with relationships.

### **3.2.3. Conceptualization**

**Actor Glossary**  
  The Backend Data Service interacts with the following actors:

| Actor Name | Description |
| :---: | :---: |
| Frontend Client | The React application acting as the primary consumer of the API data. |
|   Cloud Storage Device | The external service (e.g., AWS S3 or Firebase Storage) used to host static files and attachments. |
| Database System | The internal NoSQL engine responsible for persisting JSON documents. |

 

**Use-case Glossary**  
  The core functions of the Backend API are defined below:

| Use-case Name | Description | Participating Actors |
| :---: | :---: | :---: |
|  Register User | Creating a new user document with hashed credentials. |   Frontend Client, Database |
| Authenticate User | Validating login details and issuing a secure JWT. | Frontend Client, Database |
| Create Board | Persisting a new project board configuration. | Frontend Client, Database |
|   Upload Task | Modifying task status or details in the NoSQL document. |   Frontend Client, Database |
|   Upload File | Handling binary file transfers for task attachments. | Frontend Client, Cloud Storage |

**Use-case Scenario: Authenticate User**

| Use-case Name |   |
| :---: | :---: |
| Use-case Description | Verify User and Issue Access Token. |
| Actors | Frontend Client, Database System |
| Pre-Condition | User must have a registered account. |
| Post-Condition | A valid JSON Web Token (JWT) is returned to the client. |
|       Normal Flow | 1\. The Frontend Client sends a POST request containing the user's email address and password. 2\. The system queries the database to find the user document corresponding to the user's email address. 3\. The system retrieves and checks the password hash stored in the database and compares it against the password hash provided with the request. 4\. The system generates a JWT token using its private key to complete this process. 5\. The system responds with HTTP Status Code 200 containing the token. |
|   Alternative Flow | Password does not match. 1\. System returns HTTP 401 Unauthorized. 2\. Frontend Client displays an error message. |
| Business Rules | The API will never return a password, it will only return a token. |

 

![][image16]

**Figure 11\. Authenticate User Use-Case Diagram**

**Interface Designs (API Specification)**  
  For the Backend sub-system, the "Interface" is defined by the RESTful API endpoints. Below is the design for the core resource routes:

1. Auth Routes:

   ○      POST /api/auth/login: Accepts credentials, returns JWT.

   ○      POST /api/auth/register: Creates new user account.

2. Board Routes:

   ○      GET /api/boards: Returns a list of boards summary (for Dashboard).

   ○      POST /api/boards: Creates a new board.

   ○      GET /api/boards/:id: Returns full details (Columns, Tasks) for a specific board.

   ○      PUT /api/boards/:id: Updates board metadata.

3. Task Routes:

   ○      PUT /api/tasks/:id/move: Special endpoint to handle Drag & Drop logic (updating column status).

   ○      POST /api/tasks/:id/upload: Endpoint to initiate file upload to Cloud Storage.

 

 

###    **3.2.4. Software architecture**

**Low-Level Software Architecture**

The Controller-Service-Repository pattern is used to create the Backend Data Service, providing a multi-layer architecture that separates the handling of HTTP requests from the business rules and accessing the database.

![][image17]

**Figure 12\. Backend Layered Architecture Diagram.**

 

1\.  	Entry Point (Server): sets up the application, configures the Middleware (CORS and Body Parser) and establishes a connection to the NoSQL Database.

2\.  	Router Layer: matches the incoming HTTP request to specific Controller functions (e.g. GET/api/boards). The Router also includes an Auth Middleware that examines each request and checks for a valid JWT before directing it to the Logic Layer.

3\.  	Controller Layer: provides HTTP communication by extracting data from the incoming request body, calling the appropriate Service for processing, and formatting an HTTP Response in JSON for return to the client.

4\.  	Service Layer (Business Logic): contains the core logic of the domain. For example, TaskService would contain the business logic implemented when a user drags a card and desires to reorder the associated tasks in the database.

5\.  	Data Access Layer (Models): contains the definition of the NoSQL Schemas and allows for direct access to the Database. Models are responsible for performing CRUD operations and validating data.

 

**Process Chart (Request Flow)**

The operational behavior of the backend for processing a standard request follows a strict pipeline. Figure 9 illustrates the process flow for a "Update Task" request:

1\.  	Request Reception: The backend has received a PUT request with both the Task ID and new status.

2\.  	Security Check: The Auth Middleware extracts the JWT from the request header and validates it by checking its signature and expiration time. A database lookup is only required if token revocation or session tracking is implemented. A response from HTTP 401 will be returned if the token is invalid.

3\.  	Validation: The Controller will check if the Task ID exists and that the status is valid (such as "Done").

4\.  	Persistence: The Model will perform an atomic update to the NoSQL document.

5\.  	Response: The server will serialize the Task object that was just updated as JSON and return it to the client.

![][image18]

**Figure 13\. Backend API Request Processing Chart**

### **3.2.5. Materialization**

**Component Sourcing and Resources**

·     	Software Packages: All backend libraries (e.g., JWT handling, Database drivers, CORS middleware) will be sourced via the NPM (Node Package Manager) registry.

·     	Infrastructure: The NoSQL Database and Cloud Storage buckets will be provisioned using free-tier resources from a major cloud provider (e.g., MongoDB Atlas or Firebase) to minimize costs.

·     	Development Tools: standard API testing tools will be utilized for testing API endpoints independently of the frontend.

 

  **Build Plan**

The backend implementation will follow this sequence of development stages:

1\.  	Phase 1 (Infrastructure Setup): focuses on server environment configuration and database cluster setup and connection pool establishment.

2\.  	Phase 2 (Authentication Module): includes the development of the User Model and Password Hashing functionality and JWT signing and verification middleware.

3\.  	Phase 3 (Core API Implementation): focuses on creating CRUD controllers which handles "Boards" and "Tasks" operations. The process requires developers to establish NoSQL schema definitions together with validation criteria.

4\.  	Phase 4 (File Handling): The system will integrate with Cloud Storage service to secure file uploads for task attachments.

### **3.2.6. Evaluation**

**Evaluation Plan**

The evaluation plan for the Backend Data Service includes the verification of the integrity of all API Endpoints, the safety of the Authentication process, and the speed of the Database Query Latency. This verification will be done through the use of automated testing tools to simulate client requests without the use of the Frontend interface.

**Planned Experiments**

1\.  	Functional API Verification:

o   Objective: Verify that all CRUD methods ( Create Board and Update Task ) perform properly and return the proper JSON format.

o   Method: An entire suite of automated tests using Postman will generate request packets to all backend API endpoints.

o   Data Collection: Logging of the HTTP response status codes (e.g., for create expected to receive status code of '201' and for retrieval status code of '200') and the validation of the response payload format.

 

 

2\.  	Security Penetration Test:

o   Objective: Verify that Protected Routes are not accessible to unauthorized users.

o   Method: Attempting to access Protected Routes (Example: /api/boards ) without an expired Access Token.

o   Data Collection: The Server logs confirming that these requests were denied with a Successful Status HTTP 401 Unauthorized Response.

**Analysis**

Analysis of the collected data will occur based on the requirements outlined in Section 3.2.1.The verification of the sub-system will be based on the following standards:

1\.  	Functional testing to be recorded with a goal of a high Pass Rate.

2\.  	all successful retrievals of any unauthorized requests should be zero.
