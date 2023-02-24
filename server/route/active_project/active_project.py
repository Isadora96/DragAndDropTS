
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
        if not request.content_type == 'application/json':
            return Response(response=json.dumps('Content-Type header is not "application/json"!'), status=415)
        course_info = request.json
        course_id = course_info.get('id')
        title = course_info.get('title')
        status = course_info.get('status')
        people = course_info.get('people')
        description = course_info.get('description')
        project = db.project_active.find_one({"_id": ObjectId(course_id)})

        if project and status == 'active' and int(people) >= 1:
            db.project_active.update_one({"_id": ObjectId(course_id)}, {
                '$set': {
                    'title': title,
                    'description': description,
                    'people': int(people),
                    'status': status,
                    'updated_at': GetDate().date(),
                    'created_at': project.get('created_at')
                }
            })
            return Response(response=json.dumps('Project updated sucessfully!'), status=202)
        elif project and status == 'finished':
            if not 'project_finished' in db.list_collection_names():
                db.create_collection('project_finished')
            db.project_finished.insert_one({
                'title': title,
                'description': description,
                'people': int(people),
                'status': status,
                'created_at': project.get('created_at'),
                'updated_at': GetDate().date()
            })
            db.project_active.delete_one({"_id": ObjectId(course_id)})
            return Response(response=json.dumps('Project updated sucessfully!'), status=202)
        elif not project:
            return Response(response=json.dumps('That project does not exist'), status=404)

    @staticmethod
    def delete():
        data = db.project_active.find()
        has_project = json.loads(json_util.dumps(data))
        if not has_project:
            return Response(response=json.dumps('Nothing to delete!'), status=404)
        proj = db.project_active.drop()
        if not proj:
            return Response(response=json.dumps('All actives projects deleted sucessfully!'), status=202)
