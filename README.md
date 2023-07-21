Project Name: To-Do List App

To-Do List App

Description
This is a To-Do List application built using React, Node.js with Express, and SQL for managing personal and group tasks. Users can sign up, log in, and create their own personal tasks. Additionally, they can create and manage group tasks, where multiple users can be assigned to a task.

The application includes features such as session management using express-session, password encryption with bcrypt, validation of data using express-validator, and comprehensive test coverage using Jest for the backend.

Table of Contents
Installation
Usage
Technologies
Project Structure
Models
Routes
Tests
Contributing
License
Installation
Clone the repository:
bash
 
```git clone https://github.com/your-username/todo-list-app.git
cd todo-list-app```
Install dependencies for both frontend and backend:
bash
 
```cd client
npm install
cd ../server
npm install```
Set up the database: [Instructions for setting up the SQL database]

Create a .env file in the server folder and add the required environment variables:

makefile
``` 
DB_HOST=your_database_host
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
SESSION_SECRET=your_session_secret```
Usage
Start the server:
bash
``` 
cd server
npm start```
Start the frontend:
bash```
 
cd client
npm start```
The frontend will run on http://localhost:3000 and the server will run on http://localhost:5000.

Technologies
Frontend: React
Backend: Node.js with Express
Database: SQL (MySQL, PostgreSQL, etc.)
Session Management: express-session
Password Encryption: bcrypt
Data Validation: express-validator
Testing: Jest
Project Structure
lua
 
todo-list-app/
|-- client/             # Frontend React app
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- App.js
|   |   |-- index.js
|   |   |-- ...
|   |-- package.json
|
|-- server/             # Backend Node.js app
|   |-- models/         # Database models
|   |-- routes/         # API routes
|   |-- tests/          # Test files
|   |-- db.js           # Database connection configuration
|   |-- index.js        # Server entry point
|   |-- package.json
|
|-- .gitignore
|-- README.md
Models
User Model
The UserModel handles operations related to user data and authentication. It includes functions for user registration, login, and finding users by ID or username.

Task Model
The TaskModel handles operations related to tasks, both personal and group tasks. It includes functions for creating personal and group tasks, marking tasks as completed, and finding tasks by their IDs.

Group Model
The GroupModel handles operations related to groups. It includes functions for creating groups and finding groups by their IDs.

Routes
User Routes
POST /users/register: Register a new user. Validates user data, encrypts the password, and saves the user in the database.

POST /users/login: User login. Validates credentials, creates a session, and returns a JWT token for authentication.

POST /users/logout: User logout. Ends the user session.

GET /users/me: Get user profile. Requires authentication and returns the user's profile information.

Task Routes
POST /tasks/personal: Create a new personal task. Requires authentication and associates the task with the user.

POST /tasks/group: Create a new group task. Requires authentication and verifies the user's membership in the group.

GET /tasks/:taskId: Get task by ID. Requires authentication and returns the task details.

PATCH /tasks/:taskId/complete: Mark a task as completed. Requires authentication and updates the task status.

DELETE /tasks/:taskId: Delete a task. Requires authentication and deletes the task from the database.

Group Routes
POST /groups: Create a new group. Requires authentication and creates a new group associated with the user.

GET /groups/:groupId: Get group by ID. Requires authentication and returns group details.

PATCH /groups/:groupId: Update group details. Requires authentication and updates group information.

Tests
The application includes comprehensive tests for models and routes using Jest. Tests cover user registration, login, and tasks related operations, along with session management and data validation.

To run tests:

 ```
cd server
npm test```
Contributing
Contributions to the project are welcome! If you find a bug or want to add new features, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.
