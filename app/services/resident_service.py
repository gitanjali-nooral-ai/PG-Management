from sqlalchemy import func
from app.models.resident import Resident

def upload_resident(db, request):

    resident = Resident(
        full_name=request.full_name,
        email=request.email,
        mobile_no=request.mobile_no,
        DOB=request.DOB,
        permenant_address=request.permenant_address,
        aadhar=request.aadhar,
        status=request.status
    )

    db.add(resident)
    db.commit()
    db.refresh(resident)

    return {
        "message": "Resident created successfully",
        "resident_id": resident.id
    }