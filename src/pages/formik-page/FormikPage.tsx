import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import type { z } from "zod";
import { Button, H1, toast } from "../../components";
import {
  CheckboxFormik,
  CheckboxGroupFormik,
  CheckboxGroupItemFormik,
  RadioGroupFormik,
  RadioGroupItemFormik,
  SelectFormik,
  TextAreaFormik,
  TextInputFormik,
} from "../../components/formik";
import { ROUTES } from "../../constants/routes";
import { useStore } from "../../store";
import schema from "../../utils/schema";
import { toFormikValidate } from "../../utils/toFormikValidate";
import { sleep } from "~/utils";

type Values = Partial<z.infer<typeof schema>>;

const FormikPage = () => {
  const navigate = useNavigate();
  const { exampleFormState, setExampleFormState } = useStore();

  const onSubmit = async (values: Values) => {
    setExampleFormState(values);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });

    await sleep(3000);

    navigate(ROUTES.PROTECTED_PAGE);
  };

  return (
    <div className="container">
      <H1>Formik form attempt</H1>

      <Formik
        initialValues={{
          firstName: exampleFormState.firstName,
          lastName: exampleFormState.lastName,
          employed: exampleFormState.employed,
          favoriteColour: exampleFormState.favoriteColour,
          toppings: exampleFormState.toppings,
          sauces: exampleFormState.sauces,
          stooge: exampleFormState.stooge,
          notes: exampleFormState.notes,
        }}
        /* @ts-expect-error formik issues, fix later */
        validate={toFormikValidate(schema)}
        onSubmit={onSubmit}
      >
        {({ errors, values, isSubmitting, resetForm }) => (
          <Form>
            <TextInputFormik labelText="First Name" name="firstName" />
            <TextInputFormik labelText="Last Name" name="lastName" />

            <CheckboxFormik labelText="Employed" name="employed" />

            <SelectFormik labelText="Favourite Colour" name="favoriteColour">
              <option value="#ff0000">❤️ Red</option>
              <option value="#00ff00">💚 Green</option>
              <option value="#0000ff">💙 Blue</option>
            </SelectFormik>

            <SelectFormik labelText="Toppings" name="toppings" multiple>
              <option value="chicken">🐓 Chicken</option>
              <option value="ham">🐷 Ham</option>
              <option value="mushrooms">🍄 Mushrooms</option>
              <option value="cheese">🧀 Cheese</option>
              <option value="tuna">🐟 Tuna</option>
              <option value="pineapple">🍍 Pineapple</option>
            </SelectFormik>

            <CheckboxGroupFormik name="sauces">
              <CheckboxGroupItemFormik labelText="Ketchup" value="ketchup" />
              <CheckboxGroupItemFormik labelText="Mustard" value="mustard" />
              <CheckboxGroupItemFormik
                labelText="Mayonnaise"
                value="mayonnaise"
              />
              <CheckboxGroupItemFormik
                labelText="Guacamole"
                value="guacamole"
              />
            </CheckboxGroupFormik>

            <RadioGroupFormik name="stooge">
              <RadioGroupItemFormik labelText="Larry" value="larry" />
              <RadioGroupItemFormik labelText="Moe" value="moe" />
              <RadioGroupItemFormik labelText="Curly" value="curly" />
            </RadioGroupFormik>

            <TextAreaFormik labelText="Notes" name="notes" />

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>

            <Button as={Link} to="/" variant="outline">
              Go to Home page
            </Button>

            <div className="mb-8 flex space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => resetForm()}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikPage;
