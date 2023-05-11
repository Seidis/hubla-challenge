import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "components/Card";
import Chart from "react-google-charts";
import { formatPrice } from "utils/functions";

export default function cardAfiliate({
  transactions,
  loading,
  afiliate,
}: {
  transactions: any[];
  loading: boolean;
  afiliate?: string;
}) {
  const commissions = transactions.reduce((a, b) => {
    if (b.transaction_type === 4) {
      if (b.seller_name in a) {
        a[b.seller_name] += b.comission;
      } else {
        a[b.seller_name] = b.comission;
      }
    }
    return a;
  }, {});
  const totalComissions = transactions.reduce((a, b) => {
    if (b.transaction_type === 4) {
      a += b.comission;
    }
    return a;
  }, 0);

  const chartData = [["Afiliado", "Comissão"], ...Object.entries(commissions)];

  return (
    <Card
      title={afiliate ? `Saldo de ${afiliate}` : "Saldo dos Afiliados"}
      loading={loading}
    >
      <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ mb: 5 }}>
          {afiliate
            ? formatPrice(commissions[afiliate])
            : formatPrice(totalComissions)}
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
          }}
        />
      </Stack>
    </Card>
  );
}
