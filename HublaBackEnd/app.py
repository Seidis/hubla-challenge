import os

import config
from routes import routes
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Desafio da Hubla", description="API para o desafio da Hubla", version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.on_event("startup")
# async def startup() -> None:
#     try:
#         await config.database.connect()
#     except Exception as e:
#         print(e)


# @app.on_event("shutdown")
# async def shutdown() -> None:
#     try:
#         await config.database.disconnect()
#     except Exception as e:
#         print(e)


# app.add_middleware(DBSessionMiddleware, db_url=config.BASE_URL)

app.include_router(routes)
