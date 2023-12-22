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
  disabled?: boolean;
};
const Button = ({ onClick, title, submit, className, async, disabled }: ButtonProps) => {
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
      onClick={
        onClick
          ? (e) => {
              if (!submit) e.preventDefault();
              if (!loading) handleAsync();
            }
          : () => {}
      }
      disabled={disabled}
      className={className ? className : `${styles.button} ${disabled ? styles.disabled : ""}`}
    >
      {loading ? <Spinner /> : title}
    </button>
  );
};

export default Button;
