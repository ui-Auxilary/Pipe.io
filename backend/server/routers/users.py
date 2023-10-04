from fastapi import APIRouter
from server.models.users import Users
from server.database import users_collection
from server.schemas.schemas import list_serial

# Used for fetching Mongo objectID
from bson import ObjectId

router = APIRouter()

# pipes_list GET


@router.post("/users/create")
async def create_user(user: Users):
    users_collection.insert_one(dict(user))



