# TaskFlow — REST API with Auth & Role-Based Access

A full-stack project demonstrating a scalable backend system with authentication, role-based access control, and CRUD operations, along with a simple frontend UI to test APIs.

---

## 🚀 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)

### Frontend

* Vanilla JavaScript (Fetch API)
* HTML + CSS (basic UI for API interaction)

---

## 📁 Project Structure

```
backend-assignment-auth-api/
├── backend/
│   ├── config/db.js        # MongoDB connection
│   ├── middleware/auth.js  # JWT protect + adminOnly
│   ├── models/User.js      # User schema
│   ├── models/Task.js      # Task schema
│   ├── routes/auth.js      # Auth routes
│   ├── routes/task.js      # Task CRUD routes
│   ├── .env
│   └── server.js           # Entry point
└── frontend/
    ├── index.html          # UI
    └── script.js           # API integration
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Start server:

```bash
node server.js
```

Server runs at:

```
http://localhost:5000
```

---

## 🌐 Frontend Setup

Simply open:

```
frontend/index.html
```

No build tools required.

---

## 📬 API Endpoints

### 🔐 Auth

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| POST   | /api/v1/auth/register | Register user    |
| POST   | /api/v1/auth/login    | Login user       |
| GET    | /api/v1/auth/me       | Get current user |

---

### 📋 Tasks

| Method | Endpoint                  | Description                  |
| ------ | ------------------------- | ---------------------------- |
| POST   | /api/v1/tasks             | Create task                  |
| GET    | /api/v1/tasks             | Get tasks (user/admin logic) |
| GET    | /api/v1/tasks/:id         | Get single task              |
| PUT    | /api/v1/tasks/:id         | Update task                  |
| DELETE | /api/v1/tasks/:id         | Delete task                  |
| GET    | /api/v1/tasks/admin/users | Admin only                   |

---

## 🔐 Authentication

* JWT-based authentication
* Token must be passed in header:

```
Authorization: Bearer <token>
```

---

## 👑 Role-Based Access

* Default role: `user`
* Admin role: `admin`
* Admins can:

  * View all tasks
  * Access admin routes

---

## 🧪 Testing

APIs can be tested using:

* Postman
* Frontend UI (included)

---

## 📈 Scalability Notes

* Modular folder structure for easy expansion
* Stateless JWT authentication (horizontal scaling ready)
* Can integrate:

  * Redis (caching / token blacklisting)
  * Docker (containerization)
  * Load balancing (Nginx)
  * Microservices architecture

---

## 🎯 Features Implemented

* User registration & login
* Secure password hashing
* JWT authentication
* Protected routes
* Role-based access control
* Task CRUD operations
* Basic frontend for API interaction

---

## 👤 Author

**Alpesh Borekar**
