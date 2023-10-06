import pytest
from fastapi.testclient import TestClient

from server.server import app

client = TestClient(app)

@pytest.fixture
def setup():
    client.delete("/clear/users")

def test_auth_logout_sucess(setup):
    registered = client.post("/users/create", data={"email": "email@email.com", "username": "username", "password": "password"})
    assert registered.status_code == 200
    token = registered.json()["token"]
    ret = client.post("/users/logout", headers={"Authorization": f"Bearer {token}"})
    assert ret.status_code == 200

def test_auth_logout_invalid_token(setup):
    ret = client.post("/users/logout", headers={"Authorization": f"Bearer invalid_token"})
    assert ret.status_code == 401
    assert ret.json()["detail"] == "Invalid token"
