from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from models import Base


class TypeTransactions(Base):
    __tablename__ = "type_transaction"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, unique=True, index=True)
    nature = Column(String, index=True)
    signal = Column(Boolean, index=True)
