import { forwardRef } from "react";
import { RadioWithLabel } from "../radio-with-label";
import type { RadioWithLabelProps } from "../radio-with-label/RadioWithLabel";
import { useRadioGroupContext } from "./RadioGroupContext";

const RadioGroupItem = forwardRef<HTMLInputElement, RadioWithLabelProps>(
  ({ value, ...props }, ref) => {
    const { field } = useRadioGroupContext();

    return <RadioWithLabel {...props} {...field} value={value} ref={ref} />;
  },
);

RadioGroupItem.displayName = "RadioGroupItem";

export default RadioGroupItem;
