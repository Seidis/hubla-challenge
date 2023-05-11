from pydantic import BaseModel


class BaseVendor(BaseModel):
    name: str

    class Config:
        orm_mode = True
