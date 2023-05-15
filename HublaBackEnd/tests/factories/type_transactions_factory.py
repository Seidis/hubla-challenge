import factory

from models.type_transactions import TypeTransactions
from tests.conftest import session


class TypeTransactionsFactory(factory.alchemy.SQLAlchemyModelFactory):
    """
    Mocked data for type_transactions
    """

    class Meta:
        model = TypeTransactions
        sqlalchemy_session = session


def fake_type_transactions():
    TypeTransactionsFactory(
        id=1, description="Venda produtor", nature="Entrada", signal=True
    )
    TypeTransactionsFactory(
        id=2, description="Venda afiliado", nature="Entrada", signal=True
    )
    TypeTransactionsFactory(
        id=3, description="Comissão paga", nature="Saída", signal=False
    )
    TypeTransactionsFactory(
        id=4, description="Comissão recebida", nature="Entrada", signal=True
    )
