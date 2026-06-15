from sqlalchemy import func
from app.models.payment import Payment
from app.models.rent import Rent


def add_payment(db, request):

    rent = db.query(Rent).filter(
        Rent.id == request.rent_id
    ).first()

    if not rent:
        return {
            "message": "Rent record not found"
        }

    payment = Payment(
        resident_id=request.resident_id,
        rent_id=request.rent_id,
        payment=request.payment,
        pay_date=request.pay_date
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)

    return {
        "message": "Payment recorded successfully",
        "payment_id": payment.id
    }


def get_payment_status(db, rent_id):

    rent = db.query(Rent).filter(
        Rent.id == rent_id
    ).first()

    if not rent:
        return {
            "message": "Rent record not found"
        }

    total_paid = db.query(
        func.sum(Payment.payment)
    ).filter(
        Payment.rent_id == rent_id
    ).scalar() or 0

    due_amount = rent.rent_amount - total_paid

    if total_paid == 0:
        status = "Pending"
    elif total_paid < rent.rent_amount:
        status = "Partial"
    else:
        status = "Paid"

    return {
        "rent_id": rent.id,
        "resident_id": rent.resident_id,
        "rent_amount": rent.rent_amount,
        "paid_amount": total_paid,
        "due_amount": due_amount,
        "status": status
    }


def calculate_due_rent(db, resident_id):

    rents = db.query(Rent).filter(
        Rent.resident_id == resident_id
    ).all()

    total_due = 0

    rent_details = []

    for rent in rents:

        paid_amount = db.query(
            func.sum(Payment.payment)
        ).filter(
            Payment.rent_id == rent.id
        ).scalar() or 0

        due_amount = rent.rent_amount - paid_amount

        total_due += due_amount

        rent_details.append({
            "rent_id": rent.id,
            "month": rent.month,
            "year": rent.year,
            "rent_amount": rent.rent_amount,
            "paid_amount": paid_amount,
            "due_amount": due_amount
        })

    return {
        "resident_id": resident_id,
        "total_due": total_due,
        "rent_details": rent_details
    }


def get_payment_history(db, resident_id):

    payments = db.query(Payment).filter(
        Payment.resident_id == resident_id
    ).all()

    return [
        {
            "payment_id": payment.id,
            "rent_id": payment.rent_id,
            "amount_paid": payment.payment,
            "payment_date": payment.pay_date
        }
        for payment in payments
    ]