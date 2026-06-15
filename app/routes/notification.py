from fastapi import APIRouter

router = APIRouter(prefix="/notification", tags=["Notification"])

@router.get("/send")
def send():
    return {"message" : "msg from backend as notification"}