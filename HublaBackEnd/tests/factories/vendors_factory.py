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

    user_id = "fxjv1vkPKwUDekYMNgqoNT4sCsF2"


def fake_vendor():

    VendorFactory(name="Joao Silva")
    VendorFactory(name="Maria Silva")
    VendorFactory(name="Jose Silva")
    VendorFactory(name="Joana Silva", user_id=1)
