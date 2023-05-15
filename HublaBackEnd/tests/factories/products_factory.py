import factory

from models.products import Products
from tests.conftest import session


class ProductFactory(factory.alchemy.SQLAlchemyModelFactory):
    """
    Mocked data for products
    """

    class Meta:
        model = Products
        sqlalchemy_session = session

    user_id = "fxjv1vkPKwUDekYMNgqoNT4sCsF2"


def fake_product():
    ProductFactory(name="CURSO DE ANGULAR", price=100)
    ProductFactory(name="CURSO DE PYTHON", price=200)
    ProductFactory(name="CURSO DE JAVA", price=300)
    ProductFactory(name="CURSO DE C#", price=400, user_id=1)
