import pathlib
import functools
import logging
from sqlalchemy import exc
from tests.conftest import session

from models.products import Products
from models.transactions import Transactions
from models.type_transactions import TypeTransactions
from models.vendors import Vendors


def manager_database_decorator(func):
    @functools.wraps(func)
    def wrapper_func(*args, **kwargs):
        try:
            instances = [*kwargs.values()][1]
            for instance in instances:
                session.add(instance)
            session.commit()

            func(*args, **kwargs)

            for instance in instances:
                session.query(get_model(type(instance).__name__)).delete()
            session.commit()
            session.rollback()

        except exc.IntegrityError as integrity_error:
            logging.error(
                "Intrity error occurred in manager_database_decorator: %s",
                integrity_error,
            )
            dispatch_database()
            raise integrity_error

        except Exception as exception:
            logging.error("General exception occurred: %s", exception)
            dispatch_database()
            raise exception

    return wrapper_func


def get_model(model_name):
    return {
        "Vendors": Vendors,
        "Products": Products,
        "Transactions": Transactions,
        "TypeTransactions": TypeTransactions,
    }.get(model_name)


def dispatch_database():
    """Dispatches the database by removing the test database file."""
    # os.remove("test.db")
    return pathlib.Path("test.db").unlink()
