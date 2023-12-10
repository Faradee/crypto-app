import DimContainer from "./DimContainer";
import styles from "./containers.module.scss";
const ModalContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <DimContainer>
      <div className={styles.modal}>{children}</div>
    </DimContainer>
  );
};

export default ModalContainer;
