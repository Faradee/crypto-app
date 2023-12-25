"use client";
import { useEffect, useState } from "react";
import { getBuyTransactions, getSellTransactions } from "@/actions/transactionActions";
import Slate from "../containers/Slate";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./graphs.module.scss";
import GraphSkeleton from "./GraphSkeleton";
ChartJS.register(CategoryScale, LinearScale, BarElement);
const PortfolioHistory = () => {
  const [investments, setInvestments] = useState<{
    data: { date: string; number: number }[] | null[];
  }>({ data: [null] });
  const [sales, setSales] = useState<{
    data: { date: string; number: number }[] | null[];
  }>({ data: [null] });
  const formatDate = (date: Date) => {
    return date.toLocaleString("ru", { day: "numeric", month: "numeric" });
  };
  useEffect(() => {
    const fetchData = async () => {
      const sales = await getSellTransactions();
      const investments = await getBuyTransactions();
      if (investments) {
        const seen: { [key: string]: boolean } = {};
        const investmentDates = investments
          .map((investment) => formatDate(investment.createdAt))
          .filter((date) => {
            return seen.hasOwnProperty(date) ? false : (seen[date] = true);
          });
        const investmentData = investmentDates.map((date) => {
          return {
            date: date,
            number: investments.filter((investment) => formatDate(investment.createdAt) === date).length,
          };
        });
        setInvestments({
          data: investmentData ? investmentData : [null],
        });
      }
      if (sales) {
        const seen: { [key: string]: boolean } = {};
        const saleDates = sales
          .map((sale) => formatDate(sale.createdAt))
          .filter((date) => {
            return seen.hasOwnProperty(date) ? false : (seen[date] = true);
          });
        const salesData = saleDates.map((date) => {
          return { date: date, number: sales.filter((sale) => formatDate(sale.createdAt) === date).length };
        });
        setSales({
          data: salesData ? salesData : [null],
        });
      }
    };
    fetchData();
  }, []);
  const config = {
    y: {
      beginsAtZero: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        onClick: () => {},
        display: true,
      },
    },
  };
  if (investments.data.length || sales.data.length) {
    const seen: { [key: string]: boolean } = {};
    const labels = [
      ...investments.data.map((investment) => {
        if (investment) return investment.date;
      }),
      ...sales.data.map((sale) => {
        if (sale) return sale.date;
      }),
    ].filter((date) => {
      if (date) {
        return seen.hasOwnProperty(date) ? false : (seen[date] = true);
      }
    });
    if (labels.length)
      return (
        <Slate>
          <div className={styles.container}>
            <h2>История транзакций</h2>
            <Bar
              data={{
                labels: labels,

                datasets: [
                  {
                    label: "Инвестиции",
                    data: investments.data.map((investment) => (investment ? investment.number : 0)) as any,
                    backgroundColor: "rgba(0,255,0,0.5)",
                  },
                  {
                    label: "Продажи",
                    data: sales.data.map((sale) => (sale ? sale.number : 0)) as any,
                    backgroundColor: "rgba(255,0,0,0.9)",
                  },
                ],
              }}
              options={config}
            />
          </div>
        </Slate>
      );
  }
  return <GraphSkeleton />;
};
export default PortfolioHistory;
