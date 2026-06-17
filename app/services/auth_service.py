from fastapi import HTTPException

from app.models.admin import Admin
from app.config.security import (
    hash_password,
    verify_password,
    verify_answer
)
from app.services.jwt_service import create_access_token


def sign_up(db, request):

    existing_admin = db.query(Admin).first()

    if existing_admin:
        raise HTTPException(
            status_code=400,
            detail="Only one admin is allowed in the system"
        )

    admin = Admin(
        username=request.username,
        email=request.email,
        password_hash=hash_password(request.password),
        security_question=request.security_question,
        security_answer_hash=hash_password(request.security_answer)
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    return {
        "message": "Admin created successfully",
        "admin_id": admin.id
    }


def login(db, request):

    admin = db.query(Admin).filter(
        Admin.username == request.username
    ).first()

    if not admin:
        raise HTTPException(status_code=401, detail="Invalid username")

    if not verify_password(request.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token(admin.id)

    return {
        "access_token": token,
        "token_type": "bearer"
    }


def get_security_question(db, request):

    admin = db.query(Admin).filter(
        Admin.username == request.username
    ).first()

    if not admin:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "security_question": admin.security_question
    }


def reset_password(db, request):

    admin = db.query(Admin).filter(
        Admin.username == request.username
    ).first()

    if not admin:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_answer(request.security_answer, admin.security_answer_hash):
        raise HTTPException(status_code=401, detail="Incorrect security answer")

    admin.password_hash = hash_password(request.new_password)

    db.commit()

    return {
        "message": "Password reset successful"
    }


def delete_admin(db, request):

    admin = db.query(Admin).filter(
        Admin.username == request.username,
        Admin.password_hash == hash_password(request.password)
    ).first()

    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")

    if request.confirm != "DELETE":
        raise HTTPException(
            status_code=400,
            detail="Type DELETE to confirm admin deletion"
        )

    db.delete(admin)
    db.commit()

    return {
        "message": "Admin deleted successfully"
    }