import Box from "@mui/material/Box";
import {
  ArcElement,
  Chart,
  Colors,
  Legend,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { formatPrice } from "utils/functions";

export default function PieChart({
  data,
  afiliate,
}: {
  data: any;
  afiliate: string;
}) {
  Chart.register(ArcElement, Tooltip, Legend, Colors);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: (ctx: any) => {
          if (afiliate === undefined) {
            return ctx.chart.data.datasets[0].data.map(() => {
              return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
              )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
            });
          } else {
            return ctx.chart.data.datasets[0].data.map(
              (value: number, index: number) => {
                return afiliate === chartData.labels[index]
                  ? "green"
                  : "rgba(128, 128, 128, 0.5)";
              }
            );
          }
        },
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"pie">) =>
            formatPrice(tooltipItem.parsed as number),
        },
      },
      colors: {
        enabled: true,
      },
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
    responsive: true,
    aspectRatio: 1,
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Pie data={chartData} options={options} />
    </Box>
  );
}
