import json
import os
import importlib.util
import sys

from typing import Annotated
from fastapi import APIRouter, UploadFile, File
from server.models.microservices import Microservice
from server.models.microservices import MicroserviceContent
from server.database import microservices_collection
from server.schemas.schemas import list_microservices_serial
from parsing_modules.microservice_extractor import extract_microservice

# Used for fetching Mongo objectID
from bson import ObjectId

router = APIRouter()

# pipes_list GET


@router.get("/list_microservices")
async def get_microservices():
    microservices = list_microservices_serial(microservices_collection.find())
    return microservices


@router.post("/add_microservice")
async def add_microservice(microservice: Microservice):
    microservices_collection.insert_one(dict(microservice))


@router.put("/{id}")
async def edit_microservice(id: str, microservice: Microservice):
    microservices_collection.find_one_and_update(
        {"name": microservice["name"]}, {"$set": dict(microservice)})


@router.delete("/{name}")
async def delete_microservice(name: str):
    microservices_collection.find_one_and_delete(
        {"name": name})


@router.delete("/microservices/clearall")
async def clear_all_microservices():
    microservices_collection.drop()


@router.post("/upload")
async def upload_microservice(file: MicroserviceContent):
    filepath = f"data/{file.filename}"
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    # Need to test with empty/invalid files error handling
    with open(filepath, 'w+') as f:
        f.write(file.content)

    res_json = json.loads(extract_microservice(file.filename.split('.')[0]))

    if (res_json):
        res_json.update({'code': file.content})

    return res_json
