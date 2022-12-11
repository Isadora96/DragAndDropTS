import pprint
import pymongo
import json
from bson import json_util
from flask import Response, request, abort, jsonify
from flask_restful import Resource

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

try:
    print(myclient.server_info())
except Exception:
    print("Unable to connect to the server.")


class Project(Resource):

    @staticmethod
    def get():
        pass
