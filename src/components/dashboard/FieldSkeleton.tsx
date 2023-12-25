import Skeleton from "react-loading-skeleton";
import Slate from "../containers/Slate";
import styles from "./graphs.module.scss";
import "react-loading-skeleton/dist/skeleton.css";
const FieldSkeleton = () => {
  return (
    <Slate>
      <div className={styles.card}>
        <Skeleton className={styles.skeleton} width={"100%"} />
        <Skeleton className={styles.skeleton} width={"100%"} />
      </div>
    </Slate>
  );
};
export default FieldSkeleton;
