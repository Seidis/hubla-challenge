import factory

from models.vendors import Vendors
from tests.conftest import session


class VendorFactory(factory.alchemy.SQLAlchemyModelFactory):
    """
    Mocked data for vendors
    """

    class Meta:
        model = Vendors
        sqlalchemy_session = session


def fake_vendor():

    VendorFactory(name="Joao Silva", user_id=1)
    VendorFactory(name="Maria Silva", user_id=1)
    VendorFactory(name="Jose Silva", user_id=1)
    VendorFactory(name="Joana Silva", user_id=1)
