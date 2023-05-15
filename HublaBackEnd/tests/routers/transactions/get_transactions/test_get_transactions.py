from tests.test_utils import get_header
from tests.conftest import client
from fastapi import status

from tests.routers.transactions.get_transactions.responses import get_transactions

client = client()


class TestGetTransactions:
    url = "/transactions"

    def test_get_transactions(self):
        """
        Test get endpoint for transactions
        """

        reponse = client.get(self.url, headers=get_header())
        print(reponse.json())

        assert reponse.status_code == status.HTTP_200_OK
        assert reponse.json() == get_transactions
