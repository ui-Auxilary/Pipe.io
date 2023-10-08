from typing import Optional
from pydantic import BaseModel, Field
from fastapi import UploadFile, File


class Pipes(BaseModel):
    name: str
    description: str
    status: Optional[str] = Field(None)
    user_id: Optional[str] = Field(None)
    microservices: Optional[list] = Field([])
