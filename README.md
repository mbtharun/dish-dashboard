[README.md](https://github.com/user-attachments/files/29241793/README.md)
# 🍽️ Dish Dashboard

A full-stack dish management dashboard built with **MongoDB**, **Express.js**, **React.js**, and **Node.js**.

## Features
- View all dishes as beautiful cards
- Toggle dish published/unpublished status
- Real-time updates via 3-second polling
- Responsive dark-themed UI with glassmorphism design

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| HTTP Client | Axios |

## Setup & Run

### Prerequisites
- Node.js (v18+)
- MongoDB running locally (or MongoDB Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/dish-dashboard.git
cd dish-dashboard
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```
MONGO_URI=mongodb://localhost:27017/dish-dashboard
PORT=5000
```

Seed the database:
```bash
node seed.js
```

Start the backend:
```bash
node server.js
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app
Visit **http://localhost:5173** in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dishes` | Fetch all dishes |
| PATCH | `/api/dishes/:id/toggle` | Toggle isPublished status |

## Folder Structure
```
dish-dashboard/
├── backend/
│   ├── models/
│   │   └── Dish.js          # Mongoose schema
│   ├── routes/
│   │   └── dishes.js        # API routes
│   ├── seed.js              # Database seeder
│   ├── server.js            # Express entry point
│   └── .env                 # Environment variables
└── frontend/
    └── src/
        ├── App.jsx          # Main React component
        ├── App.css          # Dashboard styles
        └── index.css        # Global styles
```
