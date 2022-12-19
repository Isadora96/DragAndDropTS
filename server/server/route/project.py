
import pprint
import pymongo
import json
import datetime
from bson import json_util
from bson.objectid import ObjectId
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
        data = db.project_active.find()
        return json.loads(json_util.dumps(data))


    @staticmethod
    def post():
        project_info = request.json
        title = project_info.get('title')
        description = project_info.get('description')
        people = project_info.get('people')
        status = project_info.get('status')
        new_project = AddProject(title, description, people, status)
        db.project_active.insert_one({
            "title": new_project.title, 
            "description": new_project.description, 
            "people": new_project.people,
            "status": new_project.status,
            "created_at": new_project.created_at
            })
        return Response(response=json.dumps('Project added sucessfully!'), status=201)

    @staticmethod
    def put():
        project_id = str(request.form['project_id'])
        project = db.project_active.find_one({"_id": ObjectId(project_id)})
        if project:
            db.project_active.update_one({"_id": ObjectId(project_id)}, {
                '$set': {
                    'title': request.form['title'],
                    'description': request.form['description'],
                    'people': int(request.form['people']),
                    'staus': request.form['staus'],
                    'updated_at': GetDate().date()
                }
            })
            return Response(response=json.dumps('Project updated sucessfully!'), status=202)
        else:
            return Response(response=json.dumps('That project does not exist'), status=404)

    @staticmethod
    def delete():
        proj = db.project_active.drop()
        if not proj:
            return Response(response=json.dumps('All projects deleted sucessfully!'), status=202)


class SingleProject(Resource):

    @staticmethod
    def get(project_id:str):
        single_proj = db.project_active.find_one({"_id": ObjectId(project_id)})
        if single_proj:
            return json.loads(json_util.dumps(single_proj))

        return Response(response=json.dumps('That project does not exist'), status=404) 

    @staticmethod
    def delete(project_id:str):
        single_proj = db.project_active.find_one({"_id": ObjectId(project_id)})
        if single_proj:
            db.project_active.delete_one({"_id": ObjectId(project_id)})
            return Response(response=json.dumps('Project deleted sucessfully!'), status=202)
               
        return Response(response=json.dumps('That project does not exist'), status=404)

class AddProject():

    def __init__(self, title: str, description: str, people: int, status: str):
        self.title = title,
        self.description = description,
        self.people = people,
        self.status = status
        self.created_at = GetDate().date()

class GetDate():

    get_date = datetime.datetime.now()

    def date(self):
        return f'{str(self.get_date.year)}-{str(self.get_date.month)}-{str(self.get_date.day)}'

