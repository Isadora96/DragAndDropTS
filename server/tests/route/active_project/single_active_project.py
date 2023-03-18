import unittest
from unittest.mock import patch
from werkzeug.exceptions import BadRequest

from server.route.active_project.single_active_project import SingleActiveProject


class SingleActiveProjectTestCase(unittest.TestCase):

    @patch("server.route.active_project.single_active_project.db")
    @patch("server.route.active_project.single_active_project.ObjectId")
    def test_get_method_returns__data(self, db_mock, object_id):
        db_mock.project_active.find.return_value = {}

        data = SingleActiveProject.get("fake_id")

        self.assertEqual(data, {})
