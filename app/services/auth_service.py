from app.models.admin import Admin
from app.services.security import hash_password, verify_password
from app.services.jwt_service import create_access_token
from app.services.security import verify_answer


def login(db, request):

    admin = (
        db.query(Admin)
        .filter(Admin.username == request.username)
        .first()
    )

    if not admin:
        return "Invalid Username"

    if not verify_password(request.password, admin.password_hash):
        return "Invalid Password"

    token = create_access_token(admin.id)

    return {
        "access_token": token,
        "token_type": "bearer"
    }

def get_security_question(db, request):

    admin = (
        db.query(Admin)
        .filter(Admin.username == request.username)
        .first()
    )

    if not admin:
        raise Exception("User not found")

    return {
        "security_question": admin.security_question
    }

def reset_password(db, request):

    admin = (
        db.query(Admin)
        .filter(Admin.username == request.username)
        .first()
    )

    if not admin:
        raise Exception("User not found")

    if not verify_answer(
        request.security_answer,
        admin.security_answer_hash
    ):
        raise Exception("Incorrect security answer")

    admin.password_hash = hash_password(request.new_password)

    db.commit()

    return {
        "message": "Password reset successful"
    }

