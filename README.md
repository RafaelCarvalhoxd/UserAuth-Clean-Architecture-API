
## User Auth API

This project implements a Clean Architecture design using TypeScript. The system manages user authentication, including registration and login functionalities.

## Technologies Used

- TypeScript
- Node.js
- Express
- Prisma
- JWT (JSON Web Token)

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/clean-architecture-project.git
   cd clean-architecture-project

2. **Install dependencies:**
   ```sh
   npm install

3. **Set up environment variables:**
   Create a .env file in the root directory and add the following:
   ```sh
    PORT=3000
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret

4. **Run Prisma migrations:**
    ```sh
    npx prisma migrate dev

5. **Express Server:**
   ```sh
   npm run dev

## Routes/Endpoints


| Endpoint              | Description       | Method | Body                                 |
| --------------------- | ----------------- | ------ | ------------------------- |
| /api/register      | Register User | POST  | { name, email, password	}     |
| /api/login        | Login User | POST | {	email, password	}    |

