# Converts MongoDB object to python dictionary
def serialise_pipe(pipe) -> dict:
    return {
        "id": str(pipe["_id"]),
        "name": str(pipe["name"]),
        "description": str(pipe["description"]),
        "status": str(pipe["status"]),
    }


def list_serial(pipes) -> list:
    return [serialise_pipe(pipe) for pipe in pipes]
