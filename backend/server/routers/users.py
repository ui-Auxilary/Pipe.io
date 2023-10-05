import os
from fastapi import APIRouter, Form, HTTPException
from server.models.users import Users
from server.database import users_collection
from time import time
import re
import jwt


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
   
    user = Users(email=email, username=username, password=password, profile_img_url="", pipes=[], tokens=[])
    users_collection.insert_one(dict(user))
    user_id = users_collection.find_one({"email": email})["_id"]
    payload = {"user_id": str(user_id), 'session': time()}
    token = jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm="HS256")
    users_collection.update_one({"email": email}, {"$set": {"tokens": [token]}})
    return {"token": token, "auth_user_id": user_id.__str__()}


