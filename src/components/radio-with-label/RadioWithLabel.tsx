import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import cx from "clsx";
import { Radio } from "../radio";
import { Label } from "../label";

export interface RadioWithLabelProps
  extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

const RadioWithLabel = forwardRef<HTMLInputElement, RadioWithLabelProps>(
  ({ className, labelText, labelProps, ...props }, ref) => {
    const id = useId();

    return (
      <div className={cx("flex space-x-4", className)}>
        <Radio {...props} id={props.id ?? id} ref={ref} />
        <Label {...labelProps} htmlFor={props.id ?? id}>
          {labelText}
        </Label>
      </div>
    );
  },
);

RadioWithLabel.displayName = "RadioWithLabel";

export default RadioWithLabel;
