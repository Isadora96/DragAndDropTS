
import json
from bson import json_util
from bson.objectid import ObjectId
from flask import Response, request, abort
from flask_restful import Resource
from server.classes.add_project import AddProject
from server.classes.get_date import GetDate
from server.db.db import db


class ActiveProject(Resource):

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
        new_project = AddProject(title, description, people, 'active')
        if not title or not description:
            abort(400, 'Project title, description or people missing!')
        elif people < 1:
            abort(400, 'Total people must be at least 1!')
        elif len(project_info) > 3:
            abort(400, 'Please, provide only project title, description and people!')
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
        project_status = str(request.form['staus'])
        project = db.project_active.find_one({"_id": ObjectId(project_id)})
        if project and project_status == 'active':
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
        elif project and project_status == 'finished':
            if not 'project_finished' in db.list_collection_names():
                db.create_collection('project_finished')
            db.project_finished.insert_one({
                'title': request.form['title'],
                'description': request.form['description'],
                'people': int(request.form['people']),
                'staus': request.form['staus'],
                'created_at': project.get('created_at'),
                'updated_at': GetDate().date()
            })
            db.project_active.delete_one({"_id": ObjectId(project_id)})
            return Response(response=json.dumps('Project updated sucessfully!'), status=202)
        else:
            return Response(response=json.dumps('That project does not exist'), status=404)

    @staticmethod
    def delete():
        proj = db.project_active.drop()
        if not proj:
            return Response(response=json.dumps('All actives projects deleted sucessfully!'), status=202)
