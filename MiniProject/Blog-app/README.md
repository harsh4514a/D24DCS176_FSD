# Blog App

A simple and responsive **React-based Blog Application** where users can view and manage blog posts. Built with **React, Vite, Node.js, Firebase, and MongoDB**.

---

## Team Details

* **Harsh Gondaliya** | Enroll: D24DCS176
* **Meet Koriya** | Enroll: D24DCS175

---

## Features

* View all blog posts with pagination
* Create, edit, and delete blog posts
* User authentication (Register/Login/Signout)
* Google OAuth integration
* Password reset functionality
* View comments of users
* Responsive UI for mobile & desktop
* REST API integration with backend
* Fast development powered by Vite

---

## Tech Stack

* **Frontend:** React, Vite, TailwindCSS
* **Backend:** Node.js + Express + Firebase
* **Database:** MongoDB (Mongoose)
* **Version Control:** Git & GitHub

---

## Prerequisites

Make sure you have the following installed:

* Node.js
* MongoDB

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/harsh4514a/Blog_App.git
cd Blog_App
```

### 2. Install dependencies

#### Backend

```bash
cd ./server
npm install
```

#### Frontend

```bash
cd ./client
npm install
```

### 3. Run the application

#### Start the backend server

```bash
cd ./server
npm run dev
```

#### Start the frontend development server

```bash
cd ./client
npm run dev
```

Your app will run at: **[http://localhost:5173/](http://localhost:5173/)**

---

## API Endpoints (Backend Integration)

### Blog Routes

* `GET /api/blog/get-all-blogs?limit=9` → Fetch all blogs (paginated)
* `POST /api/blog/create` → Create new blog post
* `PUT /api/blog/update/:id` → Update blog post
* `DELETE /api/blog/delete/:id` → Delete blog post

### User Routes

* `POST /api/user/register` → Register new user
* `POST /api/user/login` → Login user
* `PUT /api/user/updateuser/:id` → Update user (requires authentication)
* `POST /api/user/googleuser` → Google OAuth login
* `DELETE /api/user/deleteuser/:id` → Delete user (requires authentication)
* `POST /api/user/signoutuser` → Sign out user
* `GET /api/user/getusers` → Get all users (requires authentication)
* `POST /api/user/reset-password` → Reset user password
* `GET /api/user/get-user-comment/:commentUserId` → Get comments by user

---

## Project Structure

```
Blog_App/
 ┣ src/
 ┃ ┣ components/      # Reusable UI components
 ┃ ┣ pages/           # Page-level components
 ┃ ┣ App.jsx          # Root component
 ┃ ┣ main.jsx         # Entry point
 ┣ public/            # Static assets
 ┣ package.json
 ┣ vite.config.js
 ┣ README.md
```
