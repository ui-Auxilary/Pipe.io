from pydantic import BaseModel


class Users(BaseModel):
    email: str
    username: str
    password: str
    profile_img_url: str
    pipes: list
    tokens: list