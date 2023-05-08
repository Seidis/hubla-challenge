import { GridColDef } from "@mui/x-data-grid";
import { formatName } from "./functions";
import { format } from "date-fns";
import { ITransaction } from "./interfaces";
import { TableColumn } from "react-data-table-component";
import Chip from "@mui/material/Chip";

export const DataGridColumns: GridColDef[] = [
  {
    field: "transaction_type_description",
    headerName: "Tipo da Transação",
    width: 200,
  },
  {
    field: "product_description",
    headerName: "Descrição do Produto",
    width: 300,
    valueFormatter: (params) => {
      return formatName(params.value as string);
    },
  },
  {
    field: "transaction_value",
    headerName: "Valor da Transação",
    type: "number",
    width: 200,
    valueFormatter: (params) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(params.value);
    },
  },
  {
    field: "seller_name",
    headerName: "Nome do Vendedor",
    width: 200,
    valueFormatter: (params) => {
      return formatName(params.value as string);
    },
  },
  {
    field: "transaction_date",
    headerName: "Data da Transação",
    width: 200,
    valueFormatter: (params) => {
      return format(new Date(params.value as string), "dd/MM/yyyy HH:mm:ss");
    },
  },
];

export const DataTableColumns: TableColumn<ITransaction>[] = [
  {
    name: "ID",
    selector: (row: ITransaction) => row.id,
    sortable: true,
    width: "80px",
  },
  {
    name: "Tipo da Transação",
    selector: (row: ITransaction) => row.transaction_type_description,
    sortable: true,
    width: "200px",
  },
  {
    name: "Descrição do Produto",
    selector: (row: ITransaction) => row.product_description,
    sortable: true,
    width: "250px",
    cell: (row: any) => {
      return formatName(row.product_description);
    },
  },
  {
    name: "Valor da Transação",
    selector: (row: ITransaction) => row.transaction_value,
    sortable: true,
    width: "220px",
    cell: (row: any) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(row.transaction_value);
    },
  },
  {
    name: "Nome do Vendedor",
    selector: (row: ITransaction) => row.seller_name,
    sortable: true,
    width: "200px",
    cell: (row: any) => {
      return formatName(row.seller_name);
    },
  },
  {
    name: "Comissão",
    selector: (row: ITransaction) => row.comission,
    sortable: true,
    width: "200px",
    cell: (row: any) => {
      const formatedNumber = Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(row.comission);
      console.log(row.comission);
      return row.signal ? (
        <Chip
          label={formatedNumber}
          color={row.comission !== null ? "success" : "default"}
          variant="outlined"
          sx={{
            backgroundColor: row.comission !== null ? "#EBFFE5" : "#D6DEE2",
            width: "70%",
          }}
        />
      ) : (
        <Chip
          label={formatedNumber}
          color="error"
          variant="outlined"
          sx={{
            backgroundColor: "#FDDFDF",
            width: "70%",
          }}
        />
      );
    },
  },
  {
    name: "Data da Transação",
    selector: (row: ITransaction) => row.transaction_date,
    sortable: true,
    width: "200px",
    cell: (row: any) => {
      return format(new Date(row.transaction_date), "dd/MM/yyyy HH:mm:ss");
    },
  },
];

export const dataStyle = {
  rows: {
    style: {
      cursor: "pointer",
      backgroundColor: "#fff",
      height: "8vh",
    },
  },
  headCells: {
    style: {
      textTransform: "uppercase",
      fontWeight: "600",
      fontSize: "1.1em",
      color: "#687590",
      fontFamily: "'Roboto', sans-serif",
    },
  },
  cells: {
    style: {
      fontSize: "1em",
      color: "#687590",
      fontFamily: "'Roboto', sans-serif",
    },
  },
};
