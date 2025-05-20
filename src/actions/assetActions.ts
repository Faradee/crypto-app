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
export const searchAsset = async (query: string) => {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.COINCAP_KEY}`,
  });
  const url = `https://api.coincap.io/v2/assets?search=${query}`;
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
export const getAssetData = async (cryptoId: string) => {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.COINCAP_KEY}`,
  });
  const url = `https://api.coincap.io/v2/assets/${cryptoId}`;
  const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
  const { data } = await res.json();
  return {
    id: data.id,
    rank: data.rank,
    marketCap: data.marketCapUsd,
    symbol: data.symbol,
    name: data.name,
    priceUsd: parseFloat(data.priceUsd),
    changePercent24Hr: parseFloat(data.changePercent24Hr),
  };
};
//По дефолту фетчится первые 20 криптовалют отсортированных по капитализации
export const fetchAssets = async (offset: number | string = 0, limit: number | string = 20) => {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.COINCAP_KEY}`,
  });
  const url = `https://api.coincap.io/v2/assets?limit=${limit}`;
  const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
  if (res.status !== 404) {
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
  } else {
    return false;
  }
};
export const fetchAssetList = async (list: string[]) => {
  const uuid = await verifyToken();
  if (uuid) {
    const headers = new Headers({
      Authorization: `Bearer ${process.env.COINCAP_KEY}`,
    });
    const url = `https://api.coincap.io/v2/assets?ids=${list.join(",")}`;
    const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
    const { data } = await res.json();
    const newData: CryptoData = {};
    if (data) {
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
    }
  }
  return false;
};
export const fetchAssetHistory = async (
  cryptoId: string,
  range: "day" | "week" | "month" | "half-year" | "year" | "all"
) => {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.COINCAP_KEY}`,
  });
  const end = Date.now();
  let interval: string = "m5";
  let start = new Date();
  switch (range) {
    case "day":
      interval = "m5";
      start.setDate(start.getDate() - 1);
      break;
    case "week":
      interval = "m30";
      start.setDate(start.getDate() - 7);
      break;
    case "month":
      interval = "h2";
      start.setDate(start.getDate() - 30);
      break;
    case "half-year":
      interval = "h12";
      start.setDate(start.getDate() - 183);
      break;
    case "year":
      interval = "d1";
      start.setDate(start.getDate() - 365);
      break;
  }

  const url = `https://api.coincap.io/v2/assets/${cryptoId}/history?interval=${interval}&start=${start.getTime()}&end=${end}`;
  const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
  const { data }: { data: History[] } = await res.json();
  if (data.length) {
    let high = parseFloat(data[0].priceUsd);
    let low = parseFloat(data[0].priceUsd);
    let average = parseFloat(data[0].priceUsd);
    let change = "";
    const formattedHistory: { priceUsd: number; date: Date }[] = [];
    data.forEach((point, index) => {
      const currentDate = new Date(point.date);
      formattedHistory.push({ priceUsd: parseFloat(point.priceUsd), date: currentDate });
      const price = parseFloat(point.priceUsd);
      average += price;
      if (price > high) high = price;
      else if (price < low) low = price;
    });
    average = average / data.length;
    change = ((parseFloat(data[data.length - 1].priceUsd) / parseFloat(data[0].priceUsd) - 1) * 100).toPrecision(4);
    return { historyData: formattedHistory, marketData: { low, high, average, change } };
  }
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
    const found = await prisma.favorite.findFirst({
      where: {
        userId: uuid,
        cryptoId,
      },
    });
    const created =
      !found &&
      (await prisma.favorite.create({
        data: {
          cryptoId,
          userId: uuid,
        },
      }));
    if (created) return true;
  }
  return false;
};

export const unsetFavorite = async (cryptoId: string) => {
  const uuid = await verifyToken();
  if (uuid) {
    const found = await prisma.favorite.findFirst({
      where: {
        userId: uuid,
        cryptoId,
      },
    });
    const deleted =
      found &&
      (await prisma.favorite.delete({
        where: {
          cryptoId_userId: {
            userId: uuid,
            cryptoId,
          },
        },
      }));
    if (deleted) return true;
  }
  return false;
};

export type Rates = Awaited<ReturnType<typeof fetchAssetList>>;
