"use client";
import { useState, FormEvent, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./searchbar.module.scss";
import FormField from "../forms/FormField";
import Button from "../forms/Button";
import { useRouter, useSearchParams } from "next/navigation";
const Searchbar = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.replace(`/?search=${query}`);
  };
  useEffect(() => {
    if (!params.get("search")) setQuery("");
  }, [params]);
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
