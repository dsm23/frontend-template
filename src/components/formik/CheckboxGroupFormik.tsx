import { useId } from "react";
import type { FunctionComponent, ReactNode } from "react";
import { useField } from "formik";
import { CheckboxGroupContext } from "./CheckboxGroupContext";

interface Props {
  name: string;
  children: ReactNode;
}

const CheckboxGroup: FunctionComponent<Props> = ({ name, children }) => {
  const id = useId();
  const meta = useField({ name, type: "checkbox" })[1];

  return (
    <CheckboxGroupContext.Provider value={{ name, id }}>
      <fieldset>
        {children}

        {meta.touched && meta.error != null && (
          <small className="text-error" role="alert" id={id}>
            {meta.error}
          </small>
        )}
      </fieldset>
    </CheckboxGroupContext.Provider>
  );
};

export default CheckboxGroup;
