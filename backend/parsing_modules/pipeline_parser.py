import importlib
import json

with open('pipeline.json') as json_file:
    pipeline_json = json.load(json_file)

pipeline_output = {
    "pipeline": {
        "name": pipeline_json["pipeline"]["name"],
        "success": True,
        "microservices": [
        ]
    }
}

try:
    for microservice in pipeline_json["pipeline"]["microservices"]:
        python_file = microservice["file"]
        imported_module = importlib.import_module(python_file)

        # call the microservices in series
        microservice_name = microservice["name"]
        microservice_parameters = microservice["parameters"]
        microservice_function = getattr(imported_module, microservice_name)

        microservice_output = microservice_function(*microservice_parameters)
        pipeline_output["pipeline"]["microservices"].append({
            "name": microservice_name,
            "output": microservice_output
        })
except:
    pipeline_output["pipeline"]["success"] = False
    pipeline_output["pipeline"]["error"] = "Error message here"

# save json
with open('pipeline_output.json', 'w') as outfile:
    json.dump(pipeline_output, outfile, indent=4)