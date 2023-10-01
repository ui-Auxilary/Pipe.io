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
|`auth/login`| POST |**Parameters:** `{email, password}`<br><br>**Return type:** `{token, auth_user_id}`| **Input Error** when any of: <br> - email entered does not belong to a user<br>- password is not correct|
|`pipes/create`| POST |**Parameters:** `{token}`<br><br>**Return type:** `{}`| **Input Error** when any of: <br> - length of name is less than 1 or more than 20 characters<br> - Pipe name already exists  |
|`pipes/delete`| POST |**Parameters:** `{token, pipe_id}`<br><br>**Return type:** `{token, auth_user_id}`| **Input Error** when: <br> - Pipe id does not exist<br>- password is not correct <br><br>**Access Error** when: <br> - Pipe id valid, but authorised user is not the original Pipe creator|
|`pipes/edit`| POST |**Parameters:** `{token, pipe_id, name, description}`<br><br>**Return type:** `{}`| **Input Error** when any of: <br> - length of name is less than 1 or more than 20 characters|
