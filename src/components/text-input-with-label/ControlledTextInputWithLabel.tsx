import { forwardRef, useId } from "react";
import type { Ref } from "react";
import { useController } from "react-hook-form";
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import TextInputWithLabel from "./TextInputWithLabel";
import type { TextInputWithLabelProps } from "./TextInputWithLabel";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<TextInputWithLabelProps, "defaultValue" | "name">,
    UseControllerProps<TFieldValues, TName> {}

const ControlledTextInputWithLabel = forwardRef(
  <TFieldValues extends FieldValues = FieldValues>(
    {
      control,
      name,
      defaultValue,
      rules,
      value,
      ...props
    }: Props<TFieldValues>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const id = useId();

    const {
      field,
      fieldState: { error, invalid },
    } = useController({
      name,
      control,
      rules,
      defaultValue,
    });

    return (
      <TextInputWithLabel
        {...props}
        {...field}
        aria-describedby={id}
        ref={ref}
        aria-invalid={!invalid}
      >
        {invalid && (
          <small role="alert" id={id}>
            {error?.message}
          </small>
        )}
      </TextInputWithLabel>
    );
  },
) as {
  displayName: string;
} & (<T extends FieldValues = FieldValues>(
  props: Props<T>,
  ref: Ref<HTMLInputElement>,
) => JSX.Element);

ControlledTextInputWithLabel.displayName = "ControlledTextInputWithLabel";

export default ControlledTextInputWithLabel;
