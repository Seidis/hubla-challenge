from tests.test_utils import get_header
from tests.conftest import client
from fastapi import status

from tests.routers.products.get_products.responses import get_products

client = client()


class TestGetProducts:
    url = "/products"

    def test_get_products(self):
        """
        Test get endpoint for products
        """

        reponse = client.get(self.url, headers=get_header())

        assert reponse.status_code == status.HTTP_200_OK
        assert reponse.json() == get_products
