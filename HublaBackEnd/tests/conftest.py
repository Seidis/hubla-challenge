"""
    Module Docstring
"""

import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

DATABASE_URL = "sqlite:///teste.db"

os.environ["DATABASE_URL"] = DATABASE_URL

from app import app
from models import Base


def client():
    """
    Docstring
    """
    return TestClient(app)


engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
session = scoped_session(sessionmaker(bind=engine))

Base.metadata.create_all(bind=engine)

from tests.database import initialize_database_instances


@pytest.fixture(scope="session", autouse=True)
def database():
    try:
        initialize_database_instances(session)
        yield
        os.remove("teste.db")
    except:
        os.remove("teste.db")
        raise
