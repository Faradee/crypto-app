"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { SellTotalTransactions, getTotalSellTransactions } from "@/actions/transactionActions";
import { useEffect, useState } from "react";
import Slate from "../containers/Slate";
import GraphSkeleton from "./GraphSkeleton";
ChartJS.register(Tooltip, Legend, ArcElement);
const SalesChart = () => {
  const [sales, setSales] = useState<SellTotalTransactions | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const sellTransactions = await getTotalSellTransactions();
      setSales(sellTransactions);
    };
    fetchData();
  }, []);
  const config = {
    plugins: {
      legend: {
        display: true,
        position: "right" as "right",
      },
    },
  };
  if (sales && Object.keys(sales).length > 0) {
    return (
      <Slate>
        <div>
          <h2>Продажи</h2>
          <Doughnut
            data={{
              labels: Object.keys(sales),
              datasets: [
                {
                  data: Object.keys(sales).map((coin) => sales[coin].cash),
                  backgroundColor: Object.keys(sales).map((coin) => {
                    return `rgb(${sales[coin].color[0]}, ${sales[coin].color[1]}, ${sales[coin].color[2]})`;
                  }),
                },
              ],
            }}
            options={config}
          />
        </div>
      </Slate>
    );
  } else if (sales === undefined) return <GraphSkeleton />;
  else return <></>;
};
export default SalesChart;
