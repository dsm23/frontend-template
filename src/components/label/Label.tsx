import { forwardRef } from "react";
import type { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

const Label = forwardRef<HTMLLabelElement, Props>(
  ({ children, className, ...props }, ref) => (
    <label {...props} className={className} ref={ref}>
      {children}
    </label>
  ),
);

Label.displayName = "Label";

export default Label;
