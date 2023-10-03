from pymongo.mongo_client import MongoClient
import os






def clear_data():
    """Clears the database of all data"""
    db = MongoClient(os.getenv("MONGODB_URL"))["Main"]
    users = db["Users"]
    users.delete_many({})


    return {}