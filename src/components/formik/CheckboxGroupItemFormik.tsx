import { forwardRef } from "react";
import { useField } from "formik";
import { CheckboxWithLabel } from "../checkbox-with-label";
import type { CheckboxWithLabelProps } from "../checkbox-with-label/CheckboxWithLabel";
import { useCheckboxGroupContext } from "./CheckboxGroupContext";

const CheckboxFormik = forwardRef<HTMLInputElement, CheckboxWithLabelProps>(
  ({ value, ...props }, ref) => {
    const { name, id } = useCheckboxGroupContext();

    const [field, meta] = useField({
      name: name ?? props.name,
      value,
      type: "checkbox",
    });

    return (
      <CheckboxWithLabel
        {...props}
        {...field}
        aria-describedby={id}
        ref={ref}
        aria-invalid={meta.touched && Boolean(meta.error)}
      />
    );
  },
);

CheckboxFormik.displayName = "CheckboxFormik";

export default CheckboxFormik;
