"use client";

import LoadingContext from "./LoadingContext";
import Loader from "./Loader";
import styles from "./loader.module.scss";
export const LoaderWrapper = ({
  children,
  loadingState,
}: {
  children: JSX.Element;
  loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) => {
  const [loading, setLoading] = loadingState;
  const loadResource = async (callback: Promise<void>) => {
    setLoading(true);
    await callback;
    setLoading(false);
  };
  return (
    <LoadingContext.Provider value={loadResource}>
      <div className={`${loading ? styles.active : ""} ${styles.container}`}>
        {loading && <Loader />}
        {children}
      </div>
    </LoadingContext.Provider>
  );
};
