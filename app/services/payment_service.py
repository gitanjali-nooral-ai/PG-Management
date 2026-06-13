from app.models.payment import Payment

def upload_payment(db, request):

    pay = Payment(
        resident_id=request.resident_id,
        rent_id=request.rent_id,
        payment=request.payment,
        payment_date=request.payment_date
    )

    db.add(pay)
    db.commit()
    db.refresh(pay)

    return {
        "message": "Uploaded successfully",
        "payment_id": pay.id
    }