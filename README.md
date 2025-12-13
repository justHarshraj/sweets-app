# Sweet Shop Management System

A full-stack Sweet Shop Management System built using Node.js, Express, MongoDB, and React.

This project supports user authentication, role-based access (Admin/User), sweets inventory management, and purchasing functionality.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication

### Frontend
- React
- React Router
- Axios

---

## Features

- User Registration & Login
- JWT-based Authentication
- View all available sweets
- Purchase sweets (stock decreases)
- Admin-only features:
  - Add sweets
  - Update sweets
  - Delete sweets
  - Restock sweets

---

## Project Structure

sweets-app/
├── backend/
│ ├── src/
│ ├── package.json
│
├── frontend/
│ ├── src/
│ ├── package.json
│
└── README.md


---

## How to Run Locally

### Backend

```bash
cd backend
npm install
npm run dev


Backend runs on:
http://localhost:5000

Frontend
cd frontend
npm install
npm start


Frontend runs on:
http://localhost:3000

Notes

MongoDB connection string and JWT secret should be stored in a .env file inside the backend folder.

Admin role can be assigned directly in the database for testing.

Author

Harsh Raj