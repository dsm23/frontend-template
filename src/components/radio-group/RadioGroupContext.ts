import { createContext, useContext } from "react";
import type { UseControllerReturn } from "react-hook-form";

export const RadioGroupContext = createContext<UseControllerReturn>({
  field: {
    name: "",
    value: "",
    onChange: () => {},
    onBlur: () => {},
    ref: () => null,
  },
  formState: {
    isDirty: false,
    isLoading: false,
    isSubmitSuccessful: false,
    isSubmitted: false,
    isSubmitting: false,
    isValid: false,
    isValidating: false,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    errors: {},
  },
  fieldState: {
    invalid: false,
    isDirty: false,
    isTouched: false,
    error: {
      type: "",
    },
  },
});

export const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);

  if (context === undefined) {
    throw new Error(
      "useRadioGroupContext must be used within a RadioGroup component",
    );
  }

  return context;
};
