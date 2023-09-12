import { useId } from "react";
import type { FunctionComponent, ReactNode } from "react";
import { useField } from "formik";
import { RadioGroupContext } from "./RadioGroupContext";

interface Props {
  name: string;
  children: ReactNode;
}

const RadioGroup: FunctionComponent<Props> = ({ name, children }) => {
  const id = useId();
  const meta = useField({ name, type: "radio" })[1];

  return (
    <RadioGroupContext.Provider value={{ name, id }}>
      <fieldset>
        {children}

        {meta.touched && meta.error != null && (
          <small className="text-error" role="alert" id={id}>
            {meta.error}
          </small>
        )}
      </fieldset>
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;
