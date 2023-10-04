from fastapi import HTTPException

class InputError(HTTPException):
    code = 400
    message = 'Input Error'

class AccessError(HTTPException):
    code = 403
    message = 'Access Error'