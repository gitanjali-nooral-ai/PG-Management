from fastapi import FastAPI
from app.config.database import engine, SessionLocal

from app.models.base import Base
from app.models.admin import Admin

from app.routes import auth  
from app.routes import bills
from app.routes import residents
from app.routes import pg
from app.routes import payment
from app.routes import rents
from app.routes import rooms
from app.routes import allocation
from app.routes import notification

from app.services.security import (
    hash_password,
    hash_answer
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="PG Management Backend")


app.include_router(auth.router)
app.include_router(bills.router)
app.include_router(residents.router)
app.include_router(pg.router)
app.include_router(allocation.router)
app.include_router(payment.router)
app.include_router(rooms.router)
app.include_router(rents.router)




def create_default_admin():
    db = SessionLocal()

    try:
        existing_admin = db.query(Admin).first()

        if existing_admin:
            print("Admin already exists")
            return

        admin = Admin(
            username="admin",
            email="admin@pg.com",

            password_hash=hash_password("admin123"),

            security_question="What is your favorite place?",
            security_answer_hash=hash_answer("home")
        )

        db.add(admin)
        db.commit()

        print("Default admin created successfully")

    except Exception as e:
        print("Error creating admin:", e)

    finally:
        db.close()

@app.on_event("startup")
def startup_event():
    print("🚀 STARTUP TRIGGERED")
    create_default_admin()


@app.get("/")
def home():
    return {
        "message": "PG Management Backend Running"
    }
