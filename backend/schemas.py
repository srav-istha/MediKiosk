from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
from datetime import datetime

class InterviewSubmitRequest(BaseModel):
    patient_id: Optional[str] = "MEDI-1024"
    language: Optional[str] = "English"
    chief_complaint: str
    answers: Dict[str, Any]

class DoctorSummaryRequest(BaseModel):
    patient_id: Optional[str] = "MEDI-1024"
    chief_complaint: str
    language: Optional[str] = "English"
    structured_history: Dict[str, Any]

class DoctorSummaryResponse(BaseModel):
    patient_id: str
    summary_text: str
    clinical_flags: List[str]
    sbar: Dict[str, str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
