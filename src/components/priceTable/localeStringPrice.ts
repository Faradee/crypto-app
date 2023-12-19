export default function localeStringPrice(price: number) {
  const floored = Math.floor(price);
  const remainder = price % 1;
  return (
    floored.toString() +
    remainder
      .toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumSignificantDigits: floored === 0 ? 3 : undefined,
        maximumFractionDigits: 2,
      })
      .toString()
      .substring(1)
  );
}
