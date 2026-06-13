from pydantic import BaseModel
from datetime import date

class PaymentUpload(BaseModel):
    resident_id : int
    rent_id : int
    payment : float
    payment_date : date
