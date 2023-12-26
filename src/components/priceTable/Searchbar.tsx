"use client";
import { useState, FormEvent } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./searchbar.module.scss";
import FormField from "../forms/FormField";
import Button from "../forms/Button";
import { CryptoData, searchAsset } from "@/actions/assetActions";

const Searchbar = ({ handleSearch }: { handleSearch: (data: CryptoData) => void }) => {
  const [query, setQuery] = useState<string>("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      const res = await searchAsset(query);
      handleSearch(res);
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
      <div className={styles.container}>
        <FormField type="text" name="query" placeholder="Введите название криптовалюты" useState={[query, setQuery]}>
          {query && (
            <div className={styles.close} onClick={() => setQuery("")}>
              <IoMdClose size={30} />
            </div>
          )}
        </FormField>
        <div>
          <Button submit className={styles.button} title="Поиск" />
        </div>
      </div>
    </form>
  );
};
export default Searchbar;
