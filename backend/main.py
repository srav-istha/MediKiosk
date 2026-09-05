from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers.interview import router as interview_router
from routers.summary import router as summary_router

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MediKiosk Backend API",
    description="Python FastAPI backend powering SOCRATES medical questionnaire, PostgreSQL storage, and AI Doctor Summaries",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(interview_router)
app.include_router(summary_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
