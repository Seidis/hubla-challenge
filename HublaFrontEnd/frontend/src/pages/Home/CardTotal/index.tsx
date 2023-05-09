import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "components/Card";
import Chart from "react-google-charts";

export default function CardTotal({
  transactions,
  loading,
}: {
  transactions: any[];
  loading: boolean;
}) {
  const afiliateTotal = transactions.reduce((a, b) => {
    if (b.transaction_type === 1 || b.transaction_type === 2) {
      if (b.seller_name in a) {
        a[b.seller_name] += b.transaction_value;
      } else {
        a[b.seller_name] = b.transaction_value;
      }
    }
    return a;
  }, {});

  const chartData = [["Afiliado", "Vendas"], ...Object.entries(afiliateTotal)];
  const totalTransactions = transactions.reduce(
    (a, b) => a + b.transaction_value,
    0
  );

  return (
    <Card title="Total em Vendas" loading={loading}>
      <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ mb: 5 }}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalTransactions)}
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
            legend: {
              position: "bottom",
            },
          }}
        />
      </Stack>
    </Card>
  );
}
