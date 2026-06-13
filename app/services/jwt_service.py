from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "3.14"
ALGORITHM = "HS256"

def create_access_token(admin_id: int):
    payload = {
        "sub": str(admin_id),
        "exp": datetime.utcnow() + timedelta(hours=12)
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)