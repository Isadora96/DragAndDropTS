import json

from bson import json_util
from flask import Response, request
from flask_restful import Resource
from server.db.db import db

class Favorites(Resource):

    @staticmethod
    def get():
        fav_id = db.favorites.find()
        return json.loads(json_util.dumps(fav_id))

    @staticmethod
    def post():
        favorite_id = request.json

        _id = db.favorites.find_one({"_id": favorite_id.get('fav_id')})

        if(_id):
            db.favorites.delete_one({"_id": favorite_id.get('fav_id')})
            return Response(response=json.dumps('favorite deleted sucessfully!'), status=202)
        else:
            db.favorites.insert_one({
                "_id": favorite_id.get('fav_id'),
            })
            return Response(response=json.dumps('favorite added sucessfully!'), status=201)