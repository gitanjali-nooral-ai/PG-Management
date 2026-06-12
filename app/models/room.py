from sqlalchemy import Column, Integer, Float, ForeignKey
from app.models.base import Base


class Room(Base):
    __tablename__ = "room"

    id = Column(Integer, primary_key=True, index=True)
    pg_id = Column(Integer, ForeignKey("pg.id"))
    capacity = Column(Integer)
    room_number = Column(Integer)
    rent_amount = Column(Float)