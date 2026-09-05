# 🏥 MediKiosk — AI-Assisted Patient Pre-Consultation System

> **Transforming 10-minute clinical visits through systematic, patient-driven pre-consultation history elicitation.**

---

## 🎯 Project Aim & Problem Statement

### The Clinical Problem
In outpatient clinics across India and worldwide, a physician typically has **10 to 15 minutes per patient**. Within this tight window, the physician must simultaneously:
1. Elicit detailed clinical history
2. Conduct physical examination
3. Review prior lab/imaging records
4. Formulate differential diagnoses
5. Counsel the patient and write prescriptions

This workload often results in:
- ❌ **Under-elicitation of clinical history** due to lack of time
- ❌ **Missed comorbidities and critical symptoms**
- ❌ **Frustrating, repeated questioning** across multiple hospital visits
- ❌ **Increased risk of diagnostic errors**

### The MediKiosk Solution
**MediKiosk** empowers patients to complete a structured, touch-optimized clinical questionnaire in the waiting area **before** entering the doctor's office. 

By gathering history systematically using standard medical frameworks (e.g., **SOCRATES pain framework**), MediKiosk converts patient responses into an objective, SBAR-formatted **AI Doctor Summary** ready for instantaneous physician review.

---

## ✨ Key Features & Capabilities

* 🌐 **12 Major Indian Languages**: Native script selection (English, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Urdu, Kannada, Malayalam, Odia, Punjabi).
* 🩺 **SOCRATES Pain Framework**: Structured elicitation of Site, Onset, Character, Radiation, Associated Symptoms, Timing, Exacerbating/Relieving Factors, and Severity.
* 👆 **Touch-Optimized Kiosk UI**: Large tap targets designed for kiosk hardware & tablets.
* 🧘 **Interactive Body Pain Diagram**: SVG body silhouette allowing patients to tap and mark exact pain locations.
* 🤖 **AI Doctor Summary (SBAR Format)**: Synthesizes chief complaint, HPI, PMH, ROS, and pain breakdown into a Situation-Background-Assessment-Recommendation summary.
* 🛡️ **Physician Safety Guardrail**: AI strictly synthesizes patient history for physician verification — **it does NOT render autonomous medical diagnoses**.
* 💾 **PostgreSQL / SQLite Database Storage**: Complete data persistence for pre-consultation case histories.
* 📄 **Print & JSON Export**: Patient verification screen with one-click print and structured JSON export.

---

## 🌿 Multi-Role Repository Architecture

| Role | Branch | Component & Responsibilities |
|---|---|---|
| 👤 **Person 1** | `frontend-language` | Welcome screen, 12 Indian Languages selector, Chief Complaint picker grid & custom text input |
| 👤 **Person 2** | `frontend-interview` | Step-by-step Questionnaire Wizard, 6 Input Components, Navigation, Progress Bar, Structured History |
| 👤 **Person 3** | `question-tree` | `question-trees/pain.json` implementing the 8 SOCRATES pain framework categories |
| 👤 **Person 4** | `backend` | Python FastAPI architecture (`backend/main.py`), PostgreSQL / SQLite engine, Database Models & API endpoints |
| 👤 **Person 5** | `ai-summary` | `backend/services/llm_service.py` SBAR summary generator & `DoctorSummary.jsx` physician review component |
| 👤 **Person 6** | `integration` | 8-screen complete prototype integration, CORS setup, production build validation & branch merges |

---

## 🏗️ Tech Stack

* **Frontend**: React 19, Vite 8, CSS3 (Vanilla Glassmorphism Design System)
* **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic v2
* **Database**: PostgreSQL (with automatic SQLite fallback for zero-dependency local testing)
* **AI Service**: LLM API Integration (Gemini / OpenAI) with SBAR clinical history synthesis engine

---

## 🚀 How to Run locally

### 1️⃣ Run the Python FastAPI Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Launch FastAPI server
python main.py
```
* Backend API: **`http://localhost:8000`**
* Interactive API Docs (Swagger UI): **`http://localhost:8000/docs`**

---

### 2️⃣ Run the React Frontend Kiosk UI

```bash
# Install frontend dependencies
npm install

# Start Vite dev server
npm run dev
```
* Frontend Kiosk App: **`http://localhost:5173`**

---

## 📂 Folder Structure

```
MediKiosk/
├── backend/                  # Python FastAPI Backend (Person 4 & 5)
│   ├── main.py               # FastAPI entry point & CORS
│   ├── database.py           # PostgreSQL/SQLite database engine
│   ├── models.py             # SQLAlchemy ORM models
│   ├── schemas.py            # Pydantic validation schemas
│   ├── requirements.txt      # Python dependencies
│   ├── routers/              # API routes (interview.py, summary.py)
│   └── services/             # AI LLM summary service (llm_service.py)
├── question-trees/           # SOCRATES Question Trees (Person 3)
│   └── pain.json             # SOCRATES pain evaluation framework
├── src/                      # React Frontend Source (Person 1, 2, 5 & 6)
│   ├── components/           # InterviewScreen, ProgressBar, StructuredHistory, DoctorSummary
│   │   └── inputs/           # 6 touch-optimized input controls (BodyDiagram, Scale, Choice cards)
│   ├── data/                 # languages.js & questionTree.js
│   ├── pages/                # Home, Login, Consent, Language, ChiefComplaint
│   ├── App.jsx               # Integrated 8-screen state machine
│   └── index.css             # Unified Glassmorphism Design System
├── requirements.txt          # Root Python dependencies
├── package.json              # Vite + React package configuration
└── README.md                 # Project Documentation
```
