from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Backend is running"
    }

@app.post("/analyze")
def analyze_health(data: dict):

    sleep = float(data.get("sleep", 0))
    water = float(data.get("water", 0))
    stress = float(data.get("stress", 0))

    if sleep < 5 or water < 2 or stress > 7:
        result = "High Risk: Improve sleep, hydration, and reduce stress."
    else:
        result = "Healthy Lifestyle: Keep maintaining your habits."

    return {
        "result": result
    }