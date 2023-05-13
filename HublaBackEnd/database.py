import os
import databases
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("./firebase.json")
firebase_admin.initialize_app(cred)


DATABASE_URL = os.environ["DATABASE_URL"]

database = databases.Database(DATABASE_URL)
