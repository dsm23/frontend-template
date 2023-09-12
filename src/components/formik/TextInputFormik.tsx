import { forwardRef, useId } from "react";
import { useField } from "formik";
import { TextInputWithLabel } from "../text-input-with-label";
import type { TextInputWithLabelProps } from "../text-input-with-label/TextInputWithLabel";

interface Props extends Omit<TextInputWithLabelProps, "name"> {
  name: string;
}

const TextInputFormik = forwardRef<HTMLInputElement, Props>(
  ({ name, ...props }, ref) => {
    const id = useId();
    const [field, meta] = useField({ name });

    return (
      <TextInputWithLabel
        {...props}
        {...field}
        aria-describedby={id}
        ref={ref}
        aria-invalid={meta.touched && Boolean(meta.error)}
      >
        {meta.touched && meta.error != null && (
          <small className="text-error" role="alert" id={id}>
            {meta.error}
          </small>
        )}
      </TextInputWithLabel>
    );
  },
);

TextInputFormik.displayName = "TextInputFormik";

export default TextInputFormik;
