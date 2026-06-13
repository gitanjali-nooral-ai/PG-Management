from pydantic import BaseModel
from datetime import date

class BillUpload(BaseModel):
    pg_id: int
    bill_date: date
    bill_amount: float
    bill_type: str