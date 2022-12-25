import unittest
from unittest.mock import patch
from werkzeug.exceptions import BadRequest

from server.route.active_project.active_project import ActiveProject


class ActiveProjectTestCase(unittest.TestCase):

    @patch('server.route.active_project.active_project.db')
    def test_get_method_returns__data(self, db_mock):

        db_mock.return_value.project_active.find.return_value = {}

        data = ActiveProject.get()

        self.assertEqual(data, {})

    @patch('server.route.active_project.active_project.request')
    @patch('server.route.active_project.active_project.db')
    def test_post_method_returns_status__201(self, db_mock, request_mock):

        request_mock.json = {
            "title": "title",
            "description": "description",
            "people": 1,
        }
        
        response = ActiveProject.post()

        self.assertEqual(response.status, '201 CREATED')
        self.assertEqual(response.response, [b'"Project added sucessfully!"'])

    @patch('server.route.active_project.active_project.request')
    @patch('server.route.active_project.active_project.db')
    def test_post_method_missing_data_status__400(self, db_mock, request_mock):

        request_mock.json = {
            "title": "",
            "description": "",
            "people": 0,
        }        

        with self.assertRaises(BadRequest):
            ActiveProject.post()
            self.assertEqual(ActiveProject.post().response.response, 'Project title, description or people missing!')

    @patch('server.route.active_project.active_project.request')
    @patch('server.route.active_project.active_project.db')
    def test_post_method_people_less_than_0_status__400(self, db_mock, request_mock):

        request_mock.json = {
            "title": "title",
            "description": "description",
            "people": 0,
        }        

        with self.assertRaises(BadRequest):
            ActiveProject.post()        
            self.assertEqual(ActiveProject.post().response.response, 'Total people must be at least 1!')

    @patch('server.route.active_project.active_project.request')
    @patch('server.route.active_project.active_project.db')
    def test_post_method_bad_json_data_status__400(self, db_mock, request_mock):

        request_mock.json = {
            "title": "title",
            "description": "description",
            "people": 5,
            "other_data": ""
        }        

        with self.assertRaises(BadRequest):
            ActiveProject.post()        
            self.assertEqual(ActiveProject.post().response.response, 'Please, provide only project title, description and people!')
