from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schema.allocations import AllocationUpload
from app.services.allocation_service import upload_allocation

router = APIRouter(
    prefix="/allocation",
    tags=["Allocation"]
)


@router.post("/upload")
def allocation_upload(
    request: AllocationUpload,
    db: Session = Depends(get_db)
):
    return upload_allocation(db, request)