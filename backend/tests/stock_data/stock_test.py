import pytest
from fastapi.testclient import TestClient

from server.server import app

client = TestClient(app)


def test_get_stock_data():
    ret = client.post("/users/login", data={"email": "james@email.com", "password": "12355555"})
    assert ret.status_code == 200
    token = ret.json()["token"]
    ret = client.get("/get_stock_data/APPL")
    assert ret.status_code == 200
    # print(ret.json())

