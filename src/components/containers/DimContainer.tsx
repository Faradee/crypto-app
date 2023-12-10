import React from "react";
import styles from "./containers.module.scss";
const DimContainer = ({ children }: { children: JSX.Element }) => {
  return <div className={styles.dim}>{children}</div>;
};

export default DimContainer;
