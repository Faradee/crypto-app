"use server";
import { getIconUrl } from "@/components/priceTable/getIconUrl";
import prisma from "../../db";
import { verifyToken } from "./userActions";
import Vibrant from "node-vibrant";
export type Transaction = {
  cryptoSymbol: string;
  cryptoName: string;
  cryptoId: string;
  type: "SELL" | "BUY";
  coin: string;
  cash: string;
};
export const getBuyTransactions = async () => {
  const uuid = await verifyToken();
  if (uuid) {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: uuid,
        type: "BUY",
      },
    });
    return transactions;
  }
  return false;
};
export const getTotalBuyTransactions = async () => {
  const uuid = await verifyToken();
  if (uuid) {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: uuid,
        type: "BUY",
      },
    });
    const investments: { [key: string]: { cash: number; color: Array<number> } } = {};
    if (transactions.length) {
      for await (const transaction of transactions) {
        const status = (await fetch(getIconUrl(transaction.cryptoSymbol))).status;
        const color =
          status !== 404
            ? (await Vibrant.from(getIconUrl(transaction.cryptoSymbol)).getPalette()).Vibrant?.toJSON().rgb
            : [0, 0, 0];
        !investments.hasOwnProperty(transaction.cryptoName)
          ? (investments[transaction.cryptoName] = { cash: transaction.cash, color: color ? color : [0, 0, 0] })
          : (investments[transaction.cryptoName].cash += transaction.cash);
      }
      return investments;
    }
  }
  return false;
};
export const getSellTransactions = async () => {
  const uuid = await verifyToken();
  if (uuid) {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: uuid,
        type: "SELL",
      },
    });
    if (transactions) return transactions;
  }
  return false;
};
export const getTotalSellTransactions = async () => {
  const uuid = await verifyToken();
  if (uuid) {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: uuid,
        type: "SELL",
      },
    });
    const sales: { [key: string]: { cash: number; color: Array<number> } } = {};
    if (transactions) {
      for await (const transaction of transactions) {
        const status = (await fetch(getIconUrl(transaction.cryptoSymbol))).status;
        const color =
          status !== 404
            ? (await Vibrant.from(getIconUrl(transaction.cryptoSymbol)).getPalette()).Vibrant?.toJSON().rgb
            : [0, 0, 0];
        !sales.hasOwnProperty(transaction.cryptoName)
          ? (sales[transaction.cryptoName] = { cash: transaction.cash, color: color ? color : [0, 0, 0] })
          : (sales[transaction.cryptoName].cash += transaction.cash);
      }
      return sales;
    }
  }
  return false;
};
export const getUserTransactionCoins = async () => {
  const uuid = await verifyToken();
  if (uuid) {
    const found = await prisma.transaction.findMany({
      where: {
        userId: uuid,
      },
      select: {
        cryptoName: true,
        cryptoSymbol: true,
      },
    });
    const getNameList = () => {
      const seen: { [key: string]: boolean } = {};
      return found.filter((coin) => {
        return seen.hasOwnProperty(coin.cryptoName) ? false : (seen[coin.cryptoName] = true);
      });
    };
    const nameList = getNameList();
    return nameList;
  }
  return false;
};
export const createTransaction = async (transaction: Transaction) => {
  const { cryptoName, coin, cash, cryptoSymbol, type } = transaction;
  const uuid = await verifyToken();
  if (uuid) {
    const created = await prisma.transaction.create({
      data: {
        cryptoSymbol,
        cryptoId: transaction.cryptoId,
        cash: parseFloat(cash),
        type,
        cryptoName,
        amount: parseFloat(coin),
        userId: uuid,
      },
    });
    if (created) return true;
  }
  return false;
};

export type BuyTransactions = Awaited<ReturnType<typeof getBuyTransactions>>;
export type SuccessfulBuyTransactions = Exclude<BuyTransactions, false>;
export type BuyTotalTransactions = Awaited<ReturnType<typeof getTotalBuyTransactions>>;
export type SuccessfulBuyTotalTransactions = Exclude<BuyTotalTransactions, false>;
export type SellTransactions = Awaited<ReturnType<typeof getSellTransactions>>;
export type SucessfulSellTransactions = Exclude<SellTransactions, false>;
export type SellTotalTransactions = Awaited<ReturnType<typeof getTotalSellTransactions>>;
export type SucessfulSellTotalTransactions = Exclude<SellTotalTransactions, false>;
