from pydantic import BaseModel

class RoomUpload(BaseModel):

    pg_id : int 
    capacity : int
    room_number : int
    room_rent : float