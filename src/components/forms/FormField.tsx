import { IconType } from "react-icons";
import styles from "./formfield.module.scss";
import { iconColor } from "@/app/variables";
export type FormFieldProps = {
  type: "text" | "password" | "email" | "number" | "textarea" | "boolean";
  icon?: IconType;
  useState: [string | boolean, React.Dispatch<React.SetStateAction<any>>];
  name: string;
  placeholder?: string;
  rows?: number;
  onChange?: (e: React.ChangeEvent<any>, setState: React.Dispatch<React.SetStateAction<string>>) => void;
  children?: React.ReactNode;
  noMargin?: boolean;
  required?: boolean;
  className?: string;
  readOnly?: boolean;
};

const FormField = (props: FormFieldProps) => {
  const [state, setState] = props.useState;
  const { type, icon, placeholder, rows, onChange, children, name, required, noMargin, className, readOnly } = props;

  const Icon = icon; //Решает нерабочее поведение input number в браузерах Firefox

  return (
    <label
      className={!className ? styles.label : className}
      style={
        !className && type === "boolean"
          ? {
              width: "50px",
              height: "25px",
              borderRadius: "9999px",
              padding: "0 2px",
              display: "flex",
              marginLeft: "5px",
              backgroundColor: state === true ? "rgb(34, 197, 94)" : "rgb(226 232 240)",
              transition: "background-color 0.3s",
              cursor: "pointer",
            }
          : noMargin
          ? { marginRight: "0", marginLeft: "0" }
          : {}
      }
    >
      {Icon && <Icon color={iconColor} size={16} />}

      {type === "textarea" ? (
        <textarea
          className={className ? className : styles.textarea}
          value={state as string}
          name={name}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => {
            e.preventDefault();
            onChange ? onChange(e, setState) : setState(e.currentTarget.value);
          }}
          required={required}
          readOnly={readOnly}
        />
      ) : type === "boolean" ? (
        <>
          <input
            type="checkbox"
            name={name}
            defaultChecked={state as boolean}
            className={styles.hidden}
            onClick={(e) => {
              setState(e);
            }}
          />
          <div className={styles.checkbox} style={state ? { marginLeft: "50%" } : {}}></div>
        </>
      ) : type === "number" ? (
        <input
          className={className ? className : styles.textfield}
          value={state as string}
          name={name}
          placeholder={placeholder}
          type={"text"}
          readOnly={readOnly}
          onChange={(e) => {
            if (/^$|^[0-9]*\.?[0-9]*?$/.test(e.currentTarget.value)) {
              onChange ? onChange(e, setState) : setState(e.currentTarget.value);
            }
          }}
          required={required}
        />
      ) : (
        <input
          className={className ? className : styles.textfield}
          value={state as string}
          name={name}
          placeholder={placeholder}
          type={type}
          readOnly={readOnly}
          onChange={(e) => {
            e.preventDefault();
            onChange ? onChange(e, setState) : setState(e.currentTarget.value);
          }}
        ></input>
      )}
      {children}
    </label>
  );
};

export default FormField;
