
import json
from bson import json_util
from bson.objectid import ObjectId
from flask import Response, request
from flask_restful import Resource
from server.classes.get_date import GetDate
from server.db.db import db


class FinishedProject(Resource):

    @staticmethod
    def get():
        data = db.project_finished.find()
        return json.loads(json_util.dumps(data))

    @staticmethod
    def put():
        project_id = str(request.form['project_id'])
        project_status = str(request.form['staus'])
        project = db.project_finished.find_one({"_id": ObjectId(project_id)})
        if project and project_status == 'active':
            db.project_active.insert_one({
                'title': request.form['title'],
                'description': request.form['description'],
                'people': int(request.form['people']),
                'staus': 'active',
                'updated_at': GetDate().date()
            })
            db.project_finished.delete_one({"_id": ObjectId(project_id)})
            return Response(response=json.dumps('Project updated sucessfully!'), status=202)
        elif project and project_status != 'active':
            return Response(response=json.dumps('Project status must be update to "active"!'), status=404)
        else:
            return Response(response=json.dumps('That project does not exist'), status=404)

    @staticmethod
    def delete():
        proj = db.get_collection('project_finished').estimated_document_count()
        if proj:
            db.project_finished.drop()
            return Response(response=json.dumps('All finished projects deleted sucessfully!'), status=202)
        
        return Response(response=json.dumps('Nothing to delete!'), status=404)
