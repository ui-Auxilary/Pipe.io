from pydantic import BaseModel


class MicroserviceContent(BaseModel):
    filename: str
    content: str

class Microservice(BaseModel):
    name: str
    parameters: list
    parent_pipes: list
    parent_file: str
    code: str
    docstring: str
