import { useState } from "react";
import { api } from "api";

import "./index.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GrDocumentUpload } from "react-icons/gr";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Input,
  Button,
} from "@mui/material";
import { formatName } from "utils/functions";
import { toastError, toastSuccess } from "components/Toast";

const columns: GridColDef[] = [
  {
    field: "transaction_type_description",
    headerName: "Tipo da Transação",
    width: 200,
  },
  {
    field: "product_description",
    headerName: "Descrição do Produto",
    width: 300,
  },
  {
    field: "transaction_value",
    headerName: "Valor da Transação",
    type: "number",
    width: 200,
  },
  { field: "seller_name", headerName: "Nome do Vendedor", width: 200 },
  { field: "transaction_date", headerName: "Data da Transação", width: 200 },
];

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    setLoading(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post("/transactions/parse_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    await api
      .post("/transactions/save_file", data)
      .then((res) => {
        console.log(res);
        toastSuccess("Dados salvos com sucesso!");
      })
      .catch(() => {
        toastError("Erro ao salvar os dados!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const rows = data.map((row, index) => ({
    id: index,
    transaction_type_description: row.transaction_type_description,
    product_description: formatName(row.product_description),
    transaction_value: row.transaction_value,
    seller_name: formatName(row.seller_name),
    transaction_date: row.transaction_date,
  }));

  return (
    <Container className="container">
      <Grid container sx={{ my: "20px" }}>
        <Grid item xs={10}>
          <Box>
            <Input type="file" onChange={handleFileSelection} />
            {selectedFile && (
              <Button
                color="success"
                onClick={handleFileUpload}
                endIcon={<GrDocumentUpload />}
                sx={{ marginLeft: "10px" }}
              >
                Carregar
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: "100%" }}
            justifyContent="flex-end"
          >
            <Button
              color="success"
              onClick={handleSave}
              disabled={loading || !selectedFile}
            >
              Salvar
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ height: "70vh", width: "100%" }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
        />
      </Box>
    </Container>
  );
}
