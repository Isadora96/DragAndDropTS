# CRUD API Python

Mini server-side application with python, flask and mongoDB. 

Basic operations Create, Read, Update and Delete for a person selling courses. It is possible to include the title, description, how many people joined the course and its status.


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
 python -m server.api 
 ```

 - use this URL to send the requests: http://127.0.0.1:5000/ or http://localhost:5000/ )


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
	"people": 1
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
