import { forwardRef, useId } from "react";
import { useField } from "formik";
import { SelectWithLabel } from "../select-with-label";
import type { SelectWithLabelProps } from "../select-with-label/SelectWithLabel";

interface Props extends Omit<SelectWithLabelProps, "name"> {
  name: string;
}

const SelectFormik = forwardRef<HTMLSelectElement, Props>(
  ({ name, ...props }, ref) => {
    const id = useId();
    const [field, meta] = useField({ name, multiple: props.multiple });

    return (
      <fieldset>
        <SelectWithLabel
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
      </fieldset>
    );
  },
);

SelectFormik.displayName = "SelectFormik";

export default SelectFormik;
