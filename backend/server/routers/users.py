import os
from fastapi import APIRouter, Form, HTTPException, Header, Query
from fastapi.security import HTTPBearer
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from server.models.users import Users
from server.database import users_collection
from time import time
import re
import jwt
import hashlib

from bson import ObjectId, json_util

router = APIRouter()

conf = ConnectionConfig(
    MAIL_USERNAME ="h15auntilted@gmail.com",
    MAIL_PASSWORD = "otaj jian dvea jhiw",
    MAIL_FROM = "h15auntilted@gmail.com",
    MAIL_PORT = 465,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = False,
    MAIL_SSL_TLS = True,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)


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
    default_img_url = "localhost:8000/static/default.png"
    user = Users(email=email, username=username, password=hashed_password,
                 profile_img_url=default_img_url, pipes=[], tokens=[], reset_tokens=[])
    users_collection.insert_one(dict(user))
    user_id = users_collection.find_one({"email": email})["_id"]
    payload = {"user_id": str(user_id), 'session': time()}
    token = jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm="HS256")
    users_collection.update_one(
        {"email": email}, {"$set": {"tokens": [token]}})
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
        raise HTTPException(
            status_code=400, detail="Invalid email or password")
    if user["password"] != hashlib.sha256(password.encode()).hexdigest():
        raise HTTPException(
            status_code=400, detail="Invalid email or password")
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
        `{}`: Empty dictionary if successful
    """
    try:
        token = Authorization.split(" ")[1]
        decoded = jwt.decode(token, os.getenv(
            "JWT_SECRET"), algorithms=["HS256"])
        userid = ObjectId(decoded["user_id"])
        user = users_collection.find_one({"_id": userid})
        tokens = user["tokens"]
        tokens.remove(token)
        users_collection.update_one(
            {"_id": userid}, {"$set": {"tokens": tokens}})
        return {}
    except:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.get("/users/get_user")
async def get_user(Authorization: str = Header(...)):
    """
    Given a user's token, return the authorised user's information.

    Args:
        token (str): User's token

    Raises:
        InputError: Invalid token

    Returns:
        {user: User}: Empty dictionary if successful
    """

    try:
        token = Authorization.split(" ")[1]
        decoded = jwt.decode(token, os.getenv(
            "JWT_SECRET"), algorithms=["HS256"])
        userid = ObjectId(decoded["user_id"])
        user = users_collection.find_one({"_id": userid})

        ret_user = {
            "id": decoded["user_id"].__str__(),
            "email": user["email"],
            "username": user["username"],
            "profile_img_url": user["profile_img_url"],
            "pipes": user["pipes"]
        }

        ret_user_json = json_util.dumps(ret_user, indent=4)

        return {"user": ret_user_json}

    except:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/users/forgot-password")
async def forgot_password(email: str = Form(...)):
    """
    Given a user's email, send a password reset email to the user.

    Args:
        email (str): User's email

    Returns:
        `{}`: Empty dictionary if successful or unsucessful
    """
    user = users_collection.find_one({"email": email})
    if user is None:
        return {}

    payload = {"user_id": str(user["_id"]), 'session': time() + 86400}
    reset_token = jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm="HS256")
    users_collection.update_one({"email": user["email"]}, {"$set": {"reset_tokens": [reset_token]}})

    message = MessageSchema(
        subject="Password Reset",
        recipients=[email],
        body=f"Click the link to reset your password: http://localhost:3000/reset?token={reset_token}",
        subtype= MessageType.html
    )
    fm = FastMail(conf)
    await fm.send_message(message, MessageType.html)
    

    return {}


@router.put("/users/reset_password")
async def reset_password(reset_token: str = Form(...), password: str = Form(...)):
    """
    Given a user's reset token and new password, reset the user's password.

    Args:
        reset_token (str): User's reset token
        new_password (str): User's new password

    Raises:
        InputError: Invalid reset token
        InputError: Password must be at least 6 characters long

    Returns:
        `{}`: Empty dictionary if successful
    """
    
    payload = jwt.decode(reset_token, os.getenv("JWT_SECRET"), algorithms=["HS256"])

    user = users_collection.find_one({"_id": ObjectId(payload["user_id"])})
    if user is None:
        raise HTTPException(status_code=400, detail="Invalid reset token")
    if len(password) < 6:
        raise HTTPException(status_code=400, detail="Password is too short")
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    reset_tokens = user["reset_tokens"]
    reset_tokens.remove(reset_token)

    users_collection.update_one({"_id": user["_id"]}, {"$set": {"password": hashed_password, "reset_tokens": reset_tokens}})
    return {}


@router.get("/users/verify_reset_token")
async def verify_reset_token(reset_token: str = Query(...)):
    """
    Given a user's reset token, verify the reset token.

    Args:
        reset_token (str): User's reset token

    Raises:
        InputError: Invalid reset token

    Returns:
        `{}`: Empty dictionary if successful
    """

    try:
        payload = jwt.decode(reset_token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
        user = users_collection.find_one({"_id": ObjectId(payload["user_id"])})
        reset_tokens = user["reset_tokens"]
    except:
        raise HTTPException(status_code=400, detail="Invalid reset token")

    if (reset_token not in reset_tokens):
        raise HTTPException(status_code=400, detail="Invalid reset token")

    for token in reset_tokens:
        if token == reset_token:
            expiry = payload["session"]
            if expiry < int(time()):
                reset_tokens.remove(token)
                users_collection.update_one({"_id": user["_id"]}, {"$set": {"reset_tokens": reset_tokens}})
                raise HTTPException(status_code=400, detail="Invalid reset token")
            break

    if user is None:
        raise HTTPException(status_code=400, detail="Invalid reset token")
    
    return {}