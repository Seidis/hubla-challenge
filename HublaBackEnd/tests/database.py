from tests.factories.vendors_factory import fake_vendor
from tests.factories.products_factory import fake_product
from tests.factories.transactions_factory import fake_transactions
from tests.factories.type_transactions_factory import fake_type_transactions


def initialize_database_instances(session):
    """
    Initialize database instances
    """

    fake_vendor()
    fake_product()
    fake_type_transactions()
    fake_transactions()

    session.commit()
