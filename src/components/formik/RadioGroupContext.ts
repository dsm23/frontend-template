import { createContext, useContext } from "react";

type Context = {
  name: string;
  id: string;
};

export const RadioGroupContext = createContext<Context | undefined>(undefined);

export const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);

  if (context === undefined) {
    throw new Error(
      "useRadioGroupContext must be used within a RadioGroupFormik component",
    );
  }

  return context;
};
