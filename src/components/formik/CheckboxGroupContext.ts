import { createContext, useContext } from "react";

type Context = {
  name: string;
  id: string;
};

export const CheckboxGroupContext = createContext<Context | undefined>(
  undefined,
);

export const useCheckboxGroupContext = () => {
  const context = useContext(CheckboxGroupContext);

  if (context === undefined) {
    throw new Error(
      "useCheckboxGroupContext must be used within a CheckboxGroupFormik component",
    );
  }

  return context;
};
