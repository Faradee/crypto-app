"use client";
import { useState } from "react";
import styles from "./button.module.scss";
import Spinner from "./Spinner";

type ButtonProps = {
  onClick?: (...args: any[]) => void | Promise<void>;
  title: string;
  submit?: boolean;
  className?: string;
  async?: boolean;
};
const Button = ({ onClick, title, submit, className, async }: ButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleAsync = async () => {
    if (async) setLoading(true);
    if (onClick) await onClick();
    setLoading(false);
  };
  return (
    <button
      type={submit ? "submit" : "button"}
      title={title}
      onClick={(e) => {
        e.preventDefault();
        if (!loading) handleAsync();
      }}
      className={className ? className : styles.button}
    >
      {loading ? <Spinner /> : title}
    </button>
  );
};

export default Button;
