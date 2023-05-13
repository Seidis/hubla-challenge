import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "components/Card";
import PieChart from "components/PieChart";
import { formatPrice } from "utils/functions";
import { ICards } from "utils/interfaces";

export default function CardTotal({ transactions, loading, afiliate }: ICards) {
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

  const totalTransactions = transactions.reduce((a, b) => {
    if (b.transaction_type === 1 || b.transaction_type === 2) {
      a += b.transaction_value;
    }
    return a;
  }, 0);

  return (
    <Card
      title={afiliate ? `Vendas de ${afiliate}` : "Total em Vendas"}
      loading={loading}
    >
      <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ mb: 5 }}>
          {afiliate
            ? formatPrice(afiliateTotal[afiliate])
            : formatPrice(totalTransactions)}
        </Typography>
        <PieChart data={afiliateTotal} afiliate={afiliate} />
      </Stack>
    </Card>
  );
}
