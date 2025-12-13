# 🍬 Sweets Management Application

A full-stack Sweets Management Application built with **Node.js, Express, MongoDB, and React**.  
The app supports **user authentication, role-based authorization (Admin/User), sweets inventory management, and purchase functionality**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (User / Admin)

---

### 🍭 Sweets Management (Protected APIs)
- Add a new sweet (Admin)
- View all available sweets
- Search sweets by name, category, or price range
- Update sweet details (Admin)
- Delete a sweet (Admin)

Each sweet contains:
- Unique ID
- Name
- Category
- Price
- Quantity in stock

---

### 📦 Inventory Management
- Purchase a sweet (quantity decreases)
- Purchase button disabled when stock is zero
- Restock sweets (Admin only)

---

### 🖥 Frontend (SPA)
- Login & Registration pages
- Dashboard displaying all sweets
- Purchase button for users
- Admin controls (restock & delete)
- Protected routes
- Clean and responsive UI

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt

### Frontend
- React
- Axios
- React Router DOM

---

## 📂 Project Structure

sweets-app/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ ├── config/
│ │ └── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── pages/
│ │ ├── context/
│ │ └── App.js
│ └── package.json
│
└── README.md

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
Create a .env file inside backend:

env
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Backend runs on:

arduino
Copy code
http://localhost:5000
2️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
Frontend runs on:

arduino
Copy code
http://localhost:3000
🔑 Admin Access (Important)
To make a user an Admin:

Go to MongoDB Atlas

Open database: sweetsDB

Collection: users

Change:

json
Copy code
"role": "user"
to

json
Copy code
"role": "admin"
Save

Logout and login again to refresh JWT

🧪 API Endpoints
Auth
POST /api/auth/register

POST /api/auth/login

Sweets
POST /api/sweets (Admin)

GET /api/sweets

GET /api/sweets/search

PUT /api/sweets/:id (Admin)

DELETE /api/sweets/:id (Admin)

Inventory
POST /api/sweets/:id/purchase

POST /api/sweets/:id/restock (Admin)

📌 Highlights
Clean RESTful API design

Secure JWT authentication

Role-based UI rendering

Proper inventory handling

Modular and maintainable codebase

👨‍💻 Author
Harsh Raj

📜 License
This project is for educational and evaluation purposes.

yaml
Copy code

---

# 🧭 STEP 2: Save the File

Make sure:
- File name is exactly `README.md`
- Saved at **project root**

---

# 🧭 STEP 3: Commit README

Run in terminal:

```powershell
git add README.md
git commit -m "docs: update complete project README"
git push