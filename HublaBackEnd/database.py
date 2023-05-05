import os
import sqlalchemy
import sqlalchemy.orm as orm
import sqlalchemy.ext.declarative as declarative
import firebase_admin
from firebase_admin import credentials
from dotenv import load_dotenv

load_dotenv()

cred = credentials.Certificate("./firebase.json")
firebase_admin.initialize_app(cred)


DATABASE_URL = os.getenv("DATABASE_URL")

engine = sqlalchemy.create_engine(DATABASE_URL)
SessionLocal = orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative.declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
