import os
from fastapi import APIRouter, Form, HTTPException, Header
from server.models.users import Users
from server.database import users_collection
from time import time
import re
import jwt
import hashlib

from bson import ObjectId

router = APIRouter()



@router.post("/users/create")
async def create_user(email: str = Form(...), username: str = Form(...), password: str = Form(...)):
    """
    Given a user's email, username and password, create a new user account and
    generate a new token for the user to maintain their session.

    Args:
        email (str): User's email
        username (str): User's username
        password (str): User's password

    Raises:
        InputError: Invalid email
        InputError: Email already in use
        InputError: Username already in use
        InputError: Password must be at least 6 characters long

    Returns:
        `{token: str, auth_user_id: str}`: User's token and id
                    `token`         (str): User's token
                    `auth_user_id`  (str): User's id
    """

    valid_email = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
    if not re.match(valid_email, email):
        raise HTTPException(status_code=400, detail="Invalid email")
    if users_collection.count_documents({"email": email}) > 0:
        raise HTTPException(status_code=400, detail="Email already in use")
    if users_collection.count_documents({"username": username}) > 0:
        raise HTTPException(status_code=400, detail="Username already in use")
    if len(password) < 6:
        raise HTTPException(status_code=400, detail="Password is too short")
   
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    user = Users(email=email, username=username, password=hashed_password, profile_img_url="", pipes=[], tokens=[])
    users_collection.insert_one(dict(user))
    user_id = users_collection.find_one({"email": email})["_id"]
    payload = {"user_id": str(user_id), 'session': time()}
    token = jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm="HS256")
    users_collection.update_one({"email": email}, {"$set": {"tokens": [token]}})
    return {"token": token, "auth_user_id": user_id.__str__()}

@router.post("/users/login")
async def login_user(email: str = Form(...), password: str = Form(...)):
    """
    Given a user's email and password, login the user and generate a new token
    for the user to maintain their session.

    Args:
        email (str): User's email
        password (str): User's password

    Raises:
        InputError: Email does not belong to a user
        InputError: Password is incorrect

    Returns:
        `{token: str, auth_user_id: str}`: User's token and id
                    `token`         (str): User's token
                    `auth_user_id`  (str): User's id
    """
    user = users_collection.find_one({"email": email})
    if user is None:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    if user["password"] != hashlib.sha256(password.encode()).hexdigest():
        raise HTTPException(status_code=400, detail="Invalid email or password")
    payload = {"user_id": str(user["_id"]), 'session': time()}
    token = jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm="HS256")
    tokens = user["tokens"]
    tokens.append(token)
    users_collection.update_one({"email": email}, {"$set": {"tokens": tokens}})
    return {"token": token, "auth_user_id": user["_id"].__str__()}


@router.post("/users/logout")
async def logout_user(Authorization: str = Header(...)):
    """
    Given a user's token, logout the user and remove the token from the user's
    list of tokens.

    Args:
        token (str): User's token

    Raises:
        InputError: Invalid token

    Returns:
        `{}`: Whether or not the user was successfully logged out
    """
    try:
        token = Authorization.split(" ")[1]
        decoded = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
        userid = ObjectId(decoded["user_id"])
        user = users_collection.find_one({"_id": userid})
        tokens = user["tokens"]
        tokens.remove(token)
        users_collection.update_one({"_id": userid}, {"$set": {"tokens": tokens}})
        return {}
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
    