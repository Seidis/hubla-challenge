from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from models import Base


class Transactions(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, index=True)
    transaction_date = Column(DateTime, index=True)
    comission = Column(Float, index=True)
    seller_id = Column(Integer, index=True)
    user_id = Column(Integer, index=True)
    transaction_type = Column(Integer, index=True)
