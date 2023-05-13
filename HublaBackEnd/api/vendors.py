from typing import List
from fastapi import APIRouter, Depends
from api.auth import get_current_user
from fastapi_sqlalchemy.middleware import db

from models.vendors import Vendors
from schemas.vendors import BaseVendor

router = APIRouter()


@router.get("/", response_model=List[BaseVendor])
async def get_vendors(user=Depends(get_current_user)):
    """
    This function returns a list of vendors based on the logged user.\n
    params:\n
        user: UserRecord - Firebase user object
    """
    vendors = (
        db.session.query(Vendors).filter(Vendors.user_id == user._data["localId"]).all()
    )
    return vendors
