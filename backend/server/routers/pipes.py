import os

from typing import Annotated
from fastapi import APIRouter, UploadFile, File
from server.models.pipes import Pipes
from server.models.microservices import MicroserviceContent
from server.database import pipes_collection
from server.schemas.schemas import list_pipes_serial
from parsing_modules.microservice_extractor import extract_microservice

# Used for fetching Mongo objectID
from bson import ObjectId

router = APIRouter()

# pipes_list GET


@router.get("/pipes/list")
async def get_pipes():
    pipes = list_pipes_serial(pipes_collection.find())
    return pipes


@router.post("/pipes/create")
async def create_pipe(pipe: Pipes):
    pipes_collection.insert_one(dict(pipe))


@router.put("/pipes/{id}")
async def edit_pipe(id: str, pipe: Pipes):
    pipes_collection.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": dict(pipe)})


@router.delete("/pipes/{id}")
async def delete_pipe(id: str):
    pipes_collection.find_one_and_delete(
        {"_id": ObjectId(id)})


@router.delete("pipes/clear_all")
async def clear_all():
    pipes_collection.drop()
