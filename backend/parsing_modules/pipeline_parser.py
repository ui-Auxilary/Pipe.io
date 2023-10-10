import importlib
import json
import os

def execute_pipeline(pipeline_json):
    pipeline_output = {
        'pipeline': {
            'name': pipeline_json['pipeline']['name'],
            'success': True,
            'microservices': [
            ]
        }
    }

    os.mkdir(f'pipeline_{pipeline_json["pipeline"]["name"]}')
    DATA_DIRECTORY = f'pipeline_{pipeline_json["pipeline"]["name"]}'
    MICROSERVICES_DIRECTORY = 'microservices'

    try:
        for microservice in pipeline_json['pipeline']['microservices']:
            # load the microservice needed
            os.chdir(MICROSERVICES_DIRECTORY)
            python_file = microservice['file']
            imported_module = importlib.import_module(python_file)
            os.chdir('..')

            # call the microservices in series
            os.chdir(DATA_DIRECTORY)
            microservice_name = microservice['name']
            microservice_parameters = microservice['parameters']
            microservice_function = getattr(imported_module, microservice_name)

            microservice_output = microservice_function(*microservice_parameters)
            pipeline_output['pipeline']['microservices'].append({
                'name': microservice_name,
                'output': microservice_output
            })
            os.chdir('..')
    except:
        pipeline_output['pipeline']['success'] = False
        pipeline_output['pipeline']['error'] = 'Microservce failed to execute.'

        # errors can only occur in the microservices directory
        os.chdir('..')

    # delete the data directory
    os.rmdir('DATA_DIRECTORY')

    # save json
    with open('pipeline_output.json', 'w') as outfile:
        json.dump(pipeline_output, outfile, indent=4)