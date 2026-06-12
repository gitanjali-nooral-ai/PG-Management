from sqlalchemy import Column, Integer, String
from app.models.base import Base


class PG(Base):
    __tablename__ = "pg"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    total_rooms = Column(Integer, nullable=False)