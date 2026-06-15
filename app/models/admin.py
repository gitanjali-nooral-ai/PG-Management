from sqlalchemy import Column, Integer, String
from app.models.base import Base


class Admin(Base):
    __tablename__ = "admin"

    id = Column(Integer, primary_key=True)

    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)

    password_hash = Column(String(255), nullable=False)

    security_question = Column(String(255), nullable=False)
    security_answer_hash = Column(String(255), nullable=False)