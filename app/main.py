from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "PG Management Backend Running"}

@app.get("/about")
def about():
    return {"message": "msg from the about"}