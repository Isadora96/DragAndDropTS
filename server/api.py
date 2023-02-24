from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from server.route.active_project.active_project import ActiveProject
from server.route.active_project.single_active_project import SingleActiveProject
from server.route.finished_project.finished_project import FinishedProject
from server.route.finished_project.finished_single_project import SingleFinishedProject


APP = Flask(__name__)
CORS(APP)
API = Api(APP)

API.add_resource(ActiveProject, '/active_project')
API.add_resource(SingleActiveProject, '/active_project/<string:project_id>')
API.add_resource(FinishedProject, '/finished_project')
API.add_resource(SingleFinishedProject, '/finished_project/<string:project_id>')


if __name__ == '__main__':
    APP.run()