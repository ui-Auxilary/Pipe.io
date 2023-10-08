from fastapi import APIRouter, Form, HTTPException
from server.database import users_collection

router = APIRouter()

@router.delete("/clear/users")
async def clear_users():
    """Clears the database of all users"""
    users_collection.delete_many({})
    return {}