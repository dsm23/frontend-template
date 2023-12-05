import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import cx from "clsx";
import { Checkbox } from "../checkbox";
import { Label } from "../label";

export interface CheckboxWithLabelProps
  extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

const CheckboxWithLabel = forwardRef<HTMLInputElement, CheckboxWithLabelProps>(
  ({ className, labelText, labelProps, ...props }, ref) => {
    const id = useId();

    return (
      <fieldset className={cx("flex space-x-4", className)}>
        {/* @ts-expect-error formik issues, fix later */}
        <Checkbox {...props} id={props.id ?? id} ref={ref} />
        <Label {...labelProps} htmlFor={props.id ?? id}>
          {labelText}
        </Label>
      </fieldset>
    );
  },
);

CheckboxWithLabel.displayName = "CheckboxWithLabel";

export default CheckboxWithLabel;
