import { useEffect, useState } from "react";
import { api } from "api";

import { Grid } from "@mui/material";
import Container from "@mui/material/Container";

import Title from "components/Title";
import { toastError } from "components/Toast";

import CardTotal from "./CardTotal";
import CardOwner from "./CardOwner";
import CardAfiliate from "./CardAfiliate";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<any[]>([]);

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

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <Container>
      <Title title="Dashboard" />
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={4}>
          <CardTotal transactions={data} loading={loading} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CardOwner transactions={data} loading={loading} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CardAfiliate transactions={data} loading={loading} />
        </Grid>
      </Grid>
    </Container>
  );
}
