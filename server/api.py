import os

from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from server.route.courses.courses import Courses
from server.route.courses.single_course import SingleCourse
from server.route.finished_courses.finished_courses import FinishedCourses


APP = Flask(__name__)
CORS(APP)
API = Api(APP)

API.add_resource(Courses, '/courses')
API.add_resource(SingleCourse, '/single_course/<string:project_id>')
API.add_resource(FinishedCourses, '/finished_courses')


if __name__ == '__main__':
    APP.run()