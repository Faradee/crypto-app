import { createContext } from "react";
const LoadingContext = createContext<(callback: Promise<void>) => Promise<void>>(async () => {});

export default LoadingContext;
