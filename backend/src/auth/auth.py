
import os
import re
import jwt
from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
from server.server import InputError

load_dotenv()


def gen_token(user_id):
    # type: ignore
    return jwt.encode({"user_id": user_id}, os.getenv("JWT_SECRET"), algorithm="HS256")


def auth_register(email, username, password, name_first, name_last):
    user = {
        "auth_user_id": 1,
        "email": email,
        "username": username,
        "password": password,
        "name_first": name_first,
        "name_last": name_last,
        "profile_img_url": "",
        "pipes": [],
        "tokens": []
    }

    db = MongoClient(os.getenv("MONGODB_URL"))["Main"]
    users = db["Users"]

    valid_email = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
    if not re.match(valid_email, email):
        raise InputError(message="Invalid email", code=400)
    if users.find_one({"email": email}) is not None:
        raise InputError(message="Email already in use", code=400)
    if users.find_one({"username": username}) is not None:
        raise InputError(message="Username already in use", code=400)
    if len(password) < 6:
        raise InputError(message="Password is too short", code=400)

    # token = gen_token(users.count() + 1)

    print('hu')
    users.insert_one(user)

    return {
        "token": token,
        "auth_user_id": user["auth_user_id"]
    }
