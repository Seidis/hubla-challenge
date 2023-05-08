import { DataTableColumns, dataStyle } from "utils/data_table";
import { ITransaction } from "utils/interfaces";

import { Container } from "@mui/material";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { api } from "api";
import TableSkeleton from "components/TableSkeleton";

export default function Transactions() {
  const [data, setData] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoadTransactions = async () => {
    setLoading(true);
    api
      .get("/transactions")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleLoadTransactions();
  }, []);

  return (
    <Container>
      <DataTable
        columns={DataTableColumns}
        customStyles={dataStyle}
        data={data}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 50, 100]}
        paginationComponentOptions={{
          rowsPerPageText: "Linhas por página:",
          rangeSeparatorText: "de",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "Todos",
        }}
        noDataComponent="Nenhum dado encontrado!"
        progressPending={loading}
        progressComponent={
          <TableSkeleton rows={10} columns={DataTableColumns.length} />
        }
        fixedHeader
        fixedHeaderScrollHeight="calc(90vh - 200px)"
        highlightOnHover
        pointerOnHover
        dense
      />
    </Container>
  );
}
