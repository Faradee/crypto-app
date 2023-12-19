import { memo } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
const PriceGraph = ({ history }: { history: any[] }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      tooltip: {
        intersect: false,
        mode: "index" as "index",
      },
      legend: {
        display: false,
      },
    },
  };
  return (
    <Line
      data={{
        labels: history.map((point, index) => {
          return point.date;
        }),
        datasets: [
          {
            label: "История цены",
            data: history.map((point, index) => {
              return point.priceUsd;
            }),
            fill: true,
            borderColor: "rgba(0,255,0,1)",
            pointBorderWidth: 1,
            pointRadius: 0,
            backgroundColor: "rgba(0,255,0,0.2)",
          },
        ],
      }}
      options={options}
    />
  );
};

export default memo(PriceGraph);
