from pydantic import BaseModel

from typing import Union
from datetime import datetime


class BaseTransaction(BaseModel):
    transaction_type: int
    transaction_date: datetime
    transaction_type_description: str
    seller_name: str
    transaction_value: float
    product_description: str

    class Config:
        orm_mode = True


class Transaction(BaseTransaction):
    id: int
    comission: Union[float, None]
    signal: bool


class SaveTransaction(BaseTransaction):
    pass
