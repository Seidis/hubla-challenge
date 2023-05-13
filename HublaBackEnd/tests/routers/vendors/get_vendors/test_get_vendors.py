from tests.test_utils import get_header
from tests.conftest import client
from fastapi import status

from response import get_vendor

client = client()


class TestGetVendors:

    url = "/vendors"

    def test_get_vendors(self):
        """
        Test get endpoint for vendors
        """

        reponse = client.get(self.url, headers=get_header())

        assert reponse.status_code == status.HTTP_200_OK
        assert reponse.json() == get_vendor
