import { useEffect, useState } from "react";
import { api } from "api";

import {
  Autocomplete,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";

import Title from "components/Title";
import { toastError } from "components/Toast";

import CardTotal from "./CardTotal";
import CardOwner from "./CardOwner";
import CardAfiliate from "./CardAfiliate";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAfiliates, setLoadingAfiliates] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [afiliatesData, setAfiliatesData] = useState<any[]>([]);
  const [afiliate, setAfiliate] = useState<any>();

  const handleLoadData = async (search: string = "") => {
    setLoading(true);
    await api
      .get("/transactions", {
        params: search,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        toastError("Erro ao carregar dados!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  async function loadAfiliatesData() {
    setLoadingAfiliates(true);
    try {
      const response = await api.get("/vendors");
      setAfiliatesData(response.data);
      return response.data.map((afiliate: any) => ({
        title: afiliate.name,
      }));
    } catch (error) {
      console.log(error);
      toastError("Erro ao carregar afiliados!");
    } finally {
      setLoadingAfiliates(false);
    }
  }

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <Container>
      <Title title="Dashboard" />
      <Stack
        spacing={2}
        direction="row"
        sx={{ marginBottom: 2 }}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6">
          Selecione um vendedor para filtrar os valores:
        </Typography>
        <Autocomplete
          sx={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true);
            loadAfiliatesData();
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          options={afiliatesData.map((afiliate) => ({
            title: afiliate.name,
          }))}
          loading={loadingAfiliates}
          onChange={(event, newValue) => {
            setAfiliate(newValue?.title);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Vendedores"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Stack>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={4}>
          <CardTotal
            transactions={data}
            loading={loading}
            afiliate={afiliate}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CardOwner
            transactions={data}
            loading={loading}
            afiliate={afiliate}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CardAfiliate
            transactions={data}
            loading={loading}
            afiliate={afiliate}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
