from pydantic import BaseModel


class Pipes(BaseModel):
    name: str
    description: str
    status: str
