from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schema.rooms import RoomUpload
from app.services.room_service import upload_room

router = APIRouter(prefix="/room", tags=["Room"])

@router.post("/upload")
def room_upload(request: RoomUpload, db: Session = Depends(get_db)):
    return upload_room(db, request)