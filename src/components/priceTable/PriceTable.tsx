import React from "react";
import styles from "./priceTable.module.scss";
type cryptoData = {
  iconURL: string;
  name: string;
  price: number;
  change: number;
  graph: string;
};
const PriceTable = () => {
  const data: cryptoData[] = [{ iconURL: "icon", name: "bitcoin", price: 44000, change: 0.25, graph: "graph" }];
  return (
    <table className={styles.priceTable}>
      <thead>
        <tr>
          <th>#</th>
          <th></th>
          <th>Имя</th>
          <th>Цена</th>
          <th>Изменение за 24 часа</th>
          <th>График</th>
        </tr>
      </thead>
      <tbody>
        {data.map((crypto, index) => {
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>{crypto.iconURL}</td>
              <td>{crypto.name}</td>
              <td>{crypto.price}</td>
              <td>{crypto.change}</td>
              <td>{crypto.graph}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PriceTable;
