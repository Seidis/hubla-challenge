from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from models import Base


class Vendors(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    user_id = Column(Integer, index=True)
