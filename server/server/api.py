from flask import Flask
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from server.route.project import Project, SingleProject

APP = Flask(__name__)
API = Api(APP)
PORT = 8080


API.add_resource(Project, '/project')
API.add_resource(SingleProject, '/single_project/<string:project_id>')


if __name__ == '__main__':
    APP.run()