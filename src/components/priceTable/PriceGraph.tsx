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
  ChartOptions,
  Tick,
} from "chart.js";
import localeStringPrice from "./localeStringPrice";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
const PriceGraph = ({
  history,
  color,
  range,
}: {
  history: { priceUsd: number; date: Date }[];
  color: "red" | "green";
  range: "day" | "week" | "month" | "half-year" | "year";
}) => {
  const options = {
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "black",
        },
        ticks: {
          callback: function (value: number | string, index: number | string, ticks: Tick[]) {
            return "$ " + localeStringPrice(parseFloat(value as string));
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: range === "year" ? 12 : 100,
          callback: function (val: string | number, index: number, ticks: Tick[]) {
            const date = history[index].date;
            let label;
            switch (range) {
              case "day":
                label = date.toLocaleString("ru", { minute: "numeric", hour: "numeric", hour12: false });
                return label;
              case "week":
                if (!(index % 5)) {
                  label = date.toLocaleString("ru", { minute: "numeric", hour: "numeric", hour12: false });
                  return label;
                } else return undefined;
              case "month":
                label = date.toLocaleString("ru", { day: "numeric", month: "short", hour12: false });
                return label;
              case "half-year":
                if (!(index % 5)) {
                  label = date.toLocaleString("ru", { day: "numeric", month: "short", hour12: false });
                  return label;
                } else return undefined;
              case "year":
                label = date.toLocaleString("ru", { month: "short", year: "numeric", hour12: false }).slice(0, -3);
                return label;
              default:
                return undefined;
            }
          },
        },
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
          const { date } = point;
          return date.toLocaleString("ru", {
            hour12: false,
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "numeric",
          });
        }),
        datasets: [
          {
            label: "",
            data: history.map((point, index) => {
              return point.priceUsd;
            }),
            fill: true,
            borderColor: color === "green" ? "rgba(0,255,0,1)" : "rgba(255,0,0,1)",
            pointBorderWidth: 1,
            pointRadius: 0,
            backgroundColor: color === "green" ? "rgba(0,255,0,0.2)" : "rgba(255,0,0,0.2)",
          },
        ],
      }}
      options={options}
    />
  );
};

export default memo(PriceGraph);
