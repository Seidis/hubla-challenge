import { Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { api } from "api";
import Title from "components/Title";
import { useEffect, useState } from "react";
import CardTotal from "./CardTotal";
import { toastError } from "components/Toast";

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

  // function calculateOwner(transactions: any[]) {
  //   let ownerBalance = 0;
  //   let affiliateBalance: any = {};
  //   transactions.forEach((transaction) => {
  //     if (transaction.signal && transaction.transaction_type in [1, 2]) {
  //       ownerBalance += transaction.transaction_value;
  //     }
  //     if (!transaction.signal && transaction.transaction_type === 3) {
  //       ownerBalance -= transaction.comission;
  //       if (transaction.seller_name in affiliateBalance) {
  //         affiliateBalance[transaction.seller_name] += transaction.comission;
  //       } else {
  //         affiliateBalance[transaction.seller_name] = transaction.comission;
  //       }
  //     }
  //   });
  //   setOwner(ownerBalance);
  //   console.log(affiliateBalance);
  // }

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <Container>
      <Title title="Dashboard" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <CardTotal transactions={data} loading={loading} />
        </Grid>
      </Grid>
    </Container>
  );
}
