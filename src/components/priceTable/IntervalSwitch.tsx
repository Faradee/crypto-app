import React from "react";
import styles from "./details.module.scss";
const IntervalSwitch = ({
  range,
  setRange,
}: {
  range: string;
  setRange: React.Dispatch<React.SetStateAction<"day" | "week" | "month" | "half-year" | "year">>;
}) => {
  return (
    <div className={styles.switchContainer}>
      <div className={range === "day" ? styles.active : ""} onClick={() => setRange("day")}>
        1Д
      </div>
      <div className={range === "week" ? styles.active : ""} onClick={() => setRange("week")}>
        7Д
      </div>
      <div className={range === "month" ? styles.active : ""} onClick={() => setRange("month")}>
        1М
      </div>
      <div className={range === "half-year" ? styles.active : ""} onClick={() => setRange("half-year")}>
        6М
      </div>
      <div className={range === "year" ? styles.active : ""} onClick={() => setRange("year")}>
        12М
      </div>
    </div>
  );
};

export default IntervalSwitch;
