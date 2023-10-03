import auth_register, auth_login, auth_logout, clear_data from wrapper


@pytest.fixture
def setup():
    clear_data()
                  

def test_auth_register_sucess():
    setup()
    ret = auth_register("email@email.com", "username", "password123", "John", "Smith")
    assert ret.status_code == 200
    # check that the user is in the database
    assert ret.json()["token"] is  str
    assert ret.json()["auth_user_id"] is int

def test_auth_register_invalid_email():
    setup()
    ret = auth_register("email", "username",  "password123", "John", "Smith")
    assert ret.status_code == 400

def test_auth_register_invalid_password():
    setup()
    ret = auth_register("email", "username", "pass", "John", "Smith")
    assert ret.status_code == 400

def test_auth_register_invalid_username_taken():
    setup()
    auth_register("email", "username", "password123", "John", "Smith")
    ret = auth_register("email2", "username", "password123", "John", "Smith")
    assert ret.status_code == 400

def test_auth_register_email_taken():
    setup()
    auth_register("email", "username", "password123", "John", "Smith")
    ret = auth_register("email", "username2", "password123", "John", "Smith")
    assert ret.status_code == 400



