from sqlalchemy import Column, Integer, Float, ForeignKey, Date
from app.models.base import Base


class Payment(Base):
    __tablename__ = "payment"

    id = Column(Integer, primary_key=True, index=True)
    resident_id = Column(Integer, ForeignKey("resident.id"))
    rent_id = Column(Integer, ForeignKey("rent.id"))
    amount_paid = Column(Float)
    pay_date = Column(Date)