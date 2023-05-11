import { Stack, Typography } from "@mui/material";
import Card from "components/Card";
import PieChart from "components/PieChart";
import { formatPrice } from "utils/functions";
import { ICards } from "utils/interfaces";

export default function CardOwner({ transactions, loading, afiliate }: ICards) {
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

  const chartData = {
    "Saldo do Produtor": totalOwner,
    "Comissões por Venda": totalCommission,
  };

  return (
    <Card title="Saldo do Produtor" loading={loading}>
      <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ mb: 5 }}>
          {formatPrice(totalOwner)}
        </Typography>
        <PieChart data={chartData} afiliate={afiliate} />
      </Stack>
    </Card>
  );
}
