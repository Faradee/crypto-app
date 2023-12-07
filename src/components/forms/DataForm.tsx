import FormField from "./FormField";
import LabelFormField from "./LabelFormField";
type DataFormProps<T> = {
  state: { [P in keyof T]: string | boolean };
  handleChange: (key: keyof T) => (stateValue: string) => void;
  label?: string[];
  className?: string;
  readOnly?: boolean;
  labelClassName?: string;
};
const DataForm = <T,>({
  state,
  handleChange,
  label,
  className,
  readOnly,
  labelClassName,
}: DataFormProps<T>): JSX.Element => {
  const getFormType = (key: keyof typeof state) => {
    if (typeof state[key] === "boolean") return "boolean";
    if (typeof state[key] === "number") return "number";
    switch (key) {
      case "email":
        return "email";
      case "originalPassword":
      case "password":
      case "confirmPassword":
        return "password";
      case "description":
        return "textarea";
      default:
        return "text";
    }
  };
  const stateKeys = Object.keys(state) as (keyof typeof state)[];
  return (
    <>
      {stateKeys.map((key, index) => {
        if (!label)
          return (
            <FormField
              key={index}
              type={getFormType(key)}
              useState={[state[key], handleChange(key)]}
              name={key.toString()}
              className={className}
              readOnly={readOnly}
            />
          );
        else
          return (
            <LabelFormField
              key={index}
              type={getFormType(key)}
              useState={[state[key], handleChange(key)]}
              name={key.toString()}
              className={className}
              readOnly={readOnly}
              label={index < label.length ? label[index] : ""}
              labelClassName={labelClassName}
            />
          );
      })}
    </>
  );
};

export default DataForm;
