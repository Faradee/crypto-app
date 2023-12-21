"use client";
import { useState } from "react";
import { GoArrowSwitch } from "react-icons/go";
import FormField from "../forms/FormField";
import Image from "next/image";
import styles from "./transaction.module.scss";
import { Crypto } from "@/actions/assetActions";
import { getIconUrl } from "../priceTable/getIconUrl";
type Transaction = {
  cryptoId: string;
  coin: string;
  cash: string;
};
const TransactionWindow = ({ crypto }: { crypto: Crypto }) => {
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const [transaction, setTransaction] = useState<Transaction>({
    cryptoId: crypto.id,
    coin: "",
    cash: "",
  });
  const setTransactionProp: React.Dispatch<React.SetStateAction<any>> = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransaction({ ...transaction, [e.currentTarget.name]: e.currentTarget.value });
  };
  const handleChange = (
    e: React.ChangeEvent | React.MouseEvent,
    setTransactionProp: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setTransactionProp(e);
  };
  return (
    <div className={styles.transaction}>
      <label>Добавить транзакцию</label>
      <div className={styles.formContainer}>
        <label>{isBuy ? "Вы покупаете:" : "Вы продаете:"}</label>
        <div className={styles.formField}>
          <FormField
            type="number"
            name="coin"
            placeholder="0"
            onChange={handleChange}
            useState={[transaction.coin, setTransactionProp]}
          >
            <div className={styles.currency}>
              <Image src={getIconUrl(crypto.symbol)} width={30} height={30} alt={crypto.name} />
              {crypto.symbol}
            </div>
          </FormField>
        </div>
      </div>
      <div className={styles.switch} onClick={() => setIsBuy(!isBuy)}>
        <GoArrowSwitch size={32} color={isBuy ? "lime" : "red"} />
      </div>

      <div className={styles.formContainer}>
        <label>За:</label>
        <div className={styles.formField}>
          <FormField
            type="number"
            name="cash"
            placeholder="0"
            onChange={handleChange}
            useState={[transaction.cash, setTransactionProp]}
          >
            <div className={styles.currency}>$USD</div>
          </FormField>
        </div>
      </div>
    </div>
  );
};
export default TransactionWindow;
