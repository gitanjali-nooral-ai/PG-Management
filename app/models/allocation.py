from sqlalchemy import Column, Integer, Float, ForeignKey, Date
from app.models.base import Base


class Allocation(Base):
    __tablename__ = "allocation"

    id = Column(Integer, primary_key=True, index=True)
    resident_id = Column(Integer, ForeignKey("resident.id"))
    room_id = Column(Integer, ForeignKey("room.id"))
    deposit = Column(Float)
    monthly_rent = Column(Float)
    joing_date = Column(Date)
    leaving_date = Column(Date)
    