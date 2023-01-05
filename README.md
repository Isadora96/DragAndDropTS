# CRUD API 


# CRUD API Python

Mini server-side application with python, flask and mongoDB. 

Basic operations Create, Read, Update and Delete for a person selling courses. It is possible to include the title, description, how many people joined the course and its status.


## Running locally

- mongodb
- mongosh
- python version 3.7

Clone the project

```bash
  git fork  
  git clone <your ssh clone>
```

Creation of the Virtual Environment (VENV)

```bash
    python3.7 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    pip install pipenv
    pip install -r requirements.txt 
```

Mongodb must be running locally

```
 mongodb://127.0.0.1:27017
````

 To start the API in the terminal run the command: 

 ```sh 
 python -m server.api 
 ```

 - use this URL to send the requests: http://127.0.0.1:5000/ or http://localhost:5000/ )


## API Documentation

#### Returning all active projects

```http
  GET /active_project
```

#### Returning one single active project

```http
  GET /single_active_project/${id}
```

#### Returning all finished project

```http
  GET /finished_project/
```

#### Returning one finished project

```http
  GET /single_finished_project/${id}
```

#### Creating a project

```http
  POST /active_project
  Content-Type - JSON
```

```
{
	"title": "java for begginers",
	"description": "java - from begging to advance",
	"people": 1
}
```
#### Updating an active project

```http
  PUT /active_project
  Content-Type - application/x-www-form-urlencoded
```

```
project_id / title / description / people / status
```

#### Updating a finished project

```http
  PUT /finished_project
  Content-Type - application/x-www-form-urlencoded
```

```
project_id / title / description / people / status
```

#### Deleting all active project

```http
  DELETE /active_project
```

#### Deleting all finished project

```http
  DELETE /finished_project
```

#### Deleting one finished project

```http
  DELETE /single_finished_project/${id}
```
## Running unittest

To run all the tests, run the following command

```bash
  python -m unittest discover -v -s "tests/route/active_project" -p "*.py"
```


