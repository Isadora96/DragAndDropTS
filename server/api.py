from flask import Flask
from flask_restful import Api, Resource
from server.route.project import Project

APP = Flask(__name__)
API = Api(APP)
PORT = 8080

API.add_resource(Project, '/project')


if __name__ == '__main__':
    APP.run()