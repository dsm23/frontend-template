import { forwardRef, useId } from "react";
import { CheckboxWithLabel } from "../checkbox-with-label";
import type { CheckboxWithLabelProps } from "../checkbox-with-label/CheckboxWithLabel";
import { useField } from "formik";

interface Props extends Omit<CheckboxWithLabelProps, "name"> {
  name: string;
}

const CheckboxFormik = forwardRef<HTMLInputElement, Props>(
  ({ name, value, ...props }, ref) => {
    const id = useId();

    const [field, meta] = useField({
      name,
      value,
      type: "checkbox",
    });

    return (
      <>
        <CheckboxWithLabel
          {...props}
          {...field}
          aria-describedby={id}
          ref={ref}
          aria-invalid={meta.touched && Boolean(meta.error)}
        />
        {meta.touched && meta.error != null && (
          <small className="text-error" role="alert" id={id}>
            {meta.error}
          </small>
        )}
      </>
    );
  },
);

CheckboxFormik.displayName = "CheckboxFormik";

export default CheckboxFormik;
