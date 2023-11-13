import os
import importlib.util
import sys
import ast
from typing import Annotated
from fastapi import APIRouter, UploadFile, File, HTTPException
from server.models.microservices import Microservice, EditMicroservice
from server.models.microservices import FileContent
from server.database import microservices_collection
from parsing_modules.microservice_extractor import extract_microservice

# Used for fetching Mongo objectID
from bson import ObjectId, json_util

router = APIRouter()

# pipes_list GET


@router.get("/microservice/list")
async def get_microservices():
    try:
        return os.listdir("data/microservices")
    except:
        return []

@router.post("/microservice/add")
async def add_microservice(microservice: Microservice):
    _id = microservices_collection.insert_one(dict(microservice))
    print("id", _id.inserted_id, _id.inserted_id.__str__())
    return json_util.dumps({"id": _id.inserted_id.__str__()}, indent=4)

@router.post("/microservice/add/{name}")
async def add_microservice(name):
    res_json = extract_microservice(name)
    return res_json


@router.put("/microservice/{id}")
async def edit_microservice(id: str, microservice: EditMicroservice):
    new_microservice = dict(microservice)
    #print(new_microservice["parameters"])
    if new_microservice["parameters"] is None:
        raise HTTPException(status_code=400, detail= "microservice is NoneType")
    else:
        for parameter in new_microservice["parameters"]:
            #print(parameter)
            print(new_microservice["parameters"][parameter])
            
            try:
                # Attempt to parse the value with ast.literal_eval
                new_microservice["parameters"][parameter]["default"] = ast.literal_eval(new_microservice["parameters"][parameter]["default"])
                
            except (ValueError, SyntaxError):
                pass
            if new_microservice["parameters"][parameter]["default"].__class__.__name__ != new_microservice["parameters"][parameter]["type"]:
                raise HTTPException(status_code=404, detail=f"The parameter {new_microservice['parameters'][parameter]['default']} should be of type {new_microservice['parameters'][parameter]['type']}")
            
    #print("Test",new_microservice["parameters"])
        microservices_collection.find_one_and_update(
            {"_id": ObjectId(id)}, {"$set": {"parameters": new_microservice["parameters"]}})

@router.delete("/microservice/{id}")
async def delete_microservice(name: str):
    microservices_collection.find_one_and_delete(
        {"_id": ObjectId(id)})


@router.delete("/clear/microservices")
async def clear_all_microservices():
    microservices_collection.drop()


@router.post("/upload")
async def upload_microservice(file: FileContent):
    filepath = f"data/microservices/{file.filename}"
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    # Need to test with empty/invalid files error handling
    with open(filepath, 'w+') as f:
        f.write(file.content)

    res_json = extract_microservice(file.filename.split('.')[0])

    return res_json


@router.post("/upload_csv")
async def upload_CSV(file: FileContent):
    filepath = f"data/csv/{file.filename}"
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    # Need to test with empty/invalid files error handling
    with open(filepath, 'w+') as f:
        f.write(file.content)
