from passlib.context import CryptContext

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