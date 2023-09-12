import { forwardRef, useId } from "react";
import type { LabelHTMLAttributes, SelectHTMLAttributes } from "react";
import { Label } from "../label";
import { Select } from "../select";

export interface SelectWithLabelProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  labelText: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

const SelectWithLabel = forwardRef<HTMLSelectElement, SelectWithLabelProps>(
  ({ className, labelText, labelProps, ...props }, ref) => {
    const id = useId();

    return (
      <div className={className}>
        <Label {...labelProps} htmlFor={props.id ?? id}>
          {labelText}
        </Label>
        <Select {...props} id={props.id ?? id} ref={ref} />
      </div>
    );
  },
);

SelectWithLabel.displayName = "SelectWithLabel";

export default SelectWithLabel;
