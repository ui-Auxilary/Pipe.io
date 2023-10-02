from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.routers import pipes

app = FastAPI()

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


@app.get("/")
def read_root():
    return {"Hello": "World"}