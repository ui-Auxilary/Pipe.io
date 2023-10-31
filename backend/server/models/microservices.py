from typing import Optional
from pydantic import BaseModel, Field

class FileContent(BaseModel):
    filename: str
    content: str
class Microservice(BaseModel):
    name: str
    parameters: dict
    parent_file: str
    code: str
    output_type: str
    docstring: Optional[str] = Field(None)
class EditMicroservice(BaseModel):
    name: Optional[str] = Field(None)
    parameters: Optional[dict] = Field(None)
    output_type: Optional[str] = Field(None)
    parent_file: Optional[str] = Field(None)
    code: Optional[str] = Field(None)
    docstring: Optional[str] = Field(None)
