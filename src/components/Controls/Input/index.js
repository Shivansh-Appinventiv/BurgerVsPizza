import { TextField } from "@material-ui/core";
import { useField } from "formik";

export default function Input(props) {
  const { name, styleClass, ...rest } = props;
  const [field, meta] = useField(name);
  const { value, ...other } = field;
  const attributes = {
    value: value || "",
    ...rest,
    ...other,
    fullWidth: true,
    variant: "outlined",
    // defaultValue: field.value ? field.value : null,
  };

  if (meta && meta.touched && meta.error) {
    attributes.error = true;
    attributes.helperText = meta.error;
  }
  return (
    <div className={styleClass}>
      <TextField {...attributes} />
    </div>
  );
}
