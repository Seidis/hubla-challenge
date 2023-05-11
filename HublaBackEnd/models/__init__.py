from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

from models.vendors import Vendors
from models.transactions import Transactions
from models.type_transactions import TypeTransactions
from models.products import Products
