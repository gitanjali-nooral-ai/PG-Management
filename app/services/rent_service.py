from sqlalchemy import func
from app.models.rent import Rent

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
        "message": "Uploaded successfully",
        "rent_id": rent.id
    }