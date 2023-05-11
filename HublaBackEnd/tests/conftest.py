import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

from app import api
from models import Base

DATABASE_URL = "sqlite:///test.db"


def client():
    return TestClient(api)


engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
session = scoped_session(sessionmaker(bind=engine))

Base.metadata.create_all(bind=engine)

from tests.database import initialize_database_instances
from tests.db_utils import dispatch_database


@pytest.fixture(scope="session", autouse=True)
def database():
    try:
        initialize_database_instances(session)
        yield
        dispatch_database()
    except:
        dispatch_database()
        raise
