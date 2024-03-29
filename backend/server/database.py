import os
from dotenv import load_dotenv
from sys import exit

from pymongo.mongo_client import MongoClient

load_dotenv()

try:
    client = MongoClient(os.getenv("MONGODB_URL"))
    print('Successfully connected to MongoDB')
except Exception as e:
    print(e)
    exit(1)

db = client["Main"]
pipes_collection = db["Pipes"]
stock_collection = db["Stocks"]
users_collection = db["Users"]
microservices_collection = db["Microservices"]