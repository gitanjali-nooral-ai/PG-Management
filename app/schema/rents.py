from pydantic import BaseModel,Field

class RentUpload(BaseModel):
    resident_id:int
    room_id:int
    month:int=Field(ge=1,le=12)
    year:int=Field(ge=2000,le=2100)
    rent_amount:float=Field(gt=0)