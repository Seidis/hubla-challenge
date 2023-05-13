from typing import List
from fastapi import APIRouter, Depends
from api.auth import get_current_user
from fastapi_sqlalchemy.middleware import db

from models.products import Products

router = APIRouter()


@router.get("/", response_model=list[Products])
async def get_products(user=Depends(get_current_user)) -> List[Products]:
    """
    This function returns a list of products based on the logged user.\n
    params:\n
        user: UserRecord - Firebase user object
    """
    products = (
        db.session.query(Products)
        .filter(Products.user_id == user._data["localId"])
        .all()
    )
    return products
