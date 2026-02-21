import os
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv

load_dotenv()

# Initialize Firebase Admin SDK
# In a real production scenario, you would load this from a secure environment variable
# containing the JSON credentials string, or the path to the credentials file.
# For this scaffold, we expect `firebase-credentials.json` to be placed in the backend root.

try:
    cred_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'firebase-credentials.json')
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
    else:
        print("Warning: firebase-credentials.json not found. Firebase Admin SDK not initialized.")
except Exception as e:
    print(f"Error initializing Firebase Admin SDK: {e}")

security = HTTPBearer()

def verify_firebase_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    FastAPI dependency to verify a Firebase ID token.
    Extracts the Bearer token from the Authorization header and verifies it via Firebase Admin.
    """
    token = credentials.credentials
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Invalid authentication credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
