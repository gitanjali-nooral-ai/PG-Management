from app.models.room import Room

def upload_room(db, request):

    room = Room(
        pg_id=request.pg_id,
        capacity=request.capacity,
        room_number=request.room_number,
        room_rent=request.room_rent
    )

    db.add(room)
    db.commit()
    db.refresh(room)

    return {
        "message": "Room created successfully",
        "room_id": room.id
    }