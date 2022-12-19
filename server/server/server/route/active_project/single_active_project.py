import json
from bson import json_util
from bson.objectid import ObjectId
from flask import Response
from flask_restful import Resource
from server.db.db import db

class SingleActiveProject(Resource):

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