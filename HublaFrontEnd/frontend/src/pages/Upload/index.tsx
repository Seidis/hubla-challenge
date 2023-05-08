import { useState } from "react";
import { api } from "api";
import { useNavigate } from "react-router-dom";
import { DataGridColumns } from "utils/data_table";

import { DataGrid } from "@mui/x-data-grid";
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
import { toastError, toastSuccess } from "components/Toast";

export default function Upload() {
  const navigateTo = useNavigate();

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
      await api
        .post("/transactions/parse_file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch(() => {
          toastError("Erro ao carregar os dados!");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    await api
      .post("/transactions/save_file", data)
      .then((res) => {
        toastSuccess("Dados salvos com sucesso!");
        navigateTo("/transactions");
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
    product_description: row.product_description,
    transaction_value: row.transaction_value,
    seller_name: row.seller_name,
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
          columns={DataGridColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
        />
      </Box>
    </Container>
  );
}
