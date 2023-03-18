from server.api.classes.get_date import GetDate


class AddProject():

    def __init__(self, title: str, description: str, people: int, author: str, status: str):
        self.author = author,
        self.title = title,
        self.description = description,
        self.people = people,
        self.status = status
        self.created_at = GetDate().date()