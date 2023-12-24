"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { BuyTotalTransactions, getTotalBuyTransactions } from "@/actions/transactionActions";
import { useEffect, useState } from "react";
import Slate from "../containers/Slate";
import GraphSkeleton from "./GraphSkeleton";
ChartJS.register(Tooltip, Legend, ArcElement);
const InvestmentsChart = () => {
  const [investments, setInvestments] = useState<BuyTotalTransactions | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const buyTransactions = await getTotalBuyTransactions();
      setInvestments(buyTransactions);
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
  if (investments && Object.keys(investments).length > 0) {
    return (
      <Slate>
        <>
          <h2>Инвестиции</h2>
          <Doughnut
            data={{
              labels: Object.keys(investments),
              datasets: [
                {
                  data: Object.keys(investments).map((coin) => investments[coin].cash),
                  backgroundColor: Object.keys(investments).map((coin) => {
                    return `rgb(${investments[coin].color[0]}, ${investments[coin].color[1]}, ${investments[coin].color[2]})`;
                  }),
                },
              ],
            }}
            options={config}
          />
        </>
      </Slate>
    );
  } else if (investments === undefined) return <GraphSkeleton />;
  else return <></>;
};
export default InvestmentsChart;
