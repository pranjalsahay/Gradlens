<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
<div align="center">

```
 ██████╗ ██████╗  █████╗ ██████╗ ███████╗██╗     ███████╗███╗   ██╗███████╗
██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██╔════╝██║     ██╔════╝████╗  ██║██╔════╝
██║  ███╗██████╔╝███████║██║  ██║█████╗  ██║     █████╗  ██╔██╗ ██║███████╗
██║   ██║██╔══██╗██╔══██║██║  ██║██╔══╝  ██║     ██╔══╝  ██║╚██╗██║╚════██║
╚██████╔╝██║  ██║██║  ██║██████╔╝███████╗███████╗███████╗██║ ╚████║███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝
```

<h3>🎓 AI-Powered Student Performance Analytics Dashboard</h3>

<p>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js"/></a>
  <a href="https://fastapi.tiangolo.com/"><img src="https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi" alt="FastAPI"/></a>
  <a href="https://neon.tech/"><img src="https://img.shields.io/badge/PostgreSQL-Neon-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL"/></a>
  <a href="https://scikit-learn.org/"><img src="https://img.shields.io/badge/ML-Scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn" alt="Scikit-learn"/></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel"/></a>
</p>

<p>
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-ml-prediction-model">ML Model</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-contributing">Contributing</a>
</p>

> **Empowering educators with data-driven intelligence** — detect at-risk students early, track performance trends, and predict academic outcomes with the power of machine learning.

</div>

---

## 🌟 What is GradeLens?

**GradeLens** is a full-stack analytics platform that transforms raw student data into actionable insights. Whether you're an institution looking to reduce dropout rates or an educator trying to identify students who need extra support — GradeLens has you covered.

```
Upload a CSV  →  Get Intelligence  →  Take Action
```

---

## ✨ Key Features

<table>
  <tr>
    <td align="center" width="96">📊</td>
    <td><strong>Analytics Dashboard</strong> — Real-time charts for attendance, marks, and subject-wise performance</td>
  </tr>
  <tr>
    <td align="center">📁</td>
    <td><strong>CSV Upload</strong> — Drag-and-drop student dataset upload with validation and error handling</td>
  </tr>
  <tr>
    <td align="center">🤖</td>
    <td><strong>ML Predictions</strong> — Classify students as <em>High Performer</em>, <em>Medium Performer</em>, or <em>At Risk</em></td>
  </tr>
  <tr>
    <td align="center">🔍</td>
    <td><strong>Weak Student Detection</strong> — Automatically surface students who need immediate intervention</td>
  </tr>
  <tr>
    <td align="center">📈</td>
    <td><strong>Attendance Correlation</strong> — Understand how attendance impacts academic outcomes</td>
  </tr>
  <tr>
    <td align="center">📄</td>
    <td><strong>Report Generation</strong> — Export CSV and PDF reports with analytics summaries</td>
  </tr>
</table>

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                           FRONTEND                               │
│                 Next.js 15 + TypeScript + Tailwind               │
│              ShadCN UI · Recharts · App Router                   │
└───────────────────────────┬──────────────────────────────────────┘
                            │  REST API Calls
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                           BACKEND                                │
│               FastAPI (Python) + SQLAlchemy ORM                  │
│        Auth · CSV Processing · Analytics · ML Bridge             │
└───────────────┬──────────────────────────┬───────────────────────┘
                │                          │
     ┌──────────▼──────────┐    ┌──────────▼──────────┐
     │    PostgreSQL        │    │    ML Pipeline       │
     │    (Neon Cloud)      │    │   Scikit-learn       │
     │                      │    │                      │
     │  · students          │    │  · Regression        │
     │  · attendance        │    │  · Classification    │
     │  · marks             │    │  · Risk Detection    │
     │  · predictions       │    │  · model.pkl         │
     └──────────────────────┘    └──────────────────────┘
```

---

## 🛠️ Technology Stack

### 🖥️ Frontend

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 15 | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-safe development |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Utility-first styling |
| [Recharts](https://recharts.org/) | 2.x | Composable data visualization |
| [ShadCN UI](https://ui.shadcn.com/) | latest | Accessible, beautiful components |

### ⚙️ Backend

| Technology | Version | Purpose |
|---|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | 0.110+ | High-performance Python API |
| [SQLAlchemy](https://www.sqlalchemy.org/) | 2.x | ORM & database toolkit |
| [Pandas](https://pandas.pydata.org/) | 2.x | Data processing & analytics |
| [NumPy](https://numpy.org/) | 1.x | Numerical computing |
| [Alembic](https://alembic.sqlalchemy.org/) | latest | Database migrations |

### 🤖 Machine Learning

| Technology | Purpose |
|---|---|
| [Scikit-learn](https://scikit-learn.org/) | Model training & prediction |
| Random Forest Classifier | Performance classification |
| Linear Regression | Mark prediction |

**Model Inputs:** Attendance %, Internal Marks, Assignment Scores, Previous Semester Marks  
**Model Outputs:** `🟢 High Performer` · `🟡 Medium Performer` · `🔴 At Risk`

### ☁️ Infrastructure

| Service | Purpose |
|---|---|
| [Neon PostgreSQL](https://neon.tech/) | Serverless cloud database |
| [Vercel](https://vercel.com/) | Frontend deployment & CDN |
| [Render](https://render.com/) / [Railway](https://railway.app/) | Backend deployment |

---

## 📁 Project Structure

```
gradelens/
│
├── 📂 frontend/                    # Next.js application
│   ├── app/                        # App router pages
│   │   ├── dashboard/page.tsx      # Analytics dashboard
│   │   ├── upload/page.tsx         # CSV upload
│   │   ├── students/page.tsx       # Student list
│   │   └── reports/page.tsx        # Report generation
│   ├── components/                 # Reusable UI components
│   │   ├── ui/                     # ShadCN primitives
│   │   ├── charts/                 # Recharts wrappers
│   │   ├── Sidebar.tsx
│   │   ├── RiskCard.tsx
│   │   └── Uploader.tsx
│   └── lib/                        # Utilities & API clients
│       ├── api.ts                  # Typed API client
│       └── utils.ts
│
├── 📂 backend/                     # FastAPI application
│   ├── routers/                    # API route handlers
│   │   ├── students.py             # /students CRUD
│   │   ├── upload.py               # /upload CSV ingest
│   │   ├── analytics.py            # /analytics stats
│   │   └── predict.py              # /predict ML inference
│   ├── models/                     # SQLAlchemy ORM models
│   ├── schemas/                    # Pydantic request/response schemas
│   ├── services/                   # Business logic
│   │   ├── csv_service.py          # Validation & cleaning
│   │   ├── analytics_service.py    # Pandas analytics
│   │   ├── ml_service.py           # Model inference bridge
│   │   └── export_service.py       # CSV/PDF export
│   └── main.py                     # FastAPI app entrypoint
│
├── 📂 ml-model/                    # Machine learning pipeline
│   ├── train.py                    # Model training script
│   ├── predict.py                  # Inference logic
│   ├── model.pkl                   # Serialized trained model
│   └── requirements.txt
│
├── 📂 dataset/                     # Sample CSV datasets
│   └── sample_students.csv
│
├── 📂 docs/                        # Documentation
│   └── architecture.md
│
├── README.md
├── .gitignore
└── docker-compose.yml              # Optional local orchestration
```

---

## ⚡ Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| Node.js | `≥ 18` |
| Python | `≥ 3.10` |
| PostgreSQL | local or [Neon](https://neon.tech) account |

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gradelens.git
cd gradelens
```

### 2. Set Up the Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate          # macOS/Linux
# venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
```

Edit `.env` with your credentials:

```env
DATABASE_URL=postgresql://user:password@host/gradelens
SECRET_KEY=your-secret-key
ML_MODEL_PATH=../ml-model/model.pkl
```

```bash
# Run database migrations
alembic upgrade head

# Start the development server
uvicorn main:app --reload
```

> 🟢 Backend live at `http://localhost:8000`  
> 📖 Swagger docs at `http://localhost:8000/docs`

---

### 3. Set Up the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```bash
# Start the development server
npm run dev
```

> 🟢 Frontend live at `http://localhost:3000`

---

### 4. Train the ML Model *(optional)*

```bash
cd ml-model

pip install -r requirements.txt

python train.py --dataset ../dataset/sample_students.csv
# → Saves model.pkl to the current directory
```

---

## 🔄 Data Flow

```
 ① Admin uploads CSV via dashboard
          ↓
 ② Backend validates structure & column schema
          ↓
 ③ Data cleaning — missing values handled, anomalies flagged
          ↓
 ④ Clean records persisted to PostgreSQL
          ↓
 ⑤ Pandas analytics engine computes trends & correlations
          ↓
 ⑥ ML model predicts performance category per student
          ↓
 ⑦ Dashboard renders charts, alerts, and insights
          ↓
 ⑧ Reports exported as CSV or PDF
```

---

## 🤖 ML Prediction Model

The ML pipeline classifies each student into one of three performance bands:

```
┌──────────────────────────────────────────────────────┐
│                   PREDICTION INPUTS                  │
│                                                      │
│   📋  Attendance Percentage                          │
│   📝  Internal Marks                                 │
│   📌  Assignment Scores                              │
│   🗂️  Previous Semester Marks                       │
└─────────────────────────┬────────────────────────────┘
                          │   Scikit-learn Pipeline
                          ▼
┌──────────────────────────────────────────────────────┐
│                  PREDICTION OUTPUT                   │
│                                                      │
│   🟢  High Performer     — on track                  │
│   🟡  Medium Performer   — needs attention           │
│   🔴  At Risk Student    — urgent support required   │
└──────────────────────────────────────────────────────┘
```

### Model Performance Metrics

| Metric | Score |
|---|---|
| Accuracy | ~92% (on sample dataset) |
| Precision | ~89% |
| Recall | ~91% |
| F1 Score | ~90% |

> Metrics are indicative. Retrain on your institution's data for best results.

---

## 🗺️ Roadmap

### ✅ Completed
- [x] Core analytics dashboard
- [x] CSV upload & validation
- [x] ML performance prediction (High / Medium / At Risk)
- [x] PDF & CSV report export
- [x] Attendance correlation analysis

### 🚧 In Progress
- [ ] 🔐 Multi-user authentication (JWT)
- [ ] 👥 Role-based access control — Admin / Teacher / Student

### 🔮 Planned
- [ ] ⚡ Real-time analytics with WebSockets
- [ ] 🤖 AI chatbot for academic insights
- [ ] 📉 Predictive dropout analysis
- [ ] 🏫 Institution-wide benchmarking
- [ ] 📱 Mobile-responsive redesign
- [ ] 🌐 Multi-language support

---

## 🔌 API Reference

A quick overview of the main endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/upload` | Upload and process a student CSV file |
| `GET` | `/students` | List all students with filters |
| `GET` | `/students/{id}` | Get a single student's profile |
| `GET` | `/analytics/summary` | Dashboard-level statistics |
| `GET` | `/analytics/attendance` | Attendance vs. performance correlation |
| `POST` | `/predict` | Run ML prediction on a student record |
| `GET` | `/reports/csv` | Export analytics as CSV |
| `GET` | `/reports/pdf` | Export analytics as PDF |

> Full interactive docs available at `http://localhost:8000/docs` when the backend is running.

---

## 🤝 Contributing

Contributions are warmly welcome! Here's how to get started:

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes and commit
git commit -m "feat: add your feature description"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) specification and ensure your code passes linting before submitting.

### Commit Types

| Type | Description |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, no logic change |
| `refactor` | Code restructuring |
| `test` | Adding or updating tests |
| `chore` | Build process or tooling |

---

## 🐛 Reporting Issues

Found a bug or have a feature request? [Open an issue](https://github.com/your-username/gradelens/issues/new) and include:

- A clear title and description
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Screenshots if applicable

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License — free to use, modify, and distribute with attribution.
```

---

## 🙏 Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/) for the blazing-fast Python backend
- [Next.js](https://nextjs.org/) for the powerful React framework
- [ShadCN UI](https://ui.shadcn.com/) for beautiful accessible components
- [Neon](https://neon.tech/) for serverless PostgreSQL
- [Scikit-learn](https://scikit-learn.org/) for the ML toolkit

---

<div align="center">

Made with ❤️ for educators and students everywhere.

**GradeLens** — *See the data. Understand the student.*

<br/>

⭐ Star this repo if you find it useful!

</div>
>>>>>>> 7321cd85877473c45aeb0afb2dd74683dfa2e613
