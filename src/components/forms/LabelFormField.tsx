import FormField, { FormFieldProps } from "./FormField";
type LabelFormFieldProps = FormFieldProps & {
  label: string;
  labelClassName?: string;
};
const LabelFormField = (props: LabelFormFieldProps) => {
  return (
    <div
      className={`mx-2 flex flex-col lg:flex-row ${
        props.type === "boolean" ? "items-center justify-center" : ""
      }`}
    >
      <span className={props.labelClassName}>{props.label}</span>
      <FormField {...props} noMargin />
    </div>
  );
};

export default LabelFormField;
