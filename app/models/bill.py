from sqlalchemy import Column, Integer, Float, ForeignKey, Date, String
from app.models.base import Base


class Bill(Base):
    __tablename__ = "bill"

    id = Column(Integer, primary_key=True, index=True)
    pg_id = Column(Integer,ForeignKey("pg.id"))
    bill_date = Column(Date)
    bill_amount = Column(Float)
    bill_type = Column(String(50))
   