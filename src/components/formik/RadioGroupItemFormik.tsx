import { forwardRef } from "react";
import { useField } from "formik";
import { RadioWithLabel } from "../radio-with-label";
import type { RadioWithLabelProps } from "../radio-with-label/RadioWithLabel";
import { useRadioGroupContext } from "./RadioGroupContext";

const RadioFormik = forwardRef<HTMLInputElement, RadioWithLabelProps>(
  ({ value, ...props }, ref) => {
    const { name, id } = useRadioGroupContext();

    const [field, meta] = useField({
      name: name ?? props.name,
      value,
      type: "radio",
    });

    return (
      <RadioWithLabel
        {...props}
        {...field}
        aria-describedby={id}
        ref={ref}
        aria-invalid={meta.touched && Boolean(meta.error)}
      />
    );
  },
);

RadioFormik.displayName = "RadioFormik";

export default RadioFormik;
