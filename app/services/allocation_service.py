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