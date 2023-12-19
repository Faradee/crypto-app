"use server";
import prisma from "../../db";
import { verifyToken } from "./userActions";
export type Crypto = {
  id: string;
  rank: string;
  symbol: string;
  marketCap: number;
  name: string;
  priceUsd: number;
  changePercent24Hr: number;
};
export type CryptoData = {
  [key: string]: Crypto;
};
type History = {
  priceUsd: string;
  time: number;
  date: string;
};
//По дефолту фетчится первые 20 криптовалют отсортированных по капитализации
export const fetchAssets = async (offset: number | string = 0, limit: number | string = 20) => {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.COINCAP_KEY}`,
  });
  const url = `https://api.coincap.io/v2/assets?limit=${limit}`;
  const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
  const { data } = await res.json();
  const newData: CryptoData = {};
  data.map((crypto: any) => {
    newData[crypto.id] = {
      id: crypto.id,
      rank: crypto.rank,
      marketCap: crypto.marketCapUsd,
      symbol: crypto.symbol,
      name: crypto.name,
      priceUsd: parseFloat(crypto.priceUsd),
      changePercent24Hr: parseFloat(crypto.changePercent24Hr),
    };
  });
  return newData;
};
export const fetchAssetHistory = async (cryptoId: string, interval: string) => {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.COINCAP_KEY}`,
  });
  const url = `https://api.coincap.io/v2/assets/${cryptoId}/history?interval=${interval}`;
  const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
  const { data }: { data: History[] } = await res.json();
  let high = parseFloat(data[0].priceUsd);
  let low = parseFloat(data[0].priceUsd);
  let average = parseFloat(data[0].priceUsd);
  const formattedHistory: { priceUsd: number; date: string }[] = [];
  data.forEach((point, index) => {
    const currentDate = new Date(point.date);
    const formattedDate =
      currentDate.getDate() +
      " " +
      currentDate.toLocaleString("ru", { month: "long" }) +
      " " +
      currentDate.getFullYear();
    if (!(index % 5)) formattedHistory.push({ priceUsd: parseFloat(point.priceUsd), date: formattedDate });
    const price = parseFloat(point.priceUsd);
    average += price;
    if (price > high) high = price;
    else if (price < low) low = price;
  });
  average = average / data.length;
  const change24h = ((parseFloat(data[data.length - 1].priceUsd) / parseFloat(data[0].priceUsd) - 1) * 100).toPrecision(
    3
  );
  return { historyData: formattedHistory, marketData: { low, high, average, change24h } };
};
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
