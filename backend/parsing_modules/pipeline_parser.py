import importlib
import json
import os
import shutil
import ast
import pprint


def execute_pipeline(pipeline_json):
    # change to the correct directory
    print('INPUT')
    pprint.pprint(pipeline_json)
    if os.getcwd().endswith('parsing_modules'):
        os.chdir('..')
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

    DATA_DIRECTORY = f'parsing_modules/pipeline_{pipeline_json["pipeline"]}'
    MICROSERVICES_DIRECTORY = '../data'

    try:
        for microservice in pipeline_json['microservices']:
            # load the microservice needed
            os.chdir(MICROSERVICES_DIRECTORY)
            python_file = microservice['file']
            
            imported_module = importlib.import_module(python_file)
            os.chdir('..')

            # call the microservices in series
            os.chdir(DATA_DIRECTORY)
            microservice_name = microservice['name']
            microservice_parameters = dict(microservice['parameters'])

            # parameters are in the form of variable: value, convert them into a list of variable=eval(value)

            for key, value_dict in microservice_parameters.items():
                print('PRE', key, value_dict['default'])
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
        print(e)
        pipeline_output['pipeline']['success'] = False
        pipeline_output['pipeline']['error'] = 'Microservce failed to execute.'

        # errors can only occur in the microservices directory
        os.chdir('..')

    # delete the data directory
    os.listdir()
    os.chdir('..')
    # shutil.rmtree(DATA_DIRECTORY)

    # save json
    print(f'Final directory is: {os.getcwd()} with {os.listdir()}')

    return json.dumps(pipeline_output, indent=4)
