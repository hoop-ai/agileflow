
The Work Plan for the AgileFlow project offers an extensive operational roadmap that will enable systematic guidance through the conception to the final deployment of the 15-week development lifecycle. This section outlines the structured integration of the workflows of Management Engineering and Software Engineering, whereby analytical research and technical implementation keep pace. For the purpose of realizing structured execution and resource optimization, standard project management tools such as a hierarchical Work Breakdown Structure (WBS), a comprehensive Responsibility Matrix (RM), and a Project Network diagram are used. Further, the feasibility and sustainability of the project are established through an exact timeline using the Gantt Chart, thorough cost analysis, and a proactive risk assessment strategy.

1. ## **2.1. Work Breakdown Structure (WBS)**

The Work Breakdown Structure **(Figure 3\)** for the AgileFlow project is designed to integrate the distinct but complementary responsibilities of the Management Engineering and Software Engineering departments.The project will be divided into two key phases: System Development & Implementation (by Software Engineering Team) and Process Design & Analytics (by Management Engineering Team).

The first part of the hierarchical decomposition concerns the physical realization of these ideas using both frontend and backend software development, database construction, and system integration. The second branch will focus on the conceptualization, requirement analysis, and mathematical logics that lie behind performance metrics and AI-based task assignments. By adopting this hierarchical decomposition, both the operational workflows and technical architecture are developed in parallel and aligned with the project goals.

![A diagram of a companyAI-generated content may be incorrect.][image3]

**Figure 3\. Work breakdown structure for AgileFlow**

## **2.2. Responsibility Matrix (RM)**

The RM of AgileFlow connects the Software and Management Engineering departments by aligning technical product development with analytical research. At the same time, such a definition of the role of each contributor as Responsible (R) or Support (S) minimizes ambiguity and streamlines decision-making through the 15-week lifecycle.

The matrix for AgileFlow has a hierarchical setup that encompasses all aspects of the project right from requirement analysis and literature review carried out on the foundation of MCDM or modified decision-making methods to the ultimate system analysis and documentation phase. As evident from Table 2, while the Management Engineering team delivers their duties related to the strategic foundation of the project – cost analysis, risk analysis, and sectoral analysis of competing tools aided with AI – at the same time, the Software Engineering team handles the technical aspect of the project setup – NoSQL database design and implementation and UI/UX design and implementation.

**Table 2\. Responsibility Matrix for the team**

![][image4]

## 

2. ## **2.3. Project Network (PN)**

The AgileFlow project implementation schedule has been developed with a view to resource utilization and optimization of development time using a Parallel Processing approach. According to the below Project Network diagram, the project forks into two major streams from its starting node:

Back-end Development: The whole process starts with server infrastructure and database setup, goes through the security layer, down to API controllers.  
Frontend Development: It is a process that starts with the setup of a development environment and goes all the way up to developing UI components and coding Client Logic.

Following the 4-phase Build Plan described in the documentation, these two parallel streams meet at the System Integration point; then the project is taken to its end through the Testing & Validation and the Documentation phases.

![][image5]  
**Figure 4\. The project network**

3. ## **2.4. Gantt chart**

The Gantt chart depicted in Table 3 illustrates the 15-week project life cycle of AgileFlow, beginning in March and concluding in July. The first stage of the project, occurring in the first month, is dedicated to beginning with a team effort in order to build the foundation of the project by outlining system requirements and finalizing logic for key performance indicators. Included in this step is finalizing software requirements and outlining priorities in the backlog.

During the core implementation phase from week 5 to week 11, this project employs a parallel processing model where technology implementation and management auditing are done in parallel or concurrently. Software Engineering maintains its activities on managing the database, designing schema models physically in this phase of development by constructing the front end UI and the back end services as well. At this time, management engineering conducts its activities on advance progress tracking, risk assessment in an average stage, and AI logic verifications by ensuring decision models are correct within the system.

The last phase, covering June and July, integrates system-level validation and the compilation of strategic findings. The Software Engineering team finishes the development of key functionalities and begins compiling test proof, whereas the Management Engineering team initiates User Acceptance Testing (UAT) and speed audits to confirm that the system satisfies the speed requirements. This final phase also incorporates comparisons of the developed solution to current industry software, in addition to wrapping up the project operation efficiency. The project ends in July with the compilation of the final report, offering an extensive project review of the integrated solution prior to delivery.. 

![][image6]

**Table 3\. [Gantt chart for the materialisation phase of the project.](about:blank)**

4. ## **2.5. Costs**

Total project budget (16 weeks): 14,000 TRY.  
 Our cost strategy is to keep development free (open-source libraries \+ free tiers), and only pay for what is required to host and run the system reliably during integration, testing, and demo.

Sizing assumptions used to overestimate (worst-case for a capstone)

●      System scope: React SPA \+ Node.js API \+ NoSQL data model (nested tasks/sprints/boards) \+ analytics views \+ file attachments \+ AI recommendations.

●      Stress test: up to 10 concurrent users generating bursts of requests.

●      Attachments: assume up to 10 GB total over the semester (screenshots, PDFs, exports), plus request overhead.

●      AI usage: Google Gemini or OpenAI GPT-5 used frequently with large context, and the implementation may be inefficient early on (re-sending too much context, limited caching).

What is free (not included in the cost table)

●      VS Code, GitHub (free tier), Postman (free tier).

●      NPM libraries: React, Tailwind, React Query, Recharts, shadcn/ui, Framer Motion, etc.

●      Free tiers for database/hosting can be used early; the budget below still reserves money for upgrades.

---

Currency: TRY. (16 weeks ≈ 4 months)

![][image7]

        **Table 4\. Paid costs (month-by-month)**

5. ## **2.6. Risk assessment**

This section identifies technical and operational risks associated with AgileFlow.

 Based on the safety and performance requirements, the following technical risks have been identified.

* **Data Integrity Failure:** Risk of database corruption from invalid inputs. *Mitigation:* Implement strict schema validation and cleansing.  
* **Unauthorized Access:** Risk of unauthenticated users reaching private views. *Mitigation:* Automatic redirection and JWT verification middleware.  
* **System Latency:** Risk of slow dashboard loading (target \< 0.5s). *Mitigation:* Use SPA architecture with optimistic UI updates and NoSQL nested structures.  
* **Data Loss:** Risk of server failure. *Mitigation:* Enable automatic database backups.

**Table 5\. Risk matrix**

***![][image8]![][image9]***  
                                                         **Table 6\. Risk assessment**
