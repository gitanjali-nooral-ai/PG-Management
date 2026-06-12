from sqlalchemy import Column, Integer, Date, String
from app.models.base import Base


class Resident(Base):
    __tablename__ = "resident"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(200))
    mobile_no = Column(String(20))
    email = Column(String(50))
    DOB = Column(Date)
    permenant_address = Column(String(200))
    aadhar = Column(String(20))
    status = Column(String(20))