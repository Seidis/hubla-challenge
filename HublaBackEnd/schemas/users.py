from pydantic import BaseModel


class BaseUser(BaseModel):
    id: int
    uid: str

    class Config:
        orm_mode = True
