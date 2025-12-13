# 🍬 Sweets Management App

A full-stack sweets inventory management application with authentication, role-based access, and inventory control.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based authentication

### 👑 Authorization
- User & Admin roles
- Admin-only actions (delete, restock)

### 🍭 Sweets Management
- Add sweets
- View all sweets
- Search sweets
- Update sweets
- Delete sweets (Admin)

### 📦 Inventory
- Purchase sweets (stock decreases)
- Restock sweets (Admin only)
- Purchase disabled when stock is 0

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcrypt

### Frontend
- React
- Axios
- React Router

---

## ⚙️ Setup Instructions

### 1️⃣ Backend
```bash
cd backend
npm install
npm run dev
