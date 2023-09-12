import type { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type schema from "../utils/schema";

type State = {
  exampleFormState: Partial<z.infer<typeof schema>>;
  firstName?: z.infer<typeof schema>["firstName"];
  lastName?: z.infer<typeof schema>["lastName"];
};
type Action = {
  setExampleFormState: (exampleFormState: State["exampleFormState"]) => void;
  setFirstName: (firstName: State["firstName"]) => void;
  setLastName: (lastName: State["lastName"]) => void;
};

const useStore = create<State & Action, [["zustand/persist", State & Action]]>(
  persist(
    (set) => ({
      exampleFormState: {},
      firstName: undefined,
      lastName: undefined,

      setExampleFormState: (exampleFormState) =>
        set((prevState) => ({
          exampleFormState: {
            ...prevState.exampleFormState,
            ...exampleFormState,
          },
        })),
      setFirstName: (firstName) => set(() => ({ firstName })),
      setLastName: (lastName) => set(() => ({ lastName })),
    }),
    {
      name: "westminster-example-form-state",
    },
  ),
);

export { useStore };
