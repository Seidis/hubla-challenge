import { Stack, Typography } from "@mui/material";
import Card from "components/Card";
import Chart from "react-google-charts";
import { formatPrice } from "utils/functions";

export default function CardOwner({
  transactions,
  loading,
}: {
  transactions: any[];
  loading: boolean;
}) {
  const totalTransactions = transactions.reduce((a, b) => {
    if (b.transaction_type === 1 || b.transaction_type === 2) {
      a += b.transaction_value;
    }
    return a;
  }, 0);
  const totalCommission = transactions.reduce((a, b) => {
    if (b.transaction_type === 3) {
      a += b.comission;
    }
    return a;
  }, 0);

  const totalOwner = totalTransactions - totalCommission;

  const chartData = [
    ["Tipo", "Valor"],
    ["Saldo do Produtor", totalOwner],
    ["Comissões por Venda", totalCommission],
  ];

  return (
    <Card title="Saldo do Produtor" loading={loading}>
      <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ mb: 5 }}>
          {formatPrice(totalOwner)}
        </Typography>
        <Chart
          width={"100%"}
          height={"100%"}
          chartType="PieChart"
          data={chartData}
          options={{
            chartArea: {
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            },
            colors: ["#00b300", "#ff0000"],
          }}
        />
      </Stack>
    </Card>
  );
}
