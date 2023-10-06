import pytest
from fastapi.testclient import TestClient

from server.server import app

client = TestClient(app)

@pytest.fixture
def setup():
    client.delete("/clear/users")


def test_auth_login_sucess(setup):
    registered = client.post("/users/create", data={"email": "email@email.com", "username": "username", "password": "password123"})
    ret = client.post("/users/login", data={"email": "email@email.com", "password": "password123"})
    assert ret.status_code == 200
    assert ret.json()["token"] != registered.json()["token"]
    assert ret.json()["auth_user_id"] == registered.json()["auth_user_id"]

def test_auth_login_invalid_email(setup):
    registered = client.post("/users/create", data={"email": "email@email.com", "username": "username", "password": "password123"})
    assert registered.status_code == 200
    ret = client.post("/users/login", data={"email": "email1@gmail.com", "password": "password123"})
    assert ret.status_code == 400
    assert ret.json()["detail"] == "Invalid email or password"

def test_auth_login_invalid_password(setup):
    registered = client.post("/users/create", data={"email": "email@email.com", "username": "username", "password": "password123"})
    assert registered.status_code == 200
    ret = client.post("/users/login", data={"email": "email@email.com", "password": "password"})
    assert ret.status_code == 400
    assert ret.json()["detail"] == "Invalid email or password"
    

    