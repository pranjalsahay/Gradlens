
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routes import (
    auth,
    analytics,
    upload,
    predictions,
)

from app.db.database import engine
from app.models.student import Base


app = FastAPI(
    title="GradeLens API",
    description="AI-powered Student Performance Analytics Backend",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)


# ── Create DB Tables Automatically ─────────────────────────────
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(
            Base.metadata.create_all
        )


# ── CORS ──────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(analytics.router)
app.include_router(upload.router)
app.include_router(predictions.router)


# ── Health Routes ─────────────────────────────────────────────
@app.get("/", tags=["Health"])
def root():
    return {
        "status": "ok",
        "service": "GradeLens API",
        "version": "1.0.0",
    }


@app.get("/health", tags=["Health"])
def health():
    return {"status": "healthy"}

