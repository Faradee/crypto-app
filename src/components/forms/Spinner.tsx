import React from "react";
import { CgSpinner } from "react-icons/cg";
import styles from "./spinner.module.scss";
const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <CgSpinner size={16} />
    </div>
  );
};

export default Spinner;
