from app.models.pg import PG

def upload_pg(db, request):

    pg = PG(
        name=request.name,
        address=request.address,
        total_rooms=request.total_rooms
    )

    db.add(pg)
    db.commit()
    db.refresh(pg)

    return {
        "message": "Uploaded successfully",
        "pg_id": pg.id
    }