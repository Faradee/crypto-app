import Loader from "@/components/loader/Loader";
import styles from "./root.module.scss";
const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Loader />
    </div>
  );
};

export default Loading;
