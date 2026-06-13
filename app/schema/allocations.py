from pydantic import BaseModel
from datetime import date

class AllocationUpload(BaseModel):
    resident_id : int
    room_id : int
    deposit : float
    monthly_rent : float
    joining_date : date
    leaving_date : date