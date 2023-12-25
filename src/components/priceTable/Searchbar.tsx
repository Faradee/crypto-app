"use client";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./searchbar.module.scss";
import FormField from "../forms/FormField";

const Searchbar = () => {
  const [query, setQuery] = useState<string>("");
  return (
    <div className={styles.container}>
      <FormField type="text" name="query" useState={[query, setQuery]}>
        {query && (
          <div className={styles.close} onClick={() => setQuery("")}>
            <IoMdClose size={30} />
          </div>
        )}
      </FormField>
      <button className={styles.button}>Поиск</button>
    </div>
  );
};
export default Searchbar;
