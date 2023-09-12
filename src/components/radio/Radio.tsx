import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const Radio = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => (
    <input {...props} type="radio" className={className} ref={ref} />
  ),
);

Radio.displayName = "Radio";

export default Radio;
