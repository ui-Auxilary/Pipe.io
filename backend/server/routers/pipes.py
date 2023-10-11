import os

from typing import Annotated
from fastapi import APIRouter, UploadFile, File, Header, HTTPException
from pprint import pprint
from server.models.pipes import Pipes
from server.database import pipes_collection, users_collection
from server.schemas.schemas import list_pipes_serial
from parsing_modules.microservice_extractor import extract_microservice
from parsing_modules.pipeline_parser import execute_pipeline
import jwt
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
    condensed_microservices = []
    print('Micro pipe', pipe.microservices)
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
    users_collection.update_one(
        {"_id": userid}, {"$set": {"pipes": user_pipes}})

    # print(f'Input is ----------------------\n{return_dict}')
    pipe_output = execute_pipeline(return_dict)
    # print(f'Output is ----------------------\n{pprint(pipe_output)}')
    pprint(pipe_output)
    return pipe_output


@router.put("/pipes/{id}")
async def edit_pipe(id: str, pipe: Pipes):
    pipes_collection.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": dict(pipe)})


@router.delete("/pipes/{id}")
async def delete_pipe(id: str):
    pipes_collection.find_one_and_delete(
        {"_id": ObjectId(id)})

# @router.get('/get_stock_data/{stock_name}')
# async def get_stock_data(stock_name:str):
#     # Fetch data for the selected stock here
#     try:
#         stock_data = yf.Ticker(stock_name)
#         stock_data = stock_data.history()
#     except:
#         print("Stock name is wrong")
#         return
#     # Process and return the data
#     if not isinstance(stock_data, pd.DataFrame):
#         stock_data = pd.DataFrame(stock_data)
#     stock_data['stock_name'] = stock_name
#     stock_data = stock_data.to_dict(orient='records')
#     stock_collection.insert_many(stock_data)
#@router.get('/get_stock_data/{stock_name}')
#async def get_stock_data(stock_name: str):
#    for stock in stock_collection.find({"stock_name": stock_name}):

@router.delete("/clear/pipes")
async def clear_all():
    pipes_collection.drop()
