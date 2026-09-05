from sqlalchemy import Column, String, Integer, DateTime, JSON, Text
from datetime import datetime
from database import Base

class PatientInterview(Base):
    __tablename__ = "patient_interviews"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String, index=True, default="MEDI-DEMO")
    language = Column(String, default="English")
    chief_complaint = Column(String, nullable=False)
    answers_json = Column(JSON, nullable=False)
    structured_history = Column(JSON, nullable=False)
    ai_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
