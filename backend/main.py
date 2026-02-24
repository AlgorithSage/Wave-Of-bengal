from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from services.auth_service import verify_firebase_token
from database import engine
from models import analytics_models
from routers import analytics

# Initialize SQLite database tracking tables automatically
analytics_models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Wave of Bengal API")

# Register the Analytics endpoints
app.include_router(analytics.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for easier deployment, update to specific Vercel URL later for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Wave of Bengal API is running"}

@app.get("/api/auth_health")
def auth_health_check(user: dict = Depends(verify_firebase_token)):
    """
    Test endpoint to verify that the Firebase token validation works.
    Takes a Bearer token in the headers and returns the decoded user profile dict.
    """
    return {"status": "ok", "message": "Token is valid", "user": user}
