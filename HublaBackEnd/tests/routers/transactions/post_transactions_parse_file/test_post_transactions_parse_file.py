from tests.test_utils import get_header
from tests.conftest import client
from fastapi import status

from tests.routers.transactions.post_transactions_parse_file.responses import (
    parsed_data,
)

client = client()


class TestPostTransactionsParseFile:
    url = "/transactions/parse_file"

    def test_parse_file(self):
        file = {
            "file": open(
                "tests/routers/transactions/post_transactions_parse_file/test_file.txt",
                "rb",
            )
        }

        response = client.post(self.url, headers=get_header(), files=file)

        assert response.status_code == status.HTTP_200_OK
        assert response.json() == parsed_data
