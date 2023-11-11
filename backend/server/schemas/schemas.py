# Converts MongoDB object to python dictionary
def serialise_pipe(pipe) -> dict:
    return {
        "pipe_id": str(pipe["_id"]),
        "name": str(pipe["name"]),
        "description": str(pipe["description"]),
        "status": str(pipe["status"]),
        "user_id": str(pipe["user_id"]),
        "microservices": str(pipe["microservices"])
    }


def list_pipes_serial(pipes) -> list:
    return [serialise_pipe(pipe) for pipe in pipes]

# Converts MongoDB object to python dictionary


def serialise_microservice(microservice_obj) -> dict:
    return {
        "name": str(microservice_obj["name"]),
        "parameters": microservice_obj["parameters"],
        "parent_file": str(microservice_obj["parent_file"]),
        "code": str(microservice_obj["code"]),
        "docstring": str(microservice_obj["docstring"]),
    }