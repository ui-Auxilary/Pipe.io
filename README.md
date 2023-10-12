# Capstone-project-3900h15auntiltedproject
### Introduction

### Installation
1. Download [Docker](https://www.docker.com/get-started/) & install

2. Clone this repository from github

3. On the root directory run `docker compose build`

4. Run docker compose up frontend | docker compose up backend to run the frontend or backend respectively 

### Interface Methods
| Name and description |HTTP Method |Data Types|Exceptions|
|--|--|--|--|
|`auth/login` <br><br>Given a registered user's email and password, returns their `token` value| POST |**Parameters:** `{email, password}`<br><br>**Return type:** `{token, auth_user_id}`| **Input Error** when any of: <br> - email entered does not belong to a user<br>- password is not correct|
|`auth/register` <br><br>Given a user's first and last name, email address, and password, create a new account for them and return a new `token`. <br><br>A handle is generated that is the concatenation of their casted-to-lowercase alphanumeric (a-z0-9) first name and last name (i.e. make lowercase then remove non-alphanumeric characters). If the concatenation is longer than 20 characters, it is cut off at 20 characters. | POST |**Parameters:** `{email, password, username}`<br><br>**Return type:** `{token, auth_user_id}`| **Input Error** when any of: <br> - email entered is invalid<br> - email is already in use by another user <br> - username is already in use by another user <br> - password entered is less than 6 characters|
|`auth/logout` <br><br>Given a valid token, logs a user out of all their active sessions| POST |**Parameters:** `{token}`<br><br>**Return type:** `{}`| **Input Error** N/A|
|`pipes/listall` <br><br>Provide a list of all pipes (and their associated details)| GET|**Parameters:** `{token}`<br><br>**Return type:** `{Pipes}`| N/A
|`pipes/create`<br><br>Creates a new pipe with the given name and description.| POST |**Parameters:** `{token, microservices}`<br><br>**Return type:** `{}`| **Input Error** when any of: <br> - length of name is less than 1 or more than 20 characters<br> - Pipe name already exists  |
|`pipes/details`<br><br>Given a valid pipe_id, an authorised user can view the details of the pipe**Return type| GET|**Parameters:** `{token, pipe_id}`<br>:**Return** `{name, description, user_id, microservices}`| **Input Error** when any of: <br> - length of name is less than 1 or more than 20 characters<br> - Pipe name already exists  |
|`pipes/delete`| DELETE |**Parameters:** `{token, pipe_id}`<br><br>**Return type:** `{token, auth_user_id}`| **Input Error** when: <br> - Pipe id does not exist<br>- password is not correct <br><br>**Access Error** when: <br> - Pipe id valid, but authorised user is not the original Pipe creator|
|`pipes/edit`| PUT |**Parameters:** `{token, pipe_id, name, description}`<br><br>**Return type:** `{}`| **Input Error** when any of: <br> - length of name is less than 1 or more than 20 characters|
|`pipes/upload_file`| PUT |**Parameters:** `{token, pipe_id, filename, file_type}`<br><br>**Return type:** `{}`| **Input Error** when any of: <br> - length of filename is less than 1 or more than 20 characters|


### Interface Data Types
| Variable Name | Type |
| --- | --- |
| `email` | `string` |
| `password` | `string` |
| `username` | `string` |
| `token` | `string` |
|` name` | `string` |
| `description` | `string`|
| contains suffix `id` | `integer` |
| named exactly `Pipes` | <code>Object</code> containg keys <code>{name, description, status, user_id, microservices}</code>|
| `status` | `Optional[str]` |
| `user_id` | `Optional[str]` |
| `microservices` | `[Microservices]` |
| `Microservices` | <code>Object</code> containg keys <code>{name, parameters, parent_file, code, docstring}</code>|
| `parameters` | `dict` containg parameter names and any default parameter values (`None` if no default parameter value)|
| `parent_file` | `str` |
| `code` | `str` |
| `docstring` | `Optional[str]` |
