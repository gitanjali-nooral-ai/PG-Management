from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.services.report_service import *

router = APIRouter(
    prefix="/report",
    tags=["Reports"]
)


@router.get("/yearly/{year}")
def yearly_report(
    year: int,
    db: Session = Depends(get_db)
):
    return get_yearly_report(db, year)

@router.get("/yearly/{year}/pdf")
def download_report(
    year: int,
    db: Session = Depends(get_db)
):
    return generate_report_pdf(db, year)