import json

from bson import json_util
from flask import Response, request
from flask_restful import Resource
from server.db.db import db

class UploadImage(Resource):

    @staticmethod
    def get():
        img_data = db.images.find()
        return json.loads(json_util.dumps(img_data))

    @staticmethod
    def post():
        img_data = json.loads(request.data)

        img_data_id = db.images.find_one({"_id": img_data.get('image_id')})

        if(img_data_id):
            db.images.update_one({"_id": img_data.get('image_id')}, {
                '$set': {
                    "image_binary": img_data.get('image_binary')
                }
            })
        else:
            db.images.insert_one({
                "_id": img_data.get('image_id'),
                "image_binary": img_data.get('image_binary')
            })
        return Response(response=json.dumps('image added sucessfully!'), status=201)
