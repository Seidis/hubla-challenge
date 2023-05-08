from fastapi import APIRouter, HTTPException, Request
from firebase_admin import auth
from firebase_admin.exceptions import FirebaseError

router = APIRouter()


def get_current_user(request: Request) -> auth.UserRecord:
    authorization: str = request.headers.get("Authorization")
    if not authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        token = authorization.split(" ")[1]
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token["uid"]
        return auth.get_user(uid)
    except FirebaseError:
        raise HTTPException(status_code=401, detail="Unauthorized")
