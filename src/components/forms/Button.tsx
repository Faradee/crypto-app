import React from "react";
type ButtonProps = {
  onClick: (...args: any[]) => void;
  title: string;
  color?: string;
  submit?: boolean;
  className?: string;
};
const Button = ({ onClick, title, color, submit, className }: ButtonProps) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      title={title}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={
        className
          ? className
          : `h-12 w-full rounded-md font-semibold text-white ${
              color ? color : "bg-red-600 hover:bg-red-700 active:bg-red-800"
            }`
      }
    >
      {title}
    </button>
  );
};

export default Button;
