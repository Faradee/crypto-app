import styles from "./containers.module.scss";
const Slate = ({ children, className }: { children?: JSX.Element[] | JSX.Element; className?: string }) => {
  return <div className={`${styles.slate} ${className}`}>{children}</div>;
};
export default Slate;
