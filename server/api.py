from flask import Flask
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from server.route.active_project.active_project import ActiveProject
from server.route.active_project.single_active_project import SingleActiveProject
from server.route.finished_project.finished_project import FinishedProject

APP = Flask(__name__)
API = Api(APP)
PORT = 8080


API.add_resource(ActiveProject, '/active_project')
API.add_resource(SingleActiveProject, '/single_active_project/<string:project_id>')
API.add_resource(FinishedProject, '/finished_project')


if __name__ == '__main__':
    APP.run()