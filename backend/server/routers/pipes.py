from fastapi import APIRouter
from server.models.pipes import Pipes
from server.database import pipes_collection, stock_collection
from server.schemas.schemas import list_serial
import yfinance as yf
from datetime import datetime, timedelta
import pandas as pd

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

@router.get('/get_stock_data/{stock_name}')
async def get_stock_data(stock_name:str):
    # Fetch data for the selected stock here
    try:
        stock_data = yf.Ticker(stock_name)
        stock_data = stock_data.history()
    except:
        print("Stock name is wrong")
        return
    # Process and return the data
    if not isinstance(stock_data, pd.DataFrame):
        stock_data = pd.DataFrame(stock_data)
    stock_data['stock_name'] = stock_name
    stock_data = stock_data.to_dict(orient='records')
    stock_collection.insert_many(stock_data)
#@router.get('/get_stock_data/{stock_name}')
#async def get_stock_data(stock_name: str):
#    for stock in stock_collection.find({"stock_name": stock_name}):
        
        
    
    