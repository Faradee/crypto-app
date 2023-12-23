"use client";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
  Tick,
  ArcElement,
} from "chart.js";

import { getSellTransactions } from "@/actions/transactionActions";
import { useEffect, useState } from "react";
import { Transaction } from "@prisma/client";
import Slate from "../containers/Slate";
import { getIconUrl } from "../priceTable/getIconUrl";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);
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
    console.log(sales);
    return (
      <Slate>
        <>
          Продажи
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
        </>
      </Slate>
    );
  }
};
export default SalesChart;
