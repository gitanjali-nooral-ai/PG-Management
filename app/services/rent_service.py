from sqlalchemy import func
from app.models.rent import Rent
from app.models.payment import Payment


def upload_rent(db, request):

    rent = Rent(
        resident_id=request.resident_id,
        room_id=request.room_id,
        month=request.month,
        year=request.year,
        rent_amount=request.rent_amount
    )

    db.add(rent)
    db.commit()
    db.refresh(rent)

    return {
        "message": "Rent uploaded successfully",
        "rent_id": rent.id
    }


def get_rent_collection(db):

    total_rent = db.query(
        func.sum(Rent.rent_amount)
    ).scalar() or 0

    return {
        "total_rent_collection": total_rent
    }


def get_rent_history(db, resident_id):

    rents = db.query(Rent).filter(
        Rent.resident_id == resident_id
    ).all()

    history = []

    for rent in rents:

        paid_amount = db.query(
            func.sum(Payment.amount_paid)
        ).filter(
            Payment.rent_id == rent.id
        ).scalar() or 0

        history.append({
            "rent_id": rent.id,
            "month": rent.month,
            "year": rent.year,
            "rent_amount": rent.rent_amount,
            "paid_amount": paid_amount,
            "due_amount": rent.rent_amount - paid_amount
        })

    return history