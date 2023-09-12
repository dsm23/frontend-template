import { forwardRef, useId } from "react";
import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";
import cx from "clsx";
import { Label } from "../label";
import { TextInput } from "../text-input";

export interface TextInputWithLabelProps
  extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  labelText: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

const TextInputWithLabel = forwardRef<
  HTMLInputElement,
  TextInputWithLabelProps
>(({ children, className, labelText, labelProps, ...props }, ref) => {
  const id = useId();

  return (
    <fieldset className={cx("grid", className)}>
      <Label {...labelProps} htmlFor={props.id ?? id}>
        {labelText}
      </Label>
      <TextInput {...props} id={props.id ?? id} ref={ref} />
      {children}
    </fieldset>
  );
});

TextInputWithLabel.displayName = "TextInputWithLabel";

export default TextInputWithLabel;
