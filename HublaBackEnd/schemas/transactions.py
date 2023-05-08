from typing import Union
from pydantic import BaseModel


class BaseTransaction(BaseModel):
    transaction_type: int
    transaction_date: str

    class Config:
        orm_mode = True


class SaveTransaction(BaseTransaction):
    transaction_type_description: str
    product_description: str
    transaction_value: float
    seller_name: str
