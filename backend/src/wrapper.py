from fastapi import FastAPI
import requests

def auth_register(email, username, password, name_first, name_last):
    """
    /auth/register/
    """
    return requests.post('http://localhost:8000/auth/register', json={
        'email': email,
        'username': username,
        'password': password,
        'name_first': name_first,
        'name_last': name_last,
    })

def auth_login(email, password):
    """
    /auth/login/
    """
    return requests.post('http://localhost:8000/auth/login', json={
        'email': email,
        'password': password,
    })

def auth_logout(token):
    """
    /auth/logout/
    """
    return requests.post('http://localhost:8000/auth/logout', json={
        'token': token,
    })

def clear_data():
    """
    /clear/data/
    """
    return requests.delete('http://localhost:8000/clear/data')