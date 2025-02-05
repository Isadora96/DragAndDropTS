# CRUD API Python

Mini server-side application with python, flask and mongoDB. 

Basic operations Create, Read, Update and Delete for a person selling courses. It is possible to include the title, description, how many people joined, the author and an image cover.


## Running locally

- mongodb Atlas (create an account)
- python version 3.7

Creation of the Virtual Environment (VENV)

```bash
    python3.7 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    pip install pipenv
    pip install -r requirements.txt 
```

 ### environment variables
- Make a copy of `.env-example` as `.env`
- Set the variables required inside `.env`

```sh
export $(cat .env | xargs)
``` 

 To start the API in the terminal run the command: 

 ```sh 
 python -m server.api.app 
 ```

 - use this URL to send the requests: http://127.0.0.1:8080/ or http://localhost:8080/ )


## API Documentation

#### Returning all courses

```http
  GET /courses
```

#### Creating a COURSE

```http
  POST /courses
  Content-Type - application/json
```

```
{
	"title": "java for begginers",
	"description": "java - from begging to advance",
	"people": 1,
	author": "my name"	
}
```
#### Updating a course

```http
  PUT /courses
  Content-Type - application/json
```

```
{
	"title": "js",
	"description": "js - from begging to advance",
	"people": 10,
        "status": "finished"
}
```

#### Returning one single course

```http
  GET /single_course/${id}
```

#### Deleting all active courses

```http
  DELETE /courses
```

#### Deleting all finished courses

```http
  DELETE /finished_courses
```

#### Returning favorites

```http
  GET /favorites
```

#### Returning images

```http
  GET /upload/file
```
