import os
import database
from routes import routes
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware
from fastapi.testclient import TestClient
from dotenv import load_dotenv

load_dotenv()

api = FastAPI(
    title="Desafio da Hubla", description="API para o desafio da Hubla", version="0.1.0"
)

api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@api.on_event("startup")
async def startup():
    try:
        database.Base.metadata.create_all(database.engine)
    except Exception as e:
        print("Error creating database" + str(e))
        raise e


api.add_middleware(DBSessionMiddleware, db_url=os.getenv("DATABASE_URL"))


api.include_router(routes)


# TestClient(api)
