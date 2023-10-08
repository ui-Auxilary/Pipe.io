from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from server.routers import pipes, users, testing, microservices


class InputError(Exception):
    def __init__(self, code: int, message: str):
        self.code = 400
        self.message = 'No message specified'


app = FastAPI()


@app.exception_handler(InputError)
async def unicorn_exception_handler(request: Request, exc: InputError):
    return JSONResponse(
        status_code=400,
        content={
            "message": f"Oops! {exc.message} did something. There goes a rainbow..."},
    )

origins = [
    "172.21.0.1:37848",
    "http://host.docker.internal",
    "http://host.docker.internal:8080",
    "http://host.docker.internal:8000",
    "http://host.docker.internal:3000",
    "http://host.docker.internal:3001",
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(pipes.router)
app.include_router(users.router)
app.include_router(testing.router)
app.include_router(microservices.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}


