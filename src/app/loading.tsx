import Loader from "@/components/loader/Loader";
import styles from "./root.module.scss";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Загрузка...",
};
const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Loader />
    </div>
  );
};

export default Loading;
