import { forwardRef, useId } from "react";
import { useField } from "formik";
import { TextAreaWithLabel } from "../textarea-with-label";
import type { TextAreaWithLabelProps } from "../textarea-with-label/TextAreaWithLabel";

interface Props extends Omit<TextAreaWithLabelProps, "name"> {
  name: string;
}

const TextAreaFormik = forwardRef<HTMLTextAreaElement, Props>(
  ({ name, ...props }, ref) => {
    const id = useId();
    const [field, meta] = useField({ name });

    return (
      <>
        <TextAreaWithLabel
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

TextAreaFormik.displayName = "TextAreaFormik";

export default TextAreaFormik;
