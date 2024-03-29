import os
import shutil

from typing import Annotated
from fastapi import APIRouter, UploadFile, File, Header, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path
from pprint import pprint
from server.models.pipes import Pipes
from server.models.microservices import EditMicroservice
from server.database import pipes_collection, users_collection
from server.schemas.schemas import list_pipes_serial
from parsing_modules.microservice_extractor import extract_microservice
from parsing_modules.pipeline_parser import execute_pipeline
import jwt
import json
import time

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
        pipes = list_pipes_serial(pipes_collection.find(
            {"_id": {"$in": user["pipes"]}}))
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

    # Add pipe to user
    user_pipes = user["pipes"]
    user_pipes.append(_id.inserted_id)
    users_collection.update_one(
        {"_id": userid}, {"$set": {"pipes": user_pipes}})
    
    # file copying code taken from https://pynative.com/python-copy-files-and-directories/
    source_folder = "data/data_files/"
    destination_folder = f"parsing_modules/pipeline_{pipe.name}_data/"
    os.makedirs(os.path.dirname(destination_folder), exist_ok=True)

    for file_name in os.listdir(source_folder):
        # construct full file path
        source = source_folder + file_name
        destination = destination_folder + file_name
        # copy only files
        if os.path.isfile(source):
            shutil.copy(source, destination)
            os.remove(source)
        
    return {"pipeId": _id.inserted_id.__str__()}


@router.post("/pipes/execute")
def execute_pipe(id: str):
    pipe = pipes_collection.find_one({"_id": ObjectId(id)})

    condensed_microservices = []

    # Create a condensed version of the microservices
    for microservice in pipe["microservices"]:
        condensed_microservices.append(
            {
                "file": microservice["parent_file"],
                "name": microservice["name"],
                "parameters": microservice["parameters"]
            }
        )

    return_dict = {
        "pipeline": pipe["name"],
        "microservices": condensed_microservices
    }

    json_object = json.dumps(return_dict, indent=4)
    with open("pipeline.json", "w") as outfile:
        outfile.write(json_object)

    print(f'Input is ----------------------\n{return_dict}')
    pipe_output = execute_pipeline(return_dict)
    print(f'Output is ----------------------\n{pprint(pipe_output)}')
    pprint(pipe_output)

    # Check if the pipeline was successful
    output_json = json.loads(pipe_output)
    if output_json["pipeline"]["success"] is False:
        pipe["status"] = "Error"
        pipes_collection.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": dict(pipe)})
        raise HTTPException(
            status_code=400, detail=output_json["pipeline"]["error"])

    print('JSON', output_json["pipeline"]["microservices"])
    pipe["output"] = output_json["pipeline"]["microservices"]

    pipe["status"] = "Executed"
    pipe["last_executed"] = time.strftime("%Y-%m-%d %H:%M:%S")

    pipes_collection.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": dict(pipe)})

    return {"pipeId": id}


@router.put("/pipes/{id}")
def edit_pipe(id: str, pipe: Pipes):
    new_pipe = dict(pipe)
    pipes_collection.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": {"name": new_pipe["name"], "description": new_pipe["description"]}})
    

@router.put("/pipes/{id}/microservices")
def edit_microservice_parameters(id: str, microservice: EditMicroservice):
    pipe = pipes_collection.find_one({"_id": ObjectId(id)})
    for m in pipe["microservices"]:
        if m["name"] == microservice.name:
            m["parameters"] = microservice.parameters
            break
    pipes_collection.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": {"microservices": pipe["microservices"]}})
    

@router.put("/pipes/{id}/{name}")
def edit_microservice_output_type(id: str, name: str, output_type: str):
    pipe = pipes_collection.find_one({"_id": ObjectId(id)})
    for m in pipe["microservices"]:
        if m["name"] == name:
            m["output_type"] = output_type
            break
    pipes_collection.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": {"microservices": pipe["microservices"]}})


@router.delete("/pipes/{id}")
def delete_pipe(id: str):
    pipe_name = pipes_collection.find_one({"_id": ObjectId(id)})["name"]
    if os.getcwd().endswith('parsing_modules'):
        os.chdir('..')
    if not os.getcwd().endswith('backend'):
        os.chdir('backend')
    if os.path.exists(f'parsing_modules/pipeline_{pipe_name}'):
        shutil.rmtree(f'parsing_modules/pipeline_{pipe_name}')
    if os.path.exists(f'parsing_modules/pipeline_{pipe_name}_data'):
        shutil.rmtree(f'parsing_modules/pipeline_{pipe_name}_data')

    pipes_collection.find_one_and_delete(
        {"_id": ObjectId(id)})


@router.get("/pipes/{id}")
def get_pipe(id: str):
    try:
        pipe = pipes_collection.find_one({"_id": ObjectId(id)})
        if pipe is None:
            raise HTTPException(status_code=404, detail="Pipe not found")
        pipe['_id'] = str(pipe['_id'])
        return pipe
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/pipes/{id}/download/{file}")
async def download_microservice(id: str, file: str):
    pipe = pipes_collection.find_one({"_id": ObjectId(id)})
    pipe_name = pipe["name"]

    file_path = Path(f"/backend/parsing_modules/pipeline_{pipe_name}/{file}")

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    response = FileResponse(file_path)
    response.headers["Content-Disposition"] = f'attachment; filename="{file}"'
    return response


@router.delete("/clear/pipes")
def clear_all():
    pipes_collection.drop()
