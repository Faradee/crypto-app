import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./details.module.scss";
const DetailsSkeleton = () => {
  return (
    <div className={styles.details}>
      <Skeleton containerClassName={styles.column} width={"100%"} count={2} />
      <Skeleton containerClassName={styles.column} width={"100%"} count={2} />
    </div>
  );
};

export default DetailsSkeleton;
