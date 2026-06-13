from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schema.residents import ResidentUpload
from app.services.resident_service import upload_resident

router = APIRouter(prefix="/resident", tags=["Resident"])


@router.post("/upload")
def resident_upload(request: ResidentUpload, db: Session = Depends(get_db)):
    return upload_resident(db, request)