from sqlalchemy import func
from app.models.bill import Bill


def get_total_bill(db):

    total = db.query(func.sum(Bill.bill_amount)).scalar()

    electricity = db.query(func.sum(Bill.bill_amount)).filter(
        Bill.bill_type == "electricity"
    ).scalar()

    water = db.query(func.sum(Bill.bill_amount)).filter(
        Bill.bill_type == "water"
    ).scalar()

    wifi = db.query(func.sum(Bill.bill_amount)).filter(
        Bill.bill_type == "wifi"
    ).scalar()

    return {
        "total": total or 0,
        "electricity": electricity or 0,
        "water": water or 0,
        "wifi": wifi or 0
    }


def upload_bill(db, request):

    bill = Bill(
        pg_id=request.pg_id,
        bill_date=request.bill_date,
        bill_amount=request.bill_amount,
        bill_type=request.bill_type
    )

    db.add(bill)
    db.commit()
    db.refresh(bill)

    return {
        "message": "Bill uploaded successfully",
        "bill_id": bill.id
    }
