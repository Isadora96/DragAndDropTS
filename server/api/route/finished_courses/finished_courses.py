
import json
from bson import json_util
from bson.objectid import ObjectId
from flask import Response, request
from flask_restful import Resource
from server.api.classes.get_date import GetDate
from server.api.db.db import db


class FinishedCourses(Resource):

    @staticmethod
    def delete():
        finished_proj = db.project_active.find({'status': 'finished'})
        has_project = json.loads(json_util.dumps(finished_proj))
        if not has_project:
            return Response(response=json.dumps('Nothing to delete!'), status=404)
        else:
            for course in has_project:
                db.favorites.find_one_and_delete({"_id": course.get('_id').get('$oid')})
                db.images.find_one_and_delete({"_id": course.get('_id').get('$oid')})
            db.project_active.delete_many({'status': 'finished'})
            return Response(response=json.dumps('All finished projects deleted sucessfully!'), status=202)
        
