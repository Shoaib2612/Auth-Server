
# NestJS Auth Server

This is a basic authentication server built with NestJS, Prisma, PostgreSQL, and JWT.

## Features

- Signup and Login APIs
- Password hashing using bcrypt
- JWT-based Access and Refresh tokens
- PostgreSQL with Prisma ORM

## Getting Started

### 1. Clone the repo

git clone https://github.com/your-username/your-repo.git
cd your-repo

2. Install dependencies

npm install

3. Create a .env file

DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret

4. Run Prisma

npx prisma generate
npx prisma migrate dev --name init

5. Start the server

npm run start:dev

API Endpoints

POST /api/auth/signup

POST /api/auth/login
