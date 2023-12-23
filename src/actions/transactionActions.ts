"use server";
import { getIconUrl } from "@/components/priceTable/getIconUrl";
import prisma from "../../db";
import { verifyToken } from "./userActions";
import Vibrant from "node-vibrant";
import { Swatch } from "@vibrant/color";
export type Transaction = {
  cryptoSymbol: string;
  cryptoName: string;
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
export const getSellTransactions = async () => {
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
        const color = (await Vibrant.from(getIconUrl(transaction.cryptoSymbol)).getPalette()).Vibrant?.toJSON().rgb;
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
