from tests.test_utils import get_header
from tests.conftest import client
from fastapi import status

from tests.routers.transactions.post_transactions_save_file.request import (
    parsed_data,
)

client = client()


class TestPostTransactionsParseFile:
    url = "/transactions/save_file"

    def test_post_parse_file(self):
        response = client.post(self.url, headers=get_header(), json=parsed_data)

        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"message": "File saved successfully"}
