from fastapi import APIRouter, UploadFile, File, Depends
from firebase_admin.auth import UserRecord
from sqlalchemy.orm import Session
from typing import Dict, List, Optional, Union
from database import get_db
from api.auth import get_current_user


from models.products import Products
from models.vendors import Vendors
from models.type_transactions import TypeTransactions
from models.transactions import Transactions


router = APIRouter()


@router.post("/parse_file/")
async def parse_file(
    user: UserRecord = Depends(get_current_user),
    db: Session = Depends(get_db),
    file: UploadFile = File(...),
):
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
    data: List[Dict[str, Union[str, int, None]]] = [],
):
    user_id = 1
    comission = None
    vendors = db.query(Vendors).all()
    products = db.query(Products).all()

    for line in data:
        if line["seller_name"] not in [vendor.name for vendor in vendors]:
            vendor = Vendors(name=line["seller_name"], user_id=user_id)
            db.add(vendor)
            db.commit()
            db.refresh(vendor)
        else:
            vendor = (
                db.query(Vendors).filter(Vendors.name == line["seller_name"]).first()
            )
        if line["product_description"] not in [product.name for product in products]:
            product = Products(
                name=line["product_description"],
                user_id=user_id,
                price=line["transaction_value"],
            )
            db.add(product)
            db.commit()
            db.refresh(product)
        else:
            product = (
                db.query(Products)
                .filter(Products.name == line["product_description"])
                .first()
            )
        if int(line["transaction_type"]) in [3, 4]:
            comission = line["transaction_value"]

        transaction = Transactions(
            product_id=product.id,
            transaction_date=line["transaction_date"],
            comission=comission,
            seller_id=vendor.id,
            user_id=user_id,
        )
        db.add(transaction)
        db.commit()
        db.refresh(transaction)

    return {"message": "File saved successfully"}
