from fastapi import APIRouter, UploadFile, File, Depends
from firebase_admin.auth import UserRecord
from sqlalchemy.orm import Session
from typing import Dict, List, Optional
from database import get_db
from api.auth import get_current_user


from models.products import Products
from models.vendors import Vendors
from models.type_transactions import TypeTransactions
from models.transactions import Transactions

from schemas.transactions import Transaction
from schemas.transactions import SaveTransaction

router = APIRouter()


@router.get("/", response_model=List[Transaction])
async def get_transactions(
    db: Session = Depends(get_db),
    # user: UserRecord = Depends(get_current_user),
    transaction_type: Optional[int] = None,
    product_id: Optional[int] = None,
    seller_id: Optional[int] = None,
):
    """
    This function returns a list of transactions based on the given filters.\n
    params:\n
        db: Session - SQLAlchemy database session
        user: UserRecord - Firebase user object
        transaction_type: int - filter by transaction type
        product_id: int - filter by product id
        seller_id: int - filter by seller id
    """

    user_id = 1
    filter_dict = {
        "transaction_type": transaction_type,
        "product_id": product_id,
        "seller_id": seller_id,
    }

    transactions = (
        db.query(
            Transactions.id,
            Transactions.transaction_type,
            Transactions.comission,
            Transactions.transaction_date,
            Products.id.label("product_id"),
            Products.name.label("product_description"),
            Products.price.label("transaction_value"),
            Vendors.id.label("seller_id"),
            Vendors.name.label("seller_name"),
            TypeTransactions.description.label("transaction_type_description"),
            TypeTransactions.signal,
        )
        .join(TypeTransactions, Transactions.transaction_type == TypeTransactions.id)
        .join(Products, Transactions.product_id == Products.id)
        .join(Vendors, Transactions.seller_id == Vendors.id)
        .filter(Transactions.user_id == user_id)
        .all()
    )

    for filter_name, filter_value in filter_dict.items():
        if filter_value:
            transactions = [
                t for t in transactions if getattr(t, filter_name) == filter_value
            ]

    return transactions


@router.post("/parse_file/", response_model=List[SaveTransaction])
async def parse_file(
    user: UserRecord = Depends(get_current_user),
    db: Session = Depends(get_db),
    file: UploadFile = File(...),
) -> List[SaveTransaction]:
    """
    This function parses the file and returns a list of dictionaries with the parsed data.\n
    params:\n
        user: UserRecord - Firebase user object
        db: Session - SQLAlchemy database session
        file: UploadFile - file to be parsed
    """

    try:
        content = await file.read()
    except Exception as e:
        return {"error": "File is not readable"}
    content = content.decode()
    lines = content.split("\n")

    type_transactions = db.query(TypeTransactions).all()

    parsed_data = []
    for line in lines:
        if line:
            transaction_type = int(line[0])
            transaction_type_description = [
                transaction.description
                for transaction in type_transactions
                if transaction.id == transaction_type
            ][0]
            transaction_date = line[1:26]
            product_description = line[26:56].strip()
            transaction_value = int(line[56:66]) / 100
            seller_name = line[66:86].strip()
            parsed_data.append(
                {
                    "transaction_type": transaction_type,
                    "transaction_type_description": transaction_type_description,
                    "transaction_date": transaction_date,
                    "product_description": product_description,
                    "transaction_value": transaction_value,
                    "seller_name": seller_name,
                }
            )
    return parsed_data


@router.post("/save_file/")
async def save_file(
    user: UserRecord = Depends(get_current_user),
    db: Session = Depends(get_db),
    data: List[SaveTransaction] = [],
) -> Dict[str, str]:
    """
    This function saves the parsed data into the database.\n
    params:\n
        user: UserRecord - Firebase user object
        db: Session - SQLAlchemy database session
        data: List[Dict[str, Union[str, int, None]]] - parsed data from the file
    """

    user_id = 1
    comission = None

    for line in data:
        vendor = check_existence_in_db(
            db=db,
            table=Vendors,
            filter_column="name",
            filter_value=line.seller_name,
            user_id=user_id,
        )
        product = check_existence_in_db(
            db=db,
            table=Products,
            filter_column="name",
            filter_value=line.product_description,
            user_id=user_id,
            price=line.transaction_value,
        )

        if line.transaction_type in [3, 4]:
            comission = line.transaction_value

        transaction = Transactions(
            product_id=product.id,
            transaction_date=line.transaction_date,
            comission=comission,
            seller_id=vendor.id,
            user_id=user_id,
            transaction_type=line.transaction_type,
        )
        db.add(transaction)
        db.commit()
        db.refresh(transaction)

    return {"message": "File saved successfully"}


def check_existence_in_db(db, table, filter_column, filter_value, user_id, **kwargs):
    """
    This function checks if a given item exists in the database.\n
    If it does, it returns the item.\n
    If it doesn't, it creates the item and returns it.\n
    Params:\n
        db: Session - SQLAlchemy database session
        table: SQLAlchemy table - table to be queried
        filter_column: SQLAlchemy column - column to be used as filter
        filter_value: str - value to be used as filter
        user_id: int - user id
        **kwargs: dict - additional arguments to be used in case the item doesn't exist
    """

    filter_criteria = {filter_column: filter_value}
    item = db.query(table).filter_by(**filter_criteria).first()
    if not item:
        item_kwargs = kwargs
        item_kwargs.update(filter_criteria)
        item_kwargs["user_id"] = user_id
        item = table(**item_kwargs)
        db.add(item)
        db.commit()
        db.refresh(item)
    return item
