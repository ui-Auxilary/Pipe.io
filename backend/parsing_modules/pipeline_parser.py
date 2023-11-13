import importlib
import json
import os
import shutil
import ast
import pprint


def execute_pipeline(pipeline_json):
    # change to the correct directory
    print('REQUESTING EXECUTION OF PIPELINE')
    if os.getcwd().endswith('parsing_modules'):
        os.chdir('..')
    if not os.getcwd().endswith('backend'):
        os.chdir('backend')
    os.chdir('parsing_modules')

    pipeline_output = {
        'pipeline': {
            'name': pipeline_json['pipeline'],
            'success': True,
            'microservices': [
            ]
        }
    }
    print(f"Directory is {os.getcwd()}")
    print(f'is has {os.listdir()}')

    if os.path.exists(f'pipeline_{pipeline_json["pipeline"]}'):
        shutil.rmtree(f'pipeline_{pipeline_json["pipeline"]}')

    os.mkdir(f'pipeline_{pipeline_json["pipeline"]}')
    
    DATA_DIRECTORY = f'../parsing_modules/pipeline_{pipeline_json["pipeline"]}'
    MICROSERVICES_DIRECTORY = '../data/microservices'

    print('Attempting execution...')
    try:
        for microservice in pipeline_json['microservices']:
            # load the microservice needed
            os.chdir(MICROSERVICES_DIRECTORY)
            python_file = microservice['file']
            
            # we do not want any file extensions on imported files
            python_file = python_file.replace('.py', '')
            imported_module = importlib.import_module(python_file)
            os.chdir('..')

            # call the microservices in series
            os.chdir(DATA_DIRECTORY)
            microservice_name = microservice['name']
            microservice_parameters = dict(microservice['parameters'])

            # parameters are in the form of variable: value, convert them into a list of variable=eval(value)

            for key, value_dict in microservice_parameters.items():
                try:
                    value = value_dict['value'] if 'value' in value_dict else value_dict['default']
                    # Attempt to parse the value with ast.literal_eval
                    parsed_value = ast.literal_eval(value)
                    microservice_parameters[key] = parsed_value
                except (ValueError, SyntaxError):
                    # Handle the case where ast.literal_eval fails
                    microservice_parameters[key] = value_dict['value'] if 'value' in value_dict else value_dict['default']

            microservice_function = getattr(imported_module, microservice_name)


            microservice_output = microservice_function(
                **microservice_parameters)
            pipeline_output['pipeline']['microservices'].append({
                'name': microservice_name,
                'output': microservice_output
            })

            os.chdir('..')
    except Exception as e:
        pipeline_output['pipeline']['success'] = False
        pipeline_output['pipeline']['error'] = f'Microservce failed to execute. Error is {e} in directory {os.getcwd()} which has {os.listdir()}'

        # errors can only occur in the microservices directory
        os.chdir('..')

    os.listdir()
    os.chdir('..')

    return json.dumps(pipeline_output, indent=4)
