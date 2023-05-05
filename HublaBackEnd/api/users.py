from firebase_admin.auth import UserRecord
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.auth.auth import get_current_user
from database import get_db

from schemas.users import BaseUser

from models.users import User


router = APIRouter()


@router.get("/all", response_model=list[BaseUser])
async def get_users(
    # user: UserRecord = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    users = db.query(User).all()
    return users
