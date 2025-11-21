MERN E-Commerce App
Internship Assignment Submission — Nikita Ingle

This is a fully functional MERN (MongoDB, Express, React, Node.js) based E-Commerce web application created as part of an internship assignment.
It includes user authentication, product listing, product details, cart management, seeded database, and a clean responsive UI.

🚀 Features

🔹 Frontend (React)
Modern responsive UI
Product listing grid
Product details page
Add to cart functionality
Login & Register
Axios for API requests
Local & protected routes after login

🔹 Backend (Node + Express)
JWT Authentication (Register/Login)
REST APIs for users, products, cart
Seed script for preloading products
Static image serving
MongoDB connection via Mongoose

🔹 Database (MongoDB)
Users collection
Products collection (10 items seeded)
Secure password hashing

Project Structure -
e-commerce-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── public/images/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    ├── components/
    ├── pages/
    ├── App.js
    └── .env

▶️ How to Run Locally
1. Start Backend
cd backend
npm install
npm run seed
npm run dev

2. Start Frontend
cd frontend
npm install
npm start


Products collection (10 items seeded)

Secure password hashing
