from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import smtplib
from email.mime.text import MIMEText
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'photoography')]

# Create the main app without a prefix
app = FastAPI(title="Gera Films API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=6, max_length=25)
    email: Optional[str] = None
    event_type: str = Field(..., min_length=2, max_length=80)
    event_date: Optional[str] = None  # ISO date string (flexible)
    message: Optional[str] = Field(default="", max_length=2000)


class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    event_type: str
    event_date: Optional[str] = None
    message: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Helper Functions ----------
def send_notification_email(inquiry: Inquiry):
    try:
        smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.environ.get("SMTP_PORT", 587))
        smtp_user = os.environ.get("SMTP_USER")
        smtp_pass = os.environ.get("SMTP_PASS")
        dest_email = os.environ.get("NOTIFICATION_EMAIL")

        if not all([smtp_user, smtp_pass, dest_email]):
            logging.error("Email configuration is missing")
            return

        subject = f"New Inquiry from {inquiry.name} - {inquiry.event_type}"
        body = f"""
        You have a new inquiry from your website:

        Name: {inquiry.name}
        Phone: {inquiry.phone}
        Email: {inquiry.email or 'N/A'}
        Event Type: {inquiry.event_type}
        Event Date: {inquiry.event_date or 'N/A'}
        
        Message:
        {inquiry.message or 'No message provided.'}

        Sent at: {inquiry.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}
        """

        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = smtp_user
        msg['To'] = dest_email

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
            logging.info(f"Notification email sent to {dest_email}")

    except Exception as e:
        logging.exception("Failed to send notification email")


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Gera Films API is running"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(payload: InquiryCreate, background_tasks: BackgroundTasks):
    try:
        inquiry = Inquiry(**payload.model_dump())
        doc = inquiry.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.inquiries.insert_one(doc)
        
        # Send notification email in background
        background_tasks.add_task(send_notification_email, inquiry)
        
        return inquiry
    except Exception as e:
        logging.exception("Failed to create inquiry")
        raise HTTPException(status_code=500, detail=f"Could not save inquiry: {str(e)}")


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries():
    items = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            try:
                it['created_at'] = datetime.fromisoformat(it['created_at'])
            except Exception:
                it['created_at'] = datetime.now(timezone.utc)
    return items


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)