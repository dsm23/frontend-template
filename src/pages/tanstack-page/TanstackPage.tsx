// import { useNavigate } from "react-router-dom";
import { useForm } from "@tanstack/react-form";
// import type { z } from "zod";
import { Button, H1 } from "../../components";
// import { ROUTES } from "../../constants/routes";
// import { useStore } from "../../store";
// import schema from "../../utils/schema";

// type Values = Partial<z.infer<typeof schema>>;

const TanstackPage = () => {
  // const navigate = useNavigate();
  // const { exampleFormState, setExampleFormState } = useStore();

  // const onSubmit = (values: Values) => {
  //   // eslint-disable-next-line no-console
  //   console.log(values, "values");

  //   setExampleFormState(values);

  //   navigate(ROUTES.PROTECTED_PAGE);
  // };

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },

    onSubmit: async (values) => {
      // Do something with form data
      // eslint-disable-next-line no-console
      console.log(values);
    },
  });

  return (
    <div className="container">
      <H1>Tanstack form attempt</H1>
      <form.Provider>
        <form {...form.getFormProps()}>
          <div>
            <form.Field name="firstName" onChange={(value) => value}>
              {(field) => <input {...field.getInputProps()} />}
            </form.Field>
          </div>

          <div>
            <form.Field name="lastName">
              {(field) => <input {...field.getInputProps()} />}
            </form.Field>
          </div>

          <form.Subscribe
            {...{
              // TS bug - inference isn't working with props, so use object
              selector: (state) => [state.canSubmit, state.values] as const,
              children: ([canSubmit, values]) => (
                <>
                  <Button type="submit" disabled={!canSubmit}>
                    Submit
                  </Button>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </>
              ),
            }}
          />
        </form>
      </form.Provider>
    </div>
  );
};

export default TanstackPage;
