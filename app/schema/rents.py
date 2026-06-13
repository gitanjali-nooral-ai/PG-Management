from pydantic import BaseModel

class RentUpload(BaseModel):
    resident_id : int
    room_id : int
    month : int
    year : int
    rent_amount : float