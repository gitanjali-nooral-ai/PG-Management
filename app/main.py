from fastapi import FastAPI

from app.config.database import engine
from app.models.base import Base

from app.models import *

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def home():
    return {"message": "PG Management Backend Running"}

