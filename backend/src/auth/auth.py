
import os
import re
import jwt
from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
from src.error import InputError



load_dotenv()



def gen_token(user_id):
    return jwt.encode({"user_id": user_id}, os.getenv("JWT_SECRET"), algorithm="HS256")

def auth_register(email, username, password, name_first, name_last):
    db = MongoClient(os.getenv("MONGODB_URL"))["Main"]
    users = db["Users"]

    valid_email = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
    if not re.match(valid_email, email):
        raise InputError(description="Invalid email")
    if users.find_one({"email": email}) is not None:
        raise InputError(description="Email already in use")
    if users.find_one({"username": username}) is not None:
        raise InputError(description="Username already in use")
    if len(password) < 6:
        raise InputError(description="Password is too short")
    
    token = gen_token(users.count() + 1)

    user = {
        "auth_user_id": users.count() + 1,
        "email": email,
        "username": username,
        "password": password,
        "name_first": name_first,
        "name_last": name_last,
        "profile_img_url": "",
        "pipes": [],
        "tokens": [token]
    }
    users.insert_one(user)

    return {
        "token": token,
        "auth_user_id": user["auth_user_id"]
    }
    
    