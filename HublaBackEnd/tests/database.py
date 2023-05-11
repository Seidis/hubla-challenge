from tests.factories.vendors_factory import fake_vendor


def initialize_database_instances(session):
    """
    Initialize database instances
    """

    fake_vendor()

    session.commit()
