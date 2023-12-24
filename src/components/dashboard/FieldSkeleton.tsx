import Skeleton from "react-loading-skeleton";
import Slate from "../containers/Slate";
import styles from "./graphs.module.scss";

const FieldSkeleton = () => {
  return (
    <Slate>
      <Skeleton className={styles.skeleton} width={"100%"} />
      <Skeleton className={styles.skeleton} width={"100%"} />
    </Slate>
  );
};
export default FieldSkeleton;
