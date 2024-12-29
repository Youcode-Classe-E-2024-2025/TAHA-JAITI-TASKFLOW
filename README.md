# TaskFlow

TaskFlow is a simple task management web application designed to learn the basics of Object-Oriented Programming (OOP) in PHP. It allows supervisors to create tasks and assign them to employees, while employees can view their assigned tasks. The project also implements basic OOP concepts like encapsulation, inheritance, and data validation.

## Features

- **Task Creation:** Supervisors can create tasks with specific titles, descriptions, and statuses.
- **Task Assignment:** Supervisors can assign tasks to employees.
- **Task View:** Employees can view only their assigned tasks.
- **User Management:** Includes a login and registration system for both supervisors and employees.
- **Task Status:** Tasks can have different statuses (e.g., To Do, In Progress, Completed).
- **Simple Task Types:** Inheritance is used to define different task types.

## Technologies Used

- **PHP:** For the back-end API (no frameworks, using native PHP).
- **TypeScript:** For dynamic front-end development, creating a single-page application (SPA).
- **PostgreSQL:** For data persistence.
- **Laragon:** A local development environment for PHP.

## Structure

### Backend (PHP)

- **Controllers:** Responsible for handling user input and routing actions.
- **Services:** Contains business logic (e.g., task creation, user assignments).
- **Models:** Represents the data and interactions with the database (e.g., Task, User, Role).
- **Database:** A PostgreSQL database for storing tasks, users, and roles.

### Frontend (TypeScript)

- **Components:** Each component handles a specific part of the UI (e.g., task list, task form, login form).
- **Single-page application (SPA):** Dynamic content loading without page reloads.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
- You have a running instance of [PostgreSQL](https://www.postgresql.org/).
- You have a running instance of Apache.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Youcode-Classe-E-2024-2025/TAHA-JAITI-TODO_OOP
    ```
2. Navigate to the project directory:
    ```sh
    cd TAHA-JAITI-TODO_OOP
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

1. Go to `config.php` file located inside `src/config/`:
    ```env
    DB_HOST=localhost
    DB_PORT=PORT
    DB_USER=root
    DB_PASS=yourpassword
    DB_NAME=taskflow
    ```

## Running the Project

1. Start the development server.
2. Open your browser and navigate to `http://localhost/`.

## Contributing

To contribute to TaskFlow, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the original branch: `git push origin feature-branch`.
5. Create a pull request.

## License

This project is open source do WHAT YOU WANT!
