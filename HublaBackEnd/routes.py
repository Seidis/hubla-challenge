from fastapi import APIRouter

from api.auth.auth import router as auth_router
from api.users import router as user_router

routes = APIRouter()

routes.include_router(auth_router, prefix="/auth", tags=["auth"])
routes.include_router(user_router, prefix="/users", tags=["users"])
