from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schema.notification import NotificationRequest
from app.services.notification import send_bulk_email

router = APIRouter(prefix="/notification", tags=["Notification"])


@router.post("/send")
async def send_notification(
    request: NotificationRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):

    background_tasks.add_task(
        send_bulk_email,
        db,
        request.subject,
        request.messages
    )

    return {
        "success": True,
        "message": "Notifications queued"
    }