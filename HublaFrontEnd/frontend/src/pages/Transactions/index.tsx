import { DataTableColumns, dataStyle } from "utils/data_table";
import { ITransaction } from "utils/interfaces";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { api } from "api";
import TableSkeleton from "components/TableSkeleton";
import { toastError } from "components/Toast";

export default function Transactions() {
  const [data, setData] = useState<ITransaction[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoadTransactions = async (search: string = "") => {
    setLoading(true);
    api
      .get("/transactions", { params: { search } })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        toastError("Erro ao carregar as transações!");
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
      <Box sx={{ my: "5vh" }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          justifyContent={"space-between"}
        >
          <Stack direction="row" sx={{ width: "80%" }} spacing={2}>
            <TextField
              id="search"
              label="Barra de Pesquisa"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />
            <Button
              onClick={() => handleLoadTransactions(search)}
              disabled={search.length < 3 ? true : false}
            >
              Pesquisar
            </Button>
          </Stack>
          <Button>Nova Transação</Button>
        </Stack>
      </Box>
      <DataTable
        columns={DataTableColumns}
        customStyles={dataStyle}
        data={data}
        defaultSortFieldId="transaction_date"
        defaultSortAsc={false}
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
