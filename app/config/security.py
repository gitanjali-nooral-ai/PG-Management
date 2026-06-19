from cryptography.fernet import Fernet
from app.config.email import ENCRYPTION_KEY

from passlib.context import CryptContext

cipher = Fernet(ENCRYPTION_KEY.encode())


def encrypt(text: str) -> str:
    return cipher.encrypt(text.encode()).decode()


def decrypt(text: str) -> str:
    return cipher.decrypt(text.encode()).decode()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    bcrypt__rounds=12,
    deprecated="auto"
)

def hash_password(password: str):
    if len(password) > 72:
        password = password[:72]
    return pwd_context.hash(password)


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


def hash_answer(answer: str):
    return pwd_context.hash(answer)


def verify_answer(plain, hashed):
    return pwd_context.verify(plain, hashed)