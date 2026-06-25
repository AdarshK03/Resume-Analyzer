# 📄 Resume Analyzer AI

An AI-powered Resume Analyzer built using React, Node.js, Express, PostgreSQL, and Google's Gemini API. The application allows users to upload their resumes in PDF format and receive an AI-generated analysis with scores, strengths, weaknesses, and actionable improvement suggestions.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Secure User Sessions

### 📄 Resume Upload & Analysis
- Upload resumes in PDF format
- Extract text from PDFs automatically
- Analyze resumes using Google Gemini AI
- Generate detailed feedback based on predefined scoring criteria

### 📊 Resume Scoring System
Resumes are evaluated on:

| Category | Maximum Points |
|----------|----------------|
| Education | 20 |
| Skills | 20 |
| Projects | 30 |
| Experience | 20 |
| Resume Structure | 10 |
| **Total** | **100** |

### 🤖 AI Analysis Includes
- Category-wise Scores
- Overall Resume Score
- Resume Strengths
- Resume Weaknesses
- Suggested Improvements

### 📚 Analysis History
- Stores every analysis in PostgreSQL
- View previously analyzed resumes
- Access detailed reports anytime
- Compare different resume versions over time

### 🏠 Dashboard
- Upload Resume shortcut
- Recent Analysis History
- Quick navigation to detailed reports

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- Multer
- JWT Authentication
- Bcrypt

### Database
- PostgreSQL

### AI Integration
- Google Gemini API

### Additional Libraries
- pdf-parse-fixed
- cors
- dotenv
- pg

---

## 📂 Project Structure

```text
Resume-Analyzer
│
├── client
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
├── server
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── config
│   ├── uploads
│   └── index.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AdarshK03/Resume-Analyzer.git
cd Resume-Analyzer
```

---

## Backend Setup

### Navigate to Server

```bash
cd server
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
RESUME_API_KEY=your_gemini_api_key
```

### Start Backend

```bash
npm run dev
```

or

```bash
node index.js
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

### Navigate to Client

```bash
cd client
```

### Install Dependencies

```bash
npm install
```

### Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```

### Resume Analysis Table

```sql
CREATE TABLE resume_analysis (
    id SERIAL PRIMARY KEY,
    file_name TEXT,
    total_score INTEGER,
    analysis JSONB,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔄 Application Workflow

```text
Register/Login
        ↓
JWT Authentication
        ↓
Upload Resume PDF
        ↓
Extract Text from PDF
        ↓
Send Text to Gemini API
        ↓
Generate AI Analysis
        ↓
Save Analysis in PostgreSQL
        ↓
Display Results
        ↓
Store in User History
```

---

## 🔒 Security Features

- Password Hashing using Bcrypt
- JWT Authentication
- Protected Backend Routes
- Protected Frontend Routes
- User-specific Analysis History
- Authorization Middleware
- Secure Database Queries using Parameterized SQL

---

## 🧠 Concepts Implemented

- REST APIs
- Authentication & Authorization
- File Upload Handling
- PDF Parsing
- AI Integration
- PostgreSQL Integration
- Route Protection
- State Management with React Hooks
- React Router
- Async/Await
- Error Handling
- CRUD Operations
- Environment Variables
- MVC Architecture

---

## 📌 Future Improvements

- Resume Comparison System
- Download Analysis Report as PDF
- Drag & Drop Resume Upload
- Dark Mode
- Loading Animations
- Charts & Visual Analytics
- Resume Version Tracking
- Email Notifications
- Resume Templates & Suggestions

---

## 👨‍💻 Author

**Adarsh K**

GitHub: https://github.com/AdarshK03

---

## ⭐ If you found this project interesting, consider giving it a star!
