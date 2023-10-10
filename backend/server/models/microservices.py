from typing import Optional
from pydantic import BaseModel, Field


class MicroserviceContent(BaseModel):
    filename: str
    content: str

class Microservice(BaseModel):
    name: str
    parameters: list
    parent_file: str
    code: str
    docstring: Optional[str] = Field(None)
