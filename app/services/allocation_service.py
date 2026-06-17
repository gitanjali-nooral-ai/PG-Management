from datetime import date
from sqlalchemy import func
from app.models.room import Room
from app.models.resident import Resident
from app.models.allocation import Allocation


def upload_allocation(db, request):

    allocation = Allocation(
        resident_id=request.resident_id,
        room_id=request.room_id,
        deposit=request.deposit,
        monthly_rent=request.monthly_rent,
        joining_date=request.joining_date,
        leaving_date=request.leaving_date
    )

    db.add(allocation)
    db.commit()
    db.refresh(allocation)

    return {
        "message": "Allocation created successfully",
        "allocation_id": allocation.id
    }

def allocate_bed(db, request):

    resident = db.query(Resident).filter(
        Resident.id == request.resident_id
    ).first()

    if not resident:
        return {"message": "Resident not found"}

    room = db.query(Room).filter(
        Room.id == request.room_id
    ).first()

    if not room:
        return {"message": "Room not found"}

    existing = db.query(Allocation).filter(
        Allocation.resident_id == request.resident_id,
        Allocation.leaving_date == None
    ).first()

    if existing:
        return {
            "message": "Resident already allocated"
        }

    occupied = db.query(
        func.count(Allocation.id)
    ).filter(
        Allocation.room_id == request.room_id,
        Allocation.leaving_date == None
    ).scalar()

    if occupied >= room.capacity:
        return {
            "message": "Room is full"
        }

    allocation = Allocation(
        resident_id=request.resident_id,
        room_id=request.room_id,
        deposit=request.deposit,
        monthly_rent=request.monthly_rent,
        joing_date=request.joing_date,
        leaving_date=None
    )

    db.add(allocation)

    resident.status = "Active"

    db.commit()
    db.refresh(allocation)

    return {
        "message": "Bed allocated successfully",
        "allocation_id": allocation.id
    }


def vacate_bed(db, resident_id):

    allocation = db.query(Allocation).filter(
        Allocation.resident_id == resident_id,
        Allocation.leaving_date == None
    ).first()

    if not allocation:
        return {
            "message": "No active allocation found"
        }

    allocation.leaving_date = date.today()

    resident = db.query(Resident).filter(
        Resident.id == resident_id
    ).first()

    if resident:
        resident.status = "Inactive"

    db.commit()

    return {
        "message": "Bed vacated successfully"
    }


def room_occupancy(db, room_id):

    room = db.query(Room).filter(
        Room.id == room_id
    ).first()

    if not room:
        return {"message": "Room not found"}

    occupied = db.query(
        func.count(Allocation.id)
    ).filter(
        Allocation.room_id == room_id,
        Allocation.leaving_date == None
    ).scalar()

    available = room.capacity - occupied

    return {
        "room_id": room.id,
        "room_number": room.room_number,
        "capacity": room.capacity,
        "occupied": occupied,
        "available": available
    }


def allocation_list(db):

    allocations = db.query(Allocation).filter(
        Allocation.leaving_date == None
    ).all()

    return allocations