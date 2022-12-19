import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

try:
    print(myclient.server_info())
except Exception:
    print("Unable to connect to the server.")

#projects -> my database
#project_active -> my collection
db = myclient['projects']