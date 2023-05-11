import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "components/Card";
import PieChart from "components/PieChart";
import { formatPrice } from "utils/functions";
import { ICards } from "utils/interfaces";

export default function CardAfiliate({
  transactions,
  loading,
  afiliate,
}: ICards) {
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

  return (
    <Card
      title={afiliate ? `Saldo de ${afiliate}` : "Saldo dos Afiliados"}
      loading={loading}
    >
      <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ mb: 5 }}>
          {afiliate
            ? commissions[afiliate]
              ? formatPrice(commissions[afiliate])
              : formatPrice(0)
            : formatPrice(totalComissions)}
        </Typography>
        <PieChart data={commissions} afiliate={afiliate} />
      </Stack>
    </Card>
  );
}
