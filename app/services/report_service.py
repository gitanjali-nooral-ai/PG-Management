from sqlalchemy import func, extract
from app.models.bill import Bill
from app.models.resident import Resident
from app.models.room import Room
from app.models.pg import PG
from app.models.complaint import Complaint
from app.models.allocation import Allocation

from io import BytesIO
from fastapi.responses import StreamingResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


def get_yearly_report(db, year):

    total_collection = (
        db.query(func.sum(Bill.bill_amount))
        .filter(extract("year", Bill.bill_date) == year)
        .scalar()
        or 0
    )

    electricity = (
        db.query(func.sum(Bill.bill_amount))
        .filter(
            Bill.bill_type == "Electricity",
            extract("year", Bill.bill_date) == year
        )
        .scalar()
        or 0
    )

    water = (
        db.query(func.sum(Bill.bill_amount))
        .filter(
            Bill.bill_type == "Water",
            extract("year", Bill.bill_date) == year
        )
        .scalar()
        or 0
    )

    wifi = (
        db.query(func.sum(Bill.bill_amount))
        .filter(
            Bill.bill_type == "Wifi",
            extract("year", Bill.bill_date) == year
        )
        .scalar()
        or 0
    )

    maintenance = (
        db.query(func.sum(Bill.bill_amount))
        .filter(
            Bill.bill_type == "Maintenance",
            extract("year", Bill.bill_date) == year
        )
        .scalar()
        or 0
    )

    total_residents = db.query(
        func.count(Resident.id)
    ).scalar() or 0

    total_rooms = db.query(
        func.count(Room.id)
    ).scalar() or 0

    total_pgs = db.query(
        func.count(PG.id)
    ).scalar() or 0

    total_complaints = db.query(
        func.count(Complaint.id)
    ).scalar() or 0

    occupied_beds = db.query(
        func.count(Allocation.id)
    ).scalar() or 0

    monthly_collection = []

    for month in range(1, 13):

        amount = (
            db.query(func.sum(Bill.bill_amount))
            .filter(
                extract("year", Bill.bill_date) == year,
                extract("month", Bill.bill_date) == month
            )
            .scalar()
            or 0
        )

        monthly_collection.append({
            "month": month,
            "amount": amount
        })

    return {
        "year": year,
        "total_pgs": total_pgs,
        "total_rooms": total_rooms,
        "total_residents": total_residents,
        "occupied_beds": occupied_beds,
        "total_collection": total_collection,
        "bill_breakdown": {
            "electricity": electricity,
            "water": water,
            "wifi": wifi,
            "maintenance": maintenance
        },
        "total_complaints": total_complaints,
        "monthly_collection": monthly_collection
    }

def generate_report_pdf(db, year):

    report = get_yearly_report(db, year)

    buffer = BytesIO()

    pdf = canvas.Canvas(buffer, pagesize=letter)

    y = 750

    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(
        50,
        y,
        f"PG Management Report - {year}"
    )

    y -= 40

    pdf.setFont("Helvetica", 12)

    pdf.drawString(
        50,
        y,
        f"Total Residents: {report['total_residents']}"
    )

    y -= 20

    pdf.drawString(
        50,
        y,
        f"Total Rooms: {report['total_rooms']}"
    )

    y -= 20

    pdf.drawString(
        50,
        y,
        f"Total Collection: ₹{report['total_collection']}"
    )

    y -= 30

    pdf.drawString(
        50,
        y,
        "Bill Breakdown"
    )

    y -= 20

    pdf.drawString(
        70,
        y,
        f"Electricity: ₹{report['bill_breakdown']['electricity']}"
    )

    y -= 20

    pdf.drawString(
        70,
        y,
        f"Water: ₹{report['bill_breakdown']['water']}"
    )

    y -= 20

    pdf.drawString(
        70,
        y,
        f"Wifi: ₹{report['bill_breakdown']['wifi']}"
    )

    y -= 20

    pdf.drawString(
        70,
        y,
        f"Maintenance: ₹{report['bill_breakdown']['maintenance']}"
    )

    y -= 30

    pdf.drawString(
        50,
        y,
        f"Total Complaints: {report['total_complaints']}"
    )

    pdf.save()

    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
            f"attachment; filename=PG_Report_{year}.pdf"
        }
    )