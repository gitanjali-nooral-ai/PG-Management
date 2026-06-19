from fastapi import HTTPException

from app.models.admin import Admin
from app.config.security import encrypt 


def set_smtp_config(db, request):

    admin = db.query(Admin).first()

    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")

    admin.smtp_sender_email = request.sender_email
    admin.smtp_app_password = encrypt(request.app_password)

    db.commit()

    return {
        "message": "SMTP configuration saved successfully"
    }


def get_smtp_status(db):

    admin = db.query(Admin).first()

    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")

    return {
        "sender_email": admin.smtp_sender_email,
        "is_configured": bool(admin.smtp_sender_email and admin.smtp_app_password)
    }