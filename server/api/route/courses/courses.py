
import json

from bson import json_util
from bson.objectid import ObjectId
from flask import Response, request, abort
from flask_restful import Resource
from server.api.classes.add_project import AddProject
from server.api.classes.get_date import GetDate
from server.api.db.db import db


class Courses(Resource):

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
        author = project_info.get('author')
        new_project = AddProject(title, description, people, author, 'active')
        if not title or not description:
            abort(400, 'Project title, description, people or author missing!')
        elif people < 1:
            abort(400, 'Total people must be at least 1!')
        course = db.project_active.insert_one({
            "author": new_project.author,
            "title": new_project.title, 
            "description": new_project.description, 
            "people": new_project.people,
            "status": new_project.status,
            "created_at": new_project.created_at,
            })
        return Response(response=json.dumps(f'Project added sucessfully! Object_id: {course.inserted_id}'), status=201)

    @staticmethod
    def put():
        course_info = request.json
        course_id = course_info.get('id')
        title = course_info.get('title')
        status = course_info.get('status')
        people = course_info.get('people')
        description = course_info.get('description')
        project = db.project_active.find_one({"_id": ObjectId(course_id)})

        if project and status and int(people) >= 1 and description and title:
            db.project_active.update_one({"_id": ObjectId(course_id)}, {
                '$set': {
                    'author': project.get('author'),
                    'title': title,
                    'description': description,
                    'people': int(people),
                    'status': status,
                    'updated_at': GetDate().date(),
                    'created_at': project.get('created_at')
                }
            })
            return Response(response=json.dumps('Project updated sucessfully!'), status=202)
        elif not project:
            return Response(response=json.dumps('That project does not exist'), status=404)

    @staticmethod
    def delete():
        active_projs = db.project_active.find({'status': 'active'})
        has_project = json.loads(json_util.dumps(active_projs))
        if not has_project:
            return Response(response=json.dumps('Nothing to delete!'), status=404)
        else:
            for course in has_project:
                db.favorites.find_one_and_delete({"_id": course.get('_id').get('$oid')})
                db.images.find_one_and_delete({"_id": course.get('_id').get('$oid')})
            db.project_active.delete_many({'status': 'active'})
            return Response(response=json.dumps('All actives projects deleted sucessfully!'), status=202)
