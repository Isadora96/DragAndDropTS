import unittest
from unittest.mock import patch
from werkzeug.exceptions import BadRequest

from server.route.active_project.active_project import ActiveProject
from server.db.db import db

class ActiveProjectTestCase(unittest.TestCase):

    @patch('server.route.active_project.active_project.db')
    def test_get_method_returns__data(self, db_mock):

        db_mock.return_value.project_active.find.return_value = {}

        data = ActiveProject.get()

        self.assertEqual(data, {})

    @patch('server.route.active_project.active_project.request')
    def test_post_method_returns_status__201(self, request_mock):

        request_mock.json = {
            "title": "title",
            "description": "description",
            "people": 1,
            "status": "status"
        }
        
        response = ActiveProject.post()

        self.assertEqual(response.status, '201 CREATED')

    @patch('server.route.active_project.active_project.request')
    def test_post_method_missing_data_status__400(self, request_mock):

        request_mock.json = {
            "title": "",
            "description": "",
            "people": 0,
            "status": ""
        }        
        with self.assertRaises(BadRequest):
            ActiveProject.post()
