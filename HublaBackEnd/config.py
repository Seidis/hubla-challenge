import os
import databases
import sqlalchemy
import firebase_admin
from firebase_admin import credentials
from dotenv import load_dotenv

load_dotenv()

cred = credentials.Certificate("./firebase.json")
firebase_admin.initialize_app(cred)

# BASE_URL = os.getenv("BASE_URL")
# database = databases.Database(BASE_URL)
# metadata = sqlalchemy.MetaData()


# async def connect_db():
#     await database.connect()
