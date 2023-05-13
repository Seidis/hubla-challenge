from fastapi import APIRouter

from api.auth import router as auth_router
from api.transactions import router as transaction_router
from api.vendors import router as vendors_router
from api.products import router as products_router

routes = APIRouter()

routes.include_router(auth_router, prefix="/auth", tags=["auth"])
routes.include_router(transaction_router, prefix="/transactions", tags=["transactions"])
routes.include_router(vendors_router, prefix="/vendors", tags=["vendors"])
routes.include_router(products_router, prefix="/products", tags=["products"])
