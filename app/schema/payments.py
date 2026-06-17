from pydantic import BaseModel
from datetime import date

class PaymentUpload(BaseModel):
    resident_id : int
    rent_id : int
    amount_paid : float
    payment_date : date
