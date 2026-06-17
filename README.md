<div align="center">

![header](https://capsule-render.vercel.app/api?type=waving&color=0:0f2027,100:2c5364&height=220&section=header&text=GradeLens&fontSize=70&fontColor=ffffff&animation=fadeIn&desc=AI-Powered%20Student%20Performance%20Analytics&descAlignY=60&descSize=18)

[![Typing SVG](https://readme-typing-svg.demolab.com/?font=Fira+Code&size=20&pause=1000&color=2C5364&center=true&vCenter=true&width=700&lines=Turning+raw+academic+data+into+actionable+insight;Spotting+at-risk+students+before+it%27s+too+late;FastAPI+%2B+Next.js+%2B+PostgreSQL+%2B+Machine+Learning)](https://git.io/typing-svg)

<br/>

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

<br/>

![Stars](https://img.shields.io/github/stars/pranjalsahay/Gradlens?style=for-the-badge&color=ffd700&label=Stars)
![Forks](https://img.shields.io/github/forks/pranjalsahay/Gradlens?style=for-the-badge&color=8a2be2&label=Forks)
![Issues](https://img.shields.io/github/issues/pranjalsahay/Gradlens?style=for-the-badge&color=ff6347&label=Issues)
![Last Commit](https://img.shields.io/github/last-commit/pranjalsahay/Gradlens?style=for-the-badge&color=2c5364&label=Last%20Commit)
![License](https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge)

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-2c5364?style=for-the-badge)](https://your-deployed-app.vercel.app)
[![API Docs](https://img.shields.io/badge/📄_API_Docs-Swagger_UI-0f2027?style=for-the-badge)](https://your-backend.onrender.com/docs)

</div>

<br/>

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [How It Works](#-how-it-works)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Overview](#-api-overview)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Star History](#-star-history)
- [License](#-license)
- [Author](#-author)

<br/>

## 🧭 Overview

> **GradeLens** turns messy spreadsheets of grades and attendance into clear, predictive insight — so educators can spot struggling students *before* it's too late.

Upload a CSV, and GradeLens parses it, runs it through a machine learning pipeline, and surfaces an interactive dashboard packed with trends, risk scores, and visual analytics. Built as a modern full-stack app — Next.js on the front, FastAPI on the back, PostgreSQL underneath — and deployable to production in minutes.

<p align="right">(<a href="#-table-of-contents">back to top ↑</a>)</p>

<br/>

## ✨ Features

<table>
<tr>
<td width="50%">

### 📈 Performance Dashboard
A centralized, interactive view of grades, trends, and class-wide performance metrics.

### 📂 CSV Upload & Processing
Bulk-import student records with automated parsing, cleaning, and validation.

### 🎯 At-Risk Predictions
Machine learning models flag students who may need early intervention.

</td>
<td width="50%">

### 🗓️ Attendance & Trend Analysis
Correlate attendance patterns with academic outcomes over time.

### 📊 Interactive Visualizations
Rich, explorable charts that make data easy to understand and present.

### ☁️ Cloud-Native Deployment
Production-ready hosting on Vercel, Render, and Neon — out of the box.

</td>
</tr>
</table>

<p align="right">(<a href="#-table-of-contents">back to top ↑</a>)</p>

<br/>

## 🛠️ Tech Stack

<div align="center">

![Skills](https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind,fastapi,python,postgres,vercel&theme=dark)

| Layer | Technologies |
|:---|:---|
| **Frontend** | Next.js · React · TypeScript · Tailwind CSS |
| **Backend** | FastAPI · Python · SQLAlchemy |
| **Database** | PostgreSQL (hosted on Neon) |
| **Data & ML** | Pandas · NumPy · Scikit-learn |
| **Deployment** | Vercel · Render · Neon |

</div>

<p align="right">(<a href="#-table-of-contents">back to top ↑</a>)</p>

<br/>

## ⚙️ How It Works

```mermaid
flowchart LR
    A[📂 CSV Upload] --> B[🧹 Data Cleaning<br/>Pandas]
    B --> C[🤖 Risk Prediction<br/>Scikit-learn]
    C --> D[🗄️ Store Results<br/>PostgreSQL]
    D --> E[📊 Dashboard<br/>Next.js]
    E --> F((🎯 Insight for<br/>Educators))

    style A fill:#0f2027,color:#fff,stroke:#2c5364
    style B fill:#203a43,color:#fff,stroke:#2c5364
    style C fill:#2c5364,color:#fff,stroke:#2c5364
    style D fill:#2c5364,color:#fff,stroke:#2c5364
    style E fill:#203a43,color:#fff,stroke:#2c5364
    style F fill:#0f2027,color:#fff,stroke:#ffd700
```

<br/>

## 🏗️ Architecture

```mermaid
flowchart TB
    subgraph Client
        A[Next.js Frontend<br/>Vercel]
    end
    subgraph Server
        B[FastAPI Backend<br/>Render]
        D[Analytics Engine<br/>Pandas · NumPy · Scikit-learn]
    end
    subgraph Data
        C[(PostgreSQL<br/>Neon)]
    end

    A -- REST API / JSON --> B
    B -- SQLAlchemy --> C
    B --> D
    D --> C

    style A fill:#000000,color:#fff
    style B fill:#009688,color:#fff
    style D fill:#306998,color:#fff
    style C fill:#4169E1,color:#fff
```

<p align="right">(<a href="#-table-of-contents">back to top ↑</a>)</p>

<br/>

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

> 💡 Adjust this tree to match your actual folder layout if it differs.

<br/>

## 🚀 Getting Started

### Prerequisites

![Node](https://img.shields.io/badge/Node.js-≥18-339933?style=flat-square&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-≥3.10-3776AB?style=flat-square&logo=python&logoColor=white)
![Git](https://img.shields.io/badge/Git-required-F05032?style=flat-square&logo=git&logoColor=white)

You'll also need a PostgreSQL database — a free [Neon](https://neon.tech) project works perfectly.

<details>
<summary><b>🐍 Backend Setup</b> (click to expand)</summary>

<br/>

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

The API will be live at `http://localhost:8000`, with interactive Swagger docs at `http://localhost:8000/docs`.

</details>

<details>
<summary><b>⚛️ Frontend Setup</b> (click to expand)</summary>

<br/>

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local

# Run the development server
npm run dev
```

The app will be live at `http://localhost:3000`.

</details>

<p align="right">(<a href="#-table-of-contents">back to top ↑</a>)</p>

<br/>

## 🔐 Environment Variables

**Backend** — `backend/.env`

```env
DATABASE_URL=postgresql://user:password@host/dbname
ENVIRONMENT=development
CORS_ORIGINS=http://localhost:3000
```

**Frontend** — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

<br/>

## 🔌 API Overview

| Method | Endpoint | Description |
|:---|:---|:---|
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/api/upload` | Upload a CSV file of student records for processing |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/api/students` | Retrieve all student records |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/api/students/{id}` | Get details for a specific student |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/api/analytics/at-risk` | Get predictions for at-risk students |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/api/analytics/trends` | Get attendance and academic trend data |

Full interactive documentation is auto-generated by FastAPI and available at `/docs` once the backend is running.

<br/>

## ☁️ Deployment

<div align="center">

| Component | Platform | |
|:---|:---|:---|
| **Frontend** | Vercel | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new) |
| **Backend** | Render | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy) |
| **Database** | Neon | [Create a free database →](https://neon.tech) |

</div>

**Quick steps:**

1. Push your code to GitHub.
2. Create a Neon PostgreSQL database and copy the connection string.
3. Deploy `backend/` to Render as a Web Service, setting `DATABASE_URL` and other env vars.
4. Deploy `frontend/` to Vercel, setting `NEXT_PUBLIC_API_URL` to your Render backend URL.
5. Update CORS settings on the backend to allow your Vercel domain.

<p align="right">(<a href="#-table-of-contents">back to top ↑</a>)</p>

<br/>

## 🗺️ Roadmap

- [ ] Role-based access control (admin / teacher views)
- [ ] Email/notification alerts for at-risk students
- [ ] Exportable PDF performance reports
- [ ] Support for additional data sources beyond CSV
- [ ] Mobile-responsive dashboard improvements

<br/>

## 🤝 Contributing

Contributions are welcome and appreciated!

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m "Add your feature"`
4. Push the branch — `git push origin feature/your-feature`
5. Open a Pull Request

<div align="center">

![Contributors](https://contrib.rocks/image?repo=pranjalsahay/Gradlens)

</div>

<br/>

## ⭐ Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=pranjalsahay/Gradlens&type=Date)](https://star-history.com/#pranjalsahay/Gradlens&Date)

</div>

<br/>

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<br/>

## 👤 Author

<div align="center">

**Pranjal Sahay**

[![GitHub](https://img.shields.io/badge/GitHub-pranjalsahay-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pranjalsahay)

<br/>

### If GradeLens helped you, consider giving it a ⭐!

![footer](https://capsule-render.vercel.app/api?type=waving&color=0:2c5364,100:0f2027&height=120&section=footer)

</div>
