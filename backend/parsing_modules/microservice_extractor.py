import importlib
import inspect
import re
import json

import sys

sys.path.append("./data")
print(sys.path)


def extract_microservice(python_file=None) -> str:
    if (python_file):
        print("FILE", python_file)
        # load the module
        imported_module = importlib.import_module(python_file)

        # create a json object to store the microservice information
        microservice_json = {}
        microservice_json['microservices'] = []

        # get each of the microservice names
        microservice_names = []
        for service in dir(imported_module):
            if not re.match(r'__.*__', service):
                # check if callable
                if callable(getattr(imported_module, service)):
                    microservice_names.append(service)

        for microservice in microservice_names:
            microservice_function = getattr(imported_module, microservice)
            microservice_signature = inspect.signature(microservice_function)

            params = []
            for param in microservice_signature.parameters.values():
                if param.default is param.empty:
                    params.append(param.name)
                else:
                    params.append(f'{param.name}={param.default}')

            doc = inspect.getdoc(microservice_function)
            microservice_json['microservices'].append({
                'name': microservice,
                'doc': doc,
                'parameters': params
            })

        return json.dumps(microservice_json, indent=4)
    return ""
