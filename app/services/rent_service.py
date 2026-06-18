from sqlalchemy import func
from app.models.rent import Rent
from app.models.payment import Payment
from app.models.resident import Resident
from app.models.room import Room
from app.models.allocation import Allocation


def upload_rent(db,request):

    resident=db.query(Resident).filter(
        Resident.id==request.resident_id
    ).first()

    if not resident:
        return {
            "message":"Resident not found"
        }

    room=db.query(Room).filter(
        Room.id==request.room_id
    ).first()

    if not room:
        return {
            "message":"Room not found"
        }

    allocation=db.query(Allocation).filter(
        Allocation.resident_id==request.resident_id,
        Allocation.room_id==request.room_id,
        Allocation.leaving_date==None
    ).first()

    if not allocation:
        return {
            "message":"Resident is not allocated to this room"
        }

    existing=db.query(Rent).filter(
        Rent.resident_id==request.resident_id,
        Rent.month==request.month,
        Rent.year==request.year
    ).first()

    if existing:
        return {
            "message":"Rent already uploaded for this month"
        }

    rent=Rent(
        resident_id=request.resident_id,
        room_id=request.room_id,
        month=request.month,
        year=request.year,
        rent_amount=room.rent_amount
    )

    db.add(rent)
    db.commit()
    db.refresh(rent)

    return {
        "message":"Rent uploaded successfully",
        "rent_id":rent.id
    }


def get_rent_collection(db):

    total_rent=db.query(
        func.sum(Rent.rent_amount)
    ).scalar() or 0

    return {
        "total_rent_collection":total_rent
    }


def get_rent_history(db,resident_id):

    rents=db.query(Rent).filter(
        Rent.resident_id==resident_id
    ).all()

    history=[]

    for rent in rents:

        paid_amount=db.query(
            func.sum(Payment.amount_paid)
        ).filter(
            Payment.rent_id==rent.id
        ).scalar() or 0

        history.append({
            "rent_id":rent.id,
            "month":rent.month,
            "year":rent.year,
            "rent_amount":float(rent.rent_amount),
            "paid_amount":paid_amount,
            "due_amount":float(rent.rent_amount)-paid_amount
        })

    return history