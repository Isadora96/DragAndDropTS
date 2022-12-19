import datetime


class GetDate():

    get_date = datetime.datetime.now()

    def date(self):
        return f'{str(self.get_date.year)}-{str(self.get_date.month)}-{str(self.get_date.day)}'
