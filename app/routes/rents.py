from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.services.rent_service import *

router = APIRouter(
    prefix="/rent",
    tags=["Rent"]
)

@router.post("/upload")
def upload(request, db: Session = Depends(get_db)):
    return upload_rent(db, request)

@router.get("/collection")
def collection(db: Session = Depends(get_db)):
    return get_rent_collection(db)

@router.get("/history/{resident_id}")
def history(resident_id: int, db: Session = Depends(get_db)):
    return get_rent_history(db, resident_id)