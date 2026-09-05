import os
import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import PatientInterview
from schemas import InterviewSubmitRequest

router = APIRouter(prefix="/api", tags=["Interview"])

@router.get("/health")
def health_check():
    return {"status": "ok", "service": "MediKiosk Backend", "version": "1.0.0"}

@router.get("/questions/pain")
def get_pain_socrates_questions():
    """
    Returns the SOCRATES pain question tree JSON for Person 3 & Person 4 backend API integration.
    """
    json_path = os.path.join(os.path.dirname(__file__), "..", "..", "question-trees", "pain.json")
    if not os.path.exists(json_path):
        json_path = os.path.join(os.path.dirname(__file__), "..", "question-trees", "pain.json")

    try:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load SOCRATES question tree: {str(e)}")

@router.post("/interview/submit")
def submit_interview(req: InterviewSubmitRequest, db: Session = Depends(get_db)):
    """
    Receives patient answers, constructs structured case history, stores in PostgreSQL/SQLite database.
    """
    try:
        record = PatientInterview(
            patient_id=req.patient_id or "MEDI-1024",
            language=req.language or "English",
            chief_complaint=req.chief_complaint,
            answers_json=req.answers,
            structured_history={"chief_complaint": req.chief_complaint, "answers": req.answers}
        )
        db.add(record)
        db.commit()
        db.refresh(record)
        return {
            "status": "success",
            "interview_id": record.id,
            "patient_id": record.patient_id,
            "message": "Patient history saved successfully to database"
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error saving history: {str(e)}")
