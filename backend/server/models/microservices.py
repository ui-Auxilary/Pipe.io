from pydantic import BaseModel


class MicroserviceContent(BaseModel):
    filename: str
    content: str
