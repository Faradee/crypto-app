"use client";
import { useContext, useState } from "react";
import { GoArrowSwitch } from "react-icons/go";
import FormField from "../forms/FormField";
import Image from "next/image";
import styles from "./transaction.module.scss";
import { Crypto } from "@/actions/assetActions";
import { getIconUrl } from "../priceTable/getIconUrl";
import { Transaction, createTransaction } from "@/actions/transactionActions";
import Button from "../forms/Button";
import AuthContext from "../navbar/AuthContext";
const TransactionWindow = ({ crypto }: { crypto: Crypto }) => {
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const [cash, setCash] = useState<string>("");
  const [coin, setCoin] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { authorized } = useContext(AuthContext);
  const currentPrice = crypto.priceUsd;
  const handleCashChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setMessage("");
    setState(e.currentTarget.value);
    if (e.currentTarget.value !== "") setCoin((parseFloat(e.currentTarget.value) / currentPrice).toString());
    else setCoin("");
  };
  const resetState = () => {
    setCash("");
    setCoin("");
  };
  const handleSubmit = async () => {
    if (cash && coin) {
      const created = await createTransaction({
        cryptoSymbol: crypto.symbol,
        cryptoName: crypto.name,
        type: isBuy ? "BUY" : "SELL",
        cash,
        coin,
      });
      if (created) {
        setMessage("Транзакция успешно создана");
        resetState();
      } else setMessage("Ошибка при создании транзакции");
    }
  };
  const handleCoinChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setMessage("");
    setState(e.currentTarget.value);
    if (e.currentTarget.value !== "") setCash((parseFloat(e.currentTarget.value) * currentPrice).toString());
    else setCash("");
  };
  return (
    <form className={styles.transactionContainer}>
      <span>{message}</span>
      <div className={styles.transaction}>
        <label>Добавить транзакцию</label>
        <div className={styles.formContainer}>
          <label>{isBuy ? "Вы покупаете:" : "Вы продаете:"}</label>
          <div className={styles.formField}>
            <FormField type="number" name="coin" placeholder="0" onChange={handleCoinChange} useState={[coin, setCoin]}>
              <div className={styles.currency}>
                <Image src={getIconUrl(crypto.symbol)} width={30} height={30} alt={crypto.name} />
                {crypto.symbol}
              </div>
            </FormField>
          </div>
        </div>
        <div className={styles.dividerContainer}>
          <div className={styles.switch} onClick={() => setIsBuy(!isBuy)}>
            <GoArrowSwitch size={32} color="lime" />
          </div>
        </div>
        <div className={styles.formContainer}>
          <label>За:</label>
          <div className={styles.formField}>
            <FormField type="number" name="cash" placeholder="0" onChange={handleCashChange} useState={[cash, setCash]}>
              <div className={styles.currency}>$USD</div>
            </FormField>
          </div>
        </div>
      </div>
      <Button
        title={!authorized ? "Авторизируйтесь, чтобы создать транзакцию" : isBuy ? "Купить" : "Продать"}
        onClick={authorized ? handleSubmit : () => {}}
        disabled={!authorized}
        async
      />
    </form>
  );
};
export default TransactionWindow;
