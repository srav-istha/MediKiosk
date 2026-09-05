from fastapi import APIRouter, HTTPException
from schemas import DoctorSummaryRequest, DoctorSummaryResponse
from services.llm_service import generate_ai_doctor_summary

router = APIRouter(prefix="/api/summary", tags=["AI Summary"])

@router.post("/generate", response_model=DoctorSummaryResponse)
async def generate_summary(req: DoctorSummaryRequest):
    """
    Person 5 & 6 API Endpoint:
    Receives structured case history, passes to AI summary service, returns concise doctor-friendly summary.
    Does NOT render autonomous diagnosis.
    """
    try:
        result = await generate_ai_doctor_summary(
            patient_id=req.patient_id or "MEDI-1024",
            chief_complaint=req.chief_complaint,
            language=req.language or "English",
            history_dict=req.structured_history
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate AI doctor summary: {str(e)}")
