import styles from "./button.module.scss";
type ButtonProps = {
  onClick: (...args: any[]) => void;
  title: string;
  submit?: boolean;
  className?: string;
};
const Button = ({ onClick, title, submit, className }: ButtonProps) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      title={title}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={className ? className : styles.button}
    >
      {title}
    </button>
  );
};

export default Button;
