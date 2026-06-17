from datetime import date
from sqlalchemy import func

from app.models.room import Room
from app.models.allocation import Allocation


def add_room(db, request):

    existing_room = db.query(Room).filter(
        Room.pg_id == request.pg_id,
        Room.room_number == request.room_number
    ).first()

    if existing_room:
        return {
            "message": "Room number already exists in this PG"
        }

    room = Room(
        pg_id=request.pg_id,
        room_number=request.room_number,
        capacity=request.capacity,
        rent_amount=request.rent_amount
    )

    db.add(room)
    db.commit()
    db.refresh(room)

    return {
        "message": "Room added successfully",
        "room_id": room.id
    }


def edit_room(db, room_id, request):

    room = db.query(Room).filter(
        Room.id == room_id
    ).first()

    if not room:
        return {
            "message": "Room not found"
        }

    if request.room_number is not None:
        room.room_number = request.room_number

    if request.capacity is not None:
        room.capacity = request.capacity

    if request.rent_amount is not None:
        room.rent_amount = request.rent_amount

    db.commit()
    db.refresh(room)

    return {
        "message": "Room updated successfully"
    }


def delete_room(db, room_id):

    room = db.query(Room).filter(
        Room.id == room_id
    ).first()

    if not room:
        return {
            "message": "Room not found"
        }

    active_allocation = db.query(Allocation).filter(
        Allocation.room_id == room_id,
        Allocation.leaving_date == None
    ).first()

    if active_allocation:
        return {
            "message": "Room cannot be deleted. Residents are allocated."
        }

    db.delete(room)
    db.commit()

    return {
        "message": "Room deleted successfully"
    }


def get_room_list(db):

    rooms = db.query(Room).all()

    return [
        {
            "room_id": room.id,
            "pg_id": room.pg_id,
            "room_number": room.room_number,
            "capacity": room.capacity,
            "rent_amount": room.rent_amount
        }
        for room in rooms
    ]


def get_room_availability(db):

    today = date.today()

    rooms = db.query(Room).all()

    result = []

    for room in rooms:

        occupied = db.query(func.count(Allocation.id)).filter(
            Allocation.room_id == room.id,
            (
                (Allocation.leaving_date == None) |
                (Allocation.leaving_date >= today)
            )
        ).scalar()

        available = room.capacity - occupied

        result.append({
            "room_id": room.id,
            "room_number": room.room_number,
            "capacity": room.capacity,
            "occupied": occupied,
            "available": available,
            "status": "Available" if available > 0 else "Full"
        })

    return result