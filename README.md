# CRUD APP - Python, MongoDB and Angular

This is a simple application with the purpose of putting into practice what I've been learning about the technologies involved in the project (python, mongodb and angular).

## Run it locally ##


### On angular folder ###

- Angular version 15.1.4.
- Run `npm install`
- Run `npm start` to start angular development server.

### On server folder ###

- Python version 3.7.
- `pip install -r requirements.txt
- Copy file `.env-example` into a `.env` file
- Run `export $(cat .env | xargs)` in order to export the environment variables
- Run `python -m server.api.app`

For more information on how the api works click [here](https://github.com/Isadora96/FullStack-project/blob/main/server/README.md).

### On browser ###
Open `http://localhost:4200` for angular.
