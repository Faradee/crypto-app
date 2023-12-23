import styles from "./containers.module.scss";
const Slate = ({ children }: { children: JSX.Element }) => {
  return <div className={styles.slate}>{children}</div>;
};
export default Slate;
