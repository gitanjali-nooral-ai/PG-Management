from sqlalchemy import Column, Integer, Float, ForeignKey
from app.models.base import Base


class Rent(Base):
    __tablename__ = "rent"

    id = Column(Integer, primary_key=True, index=True)
    resident_id = Column(Integer, ForeignKey("resident.id"))
    room_id = Column(Integer, ForeignKey("room.id"))
    month = Column(Integer)
    year = Column(Integer)
    rent_amount = Column(Float,nullable=False)
