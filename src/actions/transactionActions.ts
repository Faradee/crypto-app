"use server";
import prisma from "../../db";
import { verifyToken } from "./userActions";
export type Transaction = {
  cryptoId: string;
  coin: string;
  cash: string;
};
export const createTransaction = async (transaction: Transaction) => {
  const { cryptoId, coin, cash } = transaction;
  const uuid = await verifyToken();
  if (uuid) {
    const created = await prisma.transaction.create({
      data: {
        cash: parseFloat(cash),
        cryptoId,
        amount: parseFloat(coin),
        userId: uuid,
      },
    });
    if (created) return true;
  }
  return false;
};
