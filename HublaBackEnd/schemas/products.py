from pydantic import BaseModel


class BaseProduct(BaseModel):
    id: int
    name: str
    price: float

    class Config:
        orm_mode = True


class Product(BaseProduct):
    pass
