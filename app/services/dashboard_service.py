from sqlalchemy import func
from app.models.bill import Bill
from app.models.resident import Resident
from app.models.room import Room
from app.models.complaint import Complaint
from app.models.pg import PG
from app.models.allocation import Allocation


def get_dashboard_data(db):

    total_collection = db.query(
        func.sum(Bill.bill_amount)
    ).scalar() or 0

    residents = db.query(
        func.count(Resident.id)
    ).scalar() or 0

    rooms = db.query(
        func.count(Room.id)
    ).scalar() or 0

    total_capacity = db.query(
        func.sum(Room.capacity)
    ).scalar() or 0

    occupied = db.query(
        func.count(Allocation.id)
    ).scalar() or 0

    available_rooms = total_capacity - occupied

    complaints = db.query(
        func.count(Complaint.id)
    ).scalar() or 0

    pgs = db.query(
        func.count(PG.id)
    ).scalar() or 0

    return {
        "residents": residents,
        "rooms": rooms,
        "availableRooms": available_rooms,
        "complaints": complaints,
        "pgs": pgs,
        "collection": total_collection
    }