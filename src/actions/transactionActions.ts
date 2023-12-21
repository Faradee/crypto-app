import prisma from "../../db";
import { verifyToken } from "./userActions";
export const createTransaction = async () => {
  const uuid = await verifyToken();
  if (uuid) {
    const created = await prisma.transaction;
  } else return false;
};
