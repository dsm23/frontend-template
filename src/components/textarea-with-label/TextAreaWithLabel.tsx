import { forwardRef, useId } from "react";
import type { LabelHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Label } from "../label";
import TextArea from "../textarea/Textarea";

export interface TextAreaWithLabelProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

const TextAreaWithLabel = forwardRef<
  HTMLTextAreaElement,
  TextAreaWithLabelProps
>(({ className, labelText, labelProps, ...props }, ref) => {
  const id = useId();

  return (
    <fieldset className={className}>
      <Label {...labelProps} htmlFor={props.id ?? id}>
        {labelText}
      </Label>
      <TextArea {...props} id={props.id ?? id} ref={ref} />
    </fieldset>
  );
});

TextAreaWithLabel.displayName = "TextAreaWithLabel";

export default TextAreaWithLabel;
