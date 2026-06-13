from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schema.pgs import PGUpload
from app.services.pg_service import upload_pg

router = APIRouter(prefix="/pg", tags=["PG"])

@router.post("/upload")
def pg_upload(request: PGUpload, db: Session = Depends(get_db)):
    return upload_pg(db, request)