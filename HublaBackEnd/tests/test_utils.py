import functools
import logging
import pyrebase
import os
from dotenv import load_dotenv

load_dotenv()

FIREBASE_API_KEY = os.getenv("FIREBASE_API_KEY")
FIREBASE_AUTH_DOMAIN = os.getenv("FIREBASE_AUTH_DOMAIN")
FIREBASE_DATABASE_URL = os.getenv("FIREBASE_DATABASE_URL")
FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID")
FIREBASE_STORAGE_BUCKET = os.getenv("FIREBASE_STORAGE_BUCKET")
FIREBASE_MESSAGING_SENDER_ID = os.getenv("FIREBASE_MESSAGING_SENDER_ID")
FIREBASE_APP_ID = os.getenv("FIREBASE_APP_ID")
FIREBASE_MEASUREMENT_ID = os.getenv("FIREBASE_MEASUREMENT_ID")


firebaseConfig = {
    "apiKey": FIREBASE_API_KEY,
    "authDomain": FIREBASE_AUTH_DOMAIN,
    "databaseURL": FIREBASE_DATABASE_URL,
    "projectId": FIREBASE_PROJECT_ID,
    "storageBucket": FIREBASE_STORAGE_BUCKET,
    "messagingSenderId": FIREBASE_MESSAGING_SENDER_ID,
    "appId": FIREBASE_APP_ID,
    "measurementId": FIREBASE_MEASUREMENT_ID,
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()


def check_testserver(func):
    @functools.wraps(func)
    def wrapper_func(*args, **kwargs):
        for instance in args:
            try:
                user_agent = instance.headers.get("user-agent")
                if user_agent == "testclient":
                    return None
            except AttributeError as error:
                logging.error(
                    "Atribute error while trying to check testserver: %s",
                    error,
                )

        func(*args, **kwargs)

    return wrapper_func


def get_login(email, password):
    return auth.sign_in_with_email_and_password(email, password)


def get_header():
    return {
        "Authorization": f"Bearer {get_login('pluizarruda@gmail.com', '123456').get('idToken')}"
    }
