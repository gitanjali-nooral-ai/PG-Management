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

def get_pg_list(db):

    pgs = db.query(PG).all()

    return [
        {
            "id":pg.id,
            "name": pg.name,
            "address": pg.address,
            "total_rooms": pg.total_rooms
        }
        for pg in pgs
    ]