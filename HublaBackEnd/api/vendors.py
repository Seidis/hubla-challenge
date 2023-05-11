from typing import List
from fastapi import APIRouter, Depends
from database import get_db
from api.auth import get_current_user

from models.vendors import Vendors
from schemas.vendors import BaseVendor

router = APIRouter()


@router.get("/", response_model=List[BaseVendor])
async def get_vendors(db=Depends(get_db), user=Depends(get_current_user)):
    vendors = db.query(Vendors).filter(Vendors.user_id == user._data["localId"]).all()
    return vendors
