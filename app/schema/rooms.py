from pydantic import BaseModel
from typing import Optional

class RoomCreate(BaseModel):

    pg_id : int 
    capacity : int
    room_number : int
    room_rent : float

class RoomUpdate(BaseModel):
    room_number: Optional[int] = None
    capacity: Optional[int] = None
    rent_amount: Optional[float] = None