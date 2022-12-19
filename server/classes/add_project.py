from server.classes.get_date import GetDate


class AddProject():

    def __init__(self, title: str, description: str, people: int, status: str):
        self.title = title,
        self.description = description,
        self.people = people,
        self.status = status
        self.created_at = GetDate().date()