import os

from typing import Annotated
from fastapi import APIRouter, UploadFile, File, Header, HTTPException
from server.models.pipes import Pipes
from server.models.microservices import MicroserviceContent
from server.database import pipes_collection, users_collection
from server.schemas.schemas import list_pipes_serial
from parsing_modules.microservice_extractor import extract_microservice
<<<<<<< HEAD
import jwt
=======
>>>>>>> 6d8847578a3ca270413fe9d6028d09570d05344c
import json

# Used for fetching Mongo objectID
from bson import ObjectId

router = APIRouter()

# pipes_list GET


@router.get("/pipes/list")
async def get_pipes(Authorization: str = Header(...)):
    try:
        token = Authorization.split(" ")[1]
        decoded = jwt.decode(token, os.getenv(
            "JWT_SECRET"), algorithms=["HS256"])
        userid = ObjectId(decoded["user_id"])
        user = users_collection.find_one({"_id": userid})
        pipes = list_pipes_serial(pipes_collection.find({"_id": {"$in": user["pipes"]}}))
        return pipes
    except:
        raise HTTPException(status_code=401, detail="Invalid token")




@router.post("/pipes/create")
async def create_pipe(pipe: Pipes, Authorization: str = Header(...)):

    token = Authorization.split(" ")[1]
    decoded = jwt.decode(token, os.getenv(
        "JWT_SECRET"), algorithms=["HS256"])
    if decoded["user_id"] is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    userid = ObjectId(decoded["user_id"])
    user = users_collection.find_one({"_id": userid})
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid token")


    _id = pipes_collection.insert_one(dict(pipe))
    condensed_microservices = []
    for microservice in pipe.microservices:
        # for idx, param in enumerate(microservice["parameters"]):
        #     microservice["parameters"][idx] = param.split("=")[-1]
        condensed_microservices.append(
            {
                "file": microservice["parent_file"],
                "name": microservice["name"],
                "parameters": microservice["parameters"]
            }
        )
    return_dict = {
        "pipeline": pipe.name,
        "microservices": condensed_microservices
    }

    json_object = json.dumps(return_dict, indent=4)
    with open("pipeline.json", "w") as outfile:
        outfile.write(json_object)
    
    user_pipes = user["pipes"]
    user_pipes.append(_id.inserted_id)
    users_collection.update_one({"_id": userid}, {"$set": {"pipes": user_pipes}})
    
    


@router.put("/pipes/{id}")
async def edit_pipe(id: str, pipe: Pipes):
    pipes_collection.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": dict(pipe)})


@router.delete("/pipes/{id}")
async def delete_pipe(id: str):
    pipes_collection.find_one_and_delete(
        {"_id": ObjectId(id)})


@router.delete("/clear/pipes")
async def clear_all():
    pipes_collection.drop()
