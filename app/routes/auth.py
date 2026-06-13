from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schema.auth import *
from app.services.auth_service import *

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def login_api(request: LoginRequest, db: Session = Depends(get_db)):
    return login(db, request)

@router.post("/security-question")
def question_api(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    return get_security_question(db, request)

@router.post("/reset-password")
def reset_api(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    return reset_password(db, request)