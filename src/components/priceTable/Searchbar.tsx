"use client";
import { useState } from "react";
import styles from "./searchbar.module.scss";
import FormField from "../forms/FormField";
const Searchbar = () => {
  const [query, setQuery] = useState<string>("");
  console.log(query);
  return (
    <div className={styles.container}>
      <FormField type="text" name="query" useState={[query, setQuery]} />
      <button className={styles.button}>Поиск</button>
    </div>
  );
};
export default Searchbar;
