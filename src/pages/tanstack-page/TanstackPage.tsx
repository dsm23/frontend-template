import { useId } from "react";
// import { useNavigate } from "react-router-dom";
import { useForm } from "@tanstack/react-form";
// import type { z } from "zod";
import { Button, H1 } from "../../components";
// import { ROUTES } from "../../constants/routes";
// import { useStore } from "../../store";
// import schema from "../../utils/schema";

// type Values = Partial<z.infer<typeof schema>>;

const TanstackPage = () => {
  const firstNameId = useId();
  const lastNameId = useId();
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

    onSubmit: (values) => {
      // Do something with form data
      // eslint-disable-next-line no-console
      console.log(values);
    },
  });

  return (
    <div className="container">
      <H1>Tanstack form attempt</H1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <div>
          <form.Field name="firstName">
            {(field) => (
              <>
                <label htmlFor={firstNameId}>First Name</label>
                <input
                  id={firstNameId}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="lastName">
            {(field) => (
              <>
                <label htmlFor={lastNameId}>Last Name</label>
                <input
                  id={lastNameId}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
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
    </div>
  );
};

export default TanstackPage;
