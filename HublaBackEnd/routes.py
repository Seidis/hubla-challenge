from fastapi import APIRouter

from api.auth.auth import router as auth_router

routes = APIRouter()

routes.include_router(auth_router, prefix="/auth", tags=["auth"])
