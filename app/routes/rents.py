from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schema.rents import RentUpload
from app.services.rent_service import upload_rent

router = APIRouter(prefix="/rent", tags=["Rent"])

@router.post("/upload")
def rent_upload(request: RentUpload, db: Session = Depends(get_db)):
    return upload_rent(db, request)