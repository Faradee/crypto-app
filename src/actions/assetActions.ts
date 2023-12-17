"use server";
import prisma from "../../db";
import { verifyToken } from "./userActions";
//При изображении favorites используется клиентский компонент, ревалидация не нужна
export const getFavorite = async (cryptoId: string) => {
  const uuid = await verifyToken();
  if (uuid) {
    const favorited = await prisma.favorite.findFirst({
      where: {
        cryptoId,
        userId: uuid,
      },
    });
    if (favorited) return true;
  }
  return false;
};
export const getFavorites = async () => {
  const uuid = await verifyToken();
  if (uuid) {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: uuid,
      },
    });
    return favorites;
  }
  return false;
};
export const setFavorite = async (cryptoId: string) => {
  const uuid = await verifyToken();
  if (uuid) {
    const created = await prisma.favorite.create({
      data: {
        cryptoId,
        userId: uuid,
      },
    });
    if (created) return true;
  }
  return false;
};

export const unsetFavorite = async (cryptoId: string) => {
  const uuid = await verifyToken();
  if (uuid) {
    const deleted = await prisma.favorite.delete({
      where: {
        cryptoId_userId: {
          userId: uuid,
          cryptoId,
        },
      },
    });
    if (deleted) return true;
  }
  return false;
};
