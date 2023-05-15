import factory
from datetime import datetime

from models.transactions import Transactions
from tests.conftest import session


class TransactionsFactory(factory.alchemy.SQLAlchemyModelFactory):
    """
    Mocked data for transactions
    """

    class Meta:
        model = Transactions
        sqlalchemy_session = session

    user_id = "fxjv1vkPKwUDekYMNgqoNT4sCsF2"
    transaction_date = datetime(2022, 1, 15, 19, 20, 30)


def fake_transactions():
    TransactionsFactory(product_id=1, seller_id=1, transaction_type=1)
    TransactionsFactory(product_id=2, seller_id=1, transaction_type=1)
    TransactionsFactory(product_id=3, seller_id=2, transaction_type=2)
    TransactionsFactory(product_id=3, seller_id=2, transaction_type=3, comission=10)
    TransactionsFactory(product_id=3, seller_id=2, transaction_type=4, comission=10)
    TransactionsFactory(product_id=4, seller_id=4, transaction_type=1, user_id=1)
