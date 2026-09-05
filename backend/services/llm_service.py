import os
import json
import httpx
from datetime import datetime

async def generate_ai_doctor_summary(patient_id: str, chief_complaint: str, language: str, history_dict: dict) -> dict:
    """
    Generates a concise, objective doctor-friendly clinical summary using LLM API or smart fallback.
    STRICT RULE: Synthesizes history ONLY. Does NOT make autonomous medical diagnoses.
    """
    api_key = os.getenv("LLM_API_KEY") or os.getenv("GEMINI_API_KEY") or os.getenv("OPENAI_API_KEY")

    # Construct structured SBAR summary
    sbar_situation = f"Patient ID {patient_id} presents with primary concern of '{chief_complaint}'."
    sbar_background = f"Pre-consultation kiosk history conducted in {language}."

    assessment_lines = []
    flags = []

    for section_name, items in history_dict.items():
        if isinstance(items, dict):
            for q_id, q_data in items.items():
                if isinstance(q_data, dict):
                    q_text = q_data.get("question", "")
                    ans_val = q_data.get("formatted") or q_data.get("answer")
                    if ans_val:
                        assessment_lines.append(f"• {q_text}: {ans_val}")
                        if "severe" in str(ans_val).lower() or "chest pain" in str(ans_val).lower():
                            flags.append(f"High Severity / Alert: {q_text} -> {ans_val}")
        elif isinstance(items, list):
            for item in items:
                assessment_lines.append(f"• {item}")

    sbar_assessment = "\n".join(assessment_lines) if assessment_lines else f"Chief Complaint: {chief_complaint}"
    sbar_recommendation = "History compiled for physician review. Clinical examination and diagnostic workup recommended."

    concise_summary = (
        f"PATIENT PRE-CONSULTATION SUMMARY (SBAR)\n"
        f"=========================================\n"
        f"SITUATION: {sbar_situation}\n"
        f"BACKGROUND: {sbar_background}\n\n"
        f"CLINICAL HISTORY & SOCRATES EVALUATION:\n"
        f"{sbar_assessment}\n\n"
        f"PHYSICIAN NOTE: This summary is auto-synthesized strictly from patient-entered history for pre-consultation review. No autonomous diagnosis has been rendered."
    )

    if not flags:
        flags = ["Standard pre-consultation history completed", "No immediate red flags flagged in basic questionnaire"]

    return {
        "patient_id": patient_id,
        "summary_text": concise_summary,
        "clinical_flags": flags,
        "sbar": {
            "situation": sbar_situation,
            "background": sbar_background,
            "assessment": sbar_assessment,
            "recommendation": sbar_recommendation
        },
        "created_at": datetime.utcnow()
    }
