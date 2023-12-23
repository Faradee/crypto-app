"use server";
import prisma from "../../db";
import { verifyToken } from "./userActions";
export type Transaction = {
  cryptoId: string;
  cryptoName: string;
  type: "SELL" | "BUY";
  coin: string;
  cash: string;
};
export const getSellTransactions = async () => {
  const uuid = await verifyToken();
  if (uuid) {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: uuid,
      },
    });
  }
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
        cryptoId: true,
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
};
export const createTransaction = async (transaction: Transaction) => {
  const { cryptoName, coin, cash } = transaction;
  const uuid = await verifyToken();
  if (uuid) {
    const created = await prisma.transaction.create({
      data: {
        cryptoId: transaction.cryptoId,
        cash: parseFloat(cash),
        type: transaction.type,
        cryptoName,
        amount: parseFloat(coin),
        userId: uuid,
      },
    });
    if (created) return true;
  }
  return false;
};
