from fastapi import FastAPI
from app.config.database import engine
from fastapi.middleware.cors import CORSMiddleware

from app.models.base import Base



app = FastAPI(title="PG Management Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # frontend runnning port 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from app.routes import auth  
from app.routes import bills
from app.routes import residents
from app.routes import pg
from app.routes import payment
from app.routes import rents
from app.routes import rooms
from app.routes import allocation
from app.routes import notification
from app.routes import complaints
from app.routes import visitor
from app.routes import dashboard
from app.routes import report
from app.routes import calendar
from app.routes import resident_movement

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(bills.router)
app.include_router(residents.router)
app.include_router(pg.router)
app.include_router(allocation.router)
app.include_router(payment.router)
app.include_router(rooms.router)
app.include_router(rents.router)
app.include_router(notification.router)
app.include_router(complaints.router)
app.include_router(visitor.router)
app.include_router(dashboard.router)
app.include_router(report.router)
app.include_router(calendar.router)
app.include_router(resident_movement.router)

@app.on_event("startup")
def startup_event():
    print("🚀 STARTUP TRIGGERED")


@app.get("/")
def home():
    return {
        "message": "PG Management Backend Running"
    }
 