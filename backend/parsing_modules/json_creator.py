import json

# note: this is only useful for testing
pipeline_json = {
    "pipeline": {
        "name": "flkjaflKJDLKFJD",
        "microservices": [
            {
                "file": "output",
                "name": "add_one",
                "parameters": [
                    7,
                ]
            },
            {
                "file": "output",
                "name": "add_x",
                "parameters": [
                    15,
                    7,
                ]
            },
            {
                "file": "output",
                "name": "print_hello_world",
                "parameters": [
                ]
            }
        ]
    }
}

# save the json to a file
with open('pipeline.json', 'w') as outfile:
    json.dump(pipeline_json, outfile, indent=4)