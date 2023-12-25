import Skeleton from "react-loading-skeleton";
import Slate from "../containers/Slate";
import styles from "./graphs.module.scss";
import "react-loading-skeleton/dist/skeleton.css";
const GraphSkeleton = () => {
  return (
    <Slate>
      <Skeleton className={styles.skeleton} height={30} />
      <Skeleton className={styles.skeleton} height={200} />
    </Slate>
  );
};
export default GraphSkeleton;
