"use server";
import prisma from "../../db";
import { verifyToken } from "./userActions";
export type Transaction = {
  cryptoName: string;
  coin: string;
  cash: string;
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
      },
    });
    const nameList = found.map((coin) => {
      return coin.cryptoName;
    });
    return nameList;
  }
};
export const createTransaction = async (transaction: Transaction) => {
  const { cryptoName, coin, cash } = transaction;
  const uuid = await verifyToken();
  if (uuid) {
    const created = await prisma.transaction.create({
      data: {
        cash: parseFloat(cash),
        cryptoName,
        amount: parseFloat(coin),
        userId: uuid,
      },
    });
    if (created) return true;
  }
  return false;
};
