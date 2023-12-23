"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import styles from "./graphs.module.scss";
import { getSellTransactions } from "@/actions/transactionActions";
import { useEffect, useState } from "react";
import Slate from "../containers/Slate";
ChartJS.register(Tooltip, Legend, ArcElement);
const SalesChart = () => {
  const [sales, setSales] = useState<Awaited<ReturnType<typeof getSellTransactions>>>(false);
  useEffect(() => {
    const fetchData = async () => {
      const sellTransactions = await getSellTransactions();
      setSales(sellTransactions);
      console.log(sellTransactions);
    };
    fetchData();
  }, []);
  const config = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  if (sales) {
    return (
      <Slate>
        <div className={styles.graphContainer}>
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
  }
};
export default SalesChart;
