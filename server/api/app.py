import logging

from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from cheroot.wsgi import Server as WSGIServer

from server.api.route.courses.courses import Courses
from server.api.route.courses.single_course import SingleCourse
from server.api.route.finished_courses.finished_courses import FinishedCourses
from server.api.route.upload.upload import UploadImage
from server.api.route.favorites.favorites import Favorites


APP = Flask(__name__)
CORS(APP)
API = Api(APP)
PORT = 8080
SERVER = WSGIServer(('0.0.0.0', PORT), APP)

API.add_resource(Courses, '/courses')
API.add_resource(SingleCourse, '/single_course/<string:project_id>')
API.add_resource(FinishedCourses, '/finished_courses')
API.add_resource(UploadImage, '/upload/file')
API.add_resource(Favorites, '/favorites')



if __name__ == '__main__':
    logging.basicConfig(format='', level=logging.INFO)
    logging.info('Running server on port %s', PORT)
    SERVER.safe_start()
