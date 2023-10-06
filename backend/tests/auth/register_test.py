import pytest
from fastapi.testclient import TestClient

from server.server import app

client = TestClient(app)

@pytest.fixture
def setup():
    client.delete("/clear/users")


def test_auth_register_sucess(setup):
    ret = client.post("/users/create", data={"email": "email@email.com", "username": "username", "password": "password123"})
    assert ret.status_code == 200
    assert ret.json()["token"] != None
    assert ret.json()["auth_user_id"] != None




def test_auth_register_invalid_email(setup):
    ret = client.post("/users/create", data={"email": "email", "username": "username", "password": "password123"})
    assert ret.status_code == 400
    assert ret.json()["detail"] == "Invalid email"
   


def test_auth_register_invalid_password(setup):
    ret = client.post("/users/create", data={"email": "email@email.com", "username": "username", "password": "pass"})
    assert ret.status_code == 400
    assert ret.json()["detail"] == "Password is too short"


def test_auth_register_invalid_username_taken(setup):
    user1 = client.post("/users/create", data={"email": "email1@email.com", "username": "username", "password": "password123"})
    user2 = client.post("/users/create", data={"email": "email2@email.com", "username": "username", "password": "password123"})
    assert user1.status_code == 200
    assert user2.status_code == 400
    assert user2.json()["detail"] == "Username already in use"



def test_auth_register_email_taken(setup):
    user1 = client.post("/users/create", data={"email": "email2@email.com", "username": "username", "password": "password123"})
    user2 = client.post("/users/create", data={"email": "email2@email.com", "username": "username2", "password": "password123"})
    assert user1.status_code == 200
    assert user2.status_code == 400
    assert user2.json()["detail"] == "Email already in use"
