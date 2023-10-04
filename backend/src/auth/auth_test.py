import pytest
from src.wrapper import clear_data
from fastapi.testclient import TestClient

from server.server import app

client = TestClient(app)

@pytest.fixture
def setup():
    clear_data()


def test_auth_register_sucess(setup):
    # clear_data()
    ret = client.post("/users/create", json={
        "email": "email",
        "username": "username",
        "password": "password123",
        "profile_img_url": "",
        "pipes": [],
        "tokens": []
    })
    assert ret.status_code == 200



# def test_auth_register_invalid_email(setup):
#     clear_data()
#     assert ret.status_code == 400


# def test_auth_register_invalid_password(setup):
#     clear_data()
#     assert ret.status_code == 400


# def test_auth_register_invalid_username_taken(setup):
#     clear_data()
#     ret = auth_register("email2", "username", "password123", "John", "Smith")
#     assert ret.status_code == 400


# def test_auth_register_email_taken(setup):
#     clear_data()
#     ret = auth_register("email", "username2", "password123", "John", "Smith")
#     assert ret.status_code == 400
