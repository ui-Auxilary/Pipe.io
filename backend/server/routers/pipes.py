from typing import Annotated
from fastapi import APIRouter, UploadFile, File
from server.models.pipes import Pipes, Test
from server.database import pipes_collection
from server.schemas.schemas import list_serial

# Used for fetching Mongo objectID
from bson import ObjectId

router = APIRouter()

# pipes_list GET


@router.get("/list_pipes")
async def get_pipes():
    pipes = list_serial(pipes_collection.find())
    return pipes


@router.post("/create")
async def create_pipe(pipe: Pipes):
    pipes_collection.insert_one(dict(pipe))


@router.put("/{id}")
async def edit_pipe(id: str, pipe: Pipes):
    pipes_collection.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": dict(pipe)})


@router.delete("/{id}")
async def delete_pipe(id: str):
    pipes_collection.find_one_and_delete(
        {"_id": ObjectId(id)})


@router.delete("/pipes/clearall")
async def clear_all():
    pipes_collection.drop()


@router.post("/upload")
async def upload(file: Test):
    with open('micro.py', 'w') as f:
        f.write(file.file)
