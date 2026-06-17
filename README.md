<div align="center">

# 📊 GradeLens

### AI-Powered Student Performance Analytics Dashboard

*Turning raw academic data into actionable insight — built for educators who want to spot risk before it becomes a problem.*

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)
![Status](https://img.shields.io/badge/status-active-success.svg?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blueviolet.svg?style=flat-square)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables)
- [API Overview](#-api-overview)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🧭 Overview

**GradeLens** is a full-stack analytics platform that helps educators and administrators understand student performance at a glance. Upload a CSV of grades and attendance, and GradeLens processes it through a predictive analytics pipeline to surface trends, flag at-risk students early, and visualize academic performance over time — all through a clean, interactive dashboard.

It's built as a modern, cloud-native application: a Next.js frontend talking to a FastAPI backend, backed by a serverless PostgreSQL database on Neon, with the whole thing deployable in minutes on Vercel and Render.

---

## ✨ Features

- 📈 **Student Performance Analytics Dashboard** — A centralized view of grades, trends, and class-wide performance metrics.
- 📂 **CSV Upload and Processing** — Bulk-import student records and academic data with automated parsing and validation.
- 🎯 **Predictive Analytics for At-Risk Students** — Machine learning models flag students likely to need early intervention.
- 🗓️ **Attendance and Academic Trend Analysis** — Track patterns over time to correlate attendance with performance.
- 📊 **Interactive Data Visualizations** — Charts and graphs that make performance data easy to explore and explain.
- ⚡ **FastAPI REST APIs** — A fast, typed, well-documented backend powering the entire platform.
- 🐘 **PostgreSQL Database Integration** — Reliable, relational storage for student and academic data.
- ☁️ **Cloud Deployment with Vercel and Render** — Production-ready, scalable hosting out of the box.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS |
| **Backend** | FastAPI, Python, SQLAlchemy |
| **Database** | PostgreSQL (hosted on Neon) |
| **Data & Analytics** | Pandas, NumPy, Scikit-learn |
| **Deployment** | Vercel (frontend), Render (backend), Neon (database) |

---

## 🏗️ Architecture

```
┌──────────────┐        REST API         ┌──────────────┐        SQLAlchemy        ┌──────────────┐
│   Next.js     │  ───────────────────▶  │   FastAPI     │  ───────────────────▶   │  PostgreSQL   │
│   Frontend    │  ◀───────────────────  │   Backend     │  ◀───────────────────   │   (Neon)      │
│  (Vercel)     │        JSON             │  (Render)     │                          │              │
└──────────────┘                         └──────────────┘                          └──────────────┘
                                                  │
                                                  ▼
                                        ┌──────────────────┐
                                        │  Pandas / NumPy /  │
                                        │  Scikit-learn      │
                                        │  (Analytics Engine)│
                                        └──────────────────┘
```

CSV uploads are parsed and cleaned with Pandas, fed through Scikit-learn models to generate at-risk predictions and trend data, then persisted to PostgreSQL and served to the frontend via FastAPI's REST endpoints.

---

## 📁 Project Structure

```
GradeLens/
├── backend/
│   ├── app/
│   │   ├── api/            # Route handlers / endpoints
│   │   ├── models/         # SQLAlchemy ORM models
│   │   ├── schemas/        # Pydantic request/response schemas
│   │   ├── services/       # CSV processing & ML analytics logic
│   │   └── main.py         # FastAPI app entrypoint
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # Reusable React components
│   ├── public/
│   ├── package.json
│   └── .env.local.example
└── README.md
```

> Adjust this tree to match your actual folder layout if it differs.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- Python (v3.10 or higher)
- Git
- A PostgreSQL database (a free [Neon](https://neon.tech) project works great)

### Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate      # Windows
source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env

# Run the development server
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`, with interactive docs at `http://localhost:8000/docs`.

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local

# Run the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Environment Variables

**Backend (`backend/.env`)**

```env
DATABASE_URL=postgresql://user:password@host/dbname
ENVIRONMENT=development
CORS_ORIGINS=http://localhost:3000
```

**Frontend (`frontend/.env.local`)**

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🔌 API Overview

A few of the core endpoints exposed by the backend:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/upload` | Upload a CSV file of student records for processing |
| `GET` | `/api/students` | Retrieve all student records |
| `GET` | `/api/students/{id}` | Get details for a specific student |
| `GET` | `/api/analytics/at-risk` | Get predictions for at-risk students |
| `GET` | `/api/analytics/trends` | Get attendance and academic trend data |

Full interactive documentation is auto-generated by FastAPI and available at `/docs` once the backend is running.

---

## ☁️ Deployment

| Component | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [Neon](https://neon.tech) (Serverless PostgreSQL) |

**Quick steps:**

1. Push your code to GitHub.
2. Create a Neon PostgreSQL database and copy the connection string.
3. Deploy the `backend/` directory to Render as a Web Service, setting `DATABASE_URL` and other env vars.
4. Deploy the `frontend/` directory to Vercel, setting `NEXT_PUBLIC_API_URL` to your Render backend URL.
5. Update CORS settings on the backend to allow your Vercel domain.

---

## 🗺️ Roadmap

- [ ] Role-based access control (admin / teacher views)
- [ ] Email/notification alerts for at-risk students
- [ ] Exportable PDF performance reports
- [ ] Support for additional data sources beyond CSV
- [ ] Mobile-responsive dashboard improvements

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Update this section if you choose a different license.

---

## 👤 Author

**Pranjal Sahay**
GitHub: [@pranjalsahay](https://github.com/pranjalsahay)

<div align="center">

If you found this project useful, consider giving it a ⭐ on GitHub!

</div>
