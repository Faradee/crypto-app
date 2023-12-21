export const getIconUrl = (symbol: string) => {
  //API возвращает IOTA а иконка хранится с идентификатором MIOTA
  if (symbol.toLowerCase() === "iota") symbol = "miota";
  return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
};
