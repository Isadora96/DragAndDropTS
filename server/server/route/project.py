
import pprint
import pymongo
import json
import datetime
from bson import json_util
from flask import Response, request, abort, jsonify
from flask_restful import Resource

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

try:
    print(myclient.server_info())
except Exception:
    print("Unable to connect to the server.")

#projects -> my database
#project_active -> my collection
db = myclient['projects']

class Project(Resource):

    @staticmethod
    def get():
        pass


class AddProject():

    date = datetime.datetime.now()

    def __init__(self, title: str, description: str, people: int, status: str):
        self.title = title,
        self.description = description,
        self.people = people,
        self.status = status
        self.created_at = self._get_date()

    def _get_date(self):
        return f'{str(self.date.month)}/{str(self.date.day)}/{str(self.date.year)}'
