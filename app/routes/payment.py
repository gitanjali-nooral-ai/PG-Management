from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schema.payments import PaymentUpload
from app.services.payment_service import upload_payment

router = APIRouter(prefix="/payment", tags=["Payment"])

@router.post("/upload")
def payment_upload(request: PaymentUpload, db: Session = Depends(get_db)):
    return upload_payment(db, request)