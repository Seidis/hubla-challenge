export interface ITransaction {
  id: number;
  transaction_type_description: string;
  product_description: string;
  transaction_value: number;
  seller_name: string;
  transaction_date: string;
  comission: number;
  signal: boolean;
}

export interface ICards {
  transactions: any[];
  loading: boolean;
  afiliate: string;
}
