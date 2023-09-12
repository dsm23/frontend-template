import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ children, className, ...props }, ref) => (
    <select {...props} className={className} ref={ref}>
      {children}
    </select>
  ),
);

Select.displayName = "Select";

export default Select;
