from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


from app.schema.resident_movement import (
    ResidentExitRequest,
    ResidentEntryRequest,
    ResidentMovementResponse
)

from app.services.resident_movement_service import (
    resident_exit,
    resident_entry
)

from app.config.database import get_db


router = APIRouter(
    prefix="/residentmovement",
    tags=["Resident Movement"]
)



@router.post(
    "/exit",
    response_model=ResidentMovementResponse
)
def exit_resident(
    data: ResidentExitRequest,
    db: Session = Depends(get_db)
):

    return resident_exit(
        db,
        data.resident_id
    )



@router.post(
    "/entry",
    response_model=ResidentMovementResponse
)
def entry_resident(
    data: ResidentEntryRequest,
    db: Session = Depends(get_db)
):

    return resident_entry(
        db,
        data.resident_id
    )