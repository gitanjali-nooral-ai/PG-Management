from pydantic import ( BaseModel, Field )
from typing import Optional

class RoomCreate(BaseModel):

    pg_id : int 
    capacity : int = Field( gt=0)
    room_number : int = Field( gt=0)
    room_rent : float = Field( gt=0)

class RoomUpdate(BaseModel):
    room_number: Optional[int] = Field( default=None, gt=0 )
    capacity: Optional[int] = Field( default=None, gt=0 )
    rent_amount: Optional[float] = Field( default=None, gt=0 )