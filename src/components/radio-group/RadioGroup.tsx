import type { FunctionComponent, ReactNode } from "react";
import { useController } from "react-hook-form";
import { RadioGroupContext } from "./RadioGroupContext";

type ControllerArgs = Parameters<typeof useController>[0];

interface Props extends ControllerArgs {
  children: ReactNode;
}

const RadioGroup: FunctionComponent<Props> = ({
  control,
  name,
  defaultValue,
  rules,
  children,
}) => {
  const controller = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <RadioGroupContext.Provider value={controller}>
      <fieldset>{children}</fieldset>
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;
