from tests.test_utils import get_header
from tests.conftest import client
from fastapi import status

client = client()


class TestGetVendors:

    url = "/vendors"

    def test_get_vendors(self):
        """
        Test get endpoint for vendors
        """

        reponse = client.get(self.url, get_header())

        assert reponse.status_code == status.HTTP_200_OK
