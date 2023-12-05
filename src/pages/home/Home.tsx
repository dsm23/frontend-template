import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "../../constants/routes";
import {
  Anchor,
  Button,
  CheckboxWithLabel,
  ControlledTextInputWithLabel,
  H1,
  RadioGroup,
  RadioGroupItem,
  SelectWithLabel,
  TextAreaWithLabel,
  toast,
} from "../../components";

import schema from "../../utils/schema";
import { useStore } from "../../store";
import { sleep } from "~/utils";

type Values = z.infer<typeof schema>;

const Home = () => {
  const navigate = useNavigate();
  const { setExampleFormState } = useStore();

  const { control, formState, handleSubmit, register, reset, watch } =
    useForm<Values>({
      defaultValues: {
        firstName: "",
        lastName: "",
        employed: false,
        toppings: [],
        sauces: [],
      },
      mode: "onChange",
      resolver: zodResolver(schema),
    });

  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<Values> = async (values) => {
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
      <H1>Home</H1>

      <p>
        Go to protected{" "}
        <Anchor to={ROUTES.PROTECTED_PAGE} as={Link}>
          page
        </Anchor>
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextInputWithLabel
          labelText="First Name"
          name="firstName"
          control={control}
        />
        <ControlledTextInputWithLabel
          labelText="Last Name"
          name="lastName"
          control={control}
        />

        <CheckboxWithLabel labelText="Employed" {...register("employed")} />

        <SelectWithLabel
          labelText="Favourite Colour"
          {...register("favoriteColour")}
        >
          <option value="#ff0000">❤️ Red</option>
          <option value="#00ff00">💚 Green</option>
          <option value="#0000ff">💙 Blue</option>
        </SelectWithLabel>

        <SelectWithLabel
          labelText="Toppings"
          multiple
          {...register("toppings")}
        >
          <option value="chicken">🐓 Chicken</option>
          <option value="ham">🐷 Ham</option>
          <option value="mushrooms">🍄 Mushrooms</option>
          <option value="cheese">🧀 Cheese</option>
          <option value="tuna">🐟 Tuna</option>
          <option value="pineapple">🍍 Pineapple</option>
        </SelectWithLabel>

        <CheckboxWithLabel
          labelText="Ketchup"
          value="ketchup"
          {...register("sauces")}
        />
        <CheckboxWithLabel
          labelText="Mustard"
          value="mustard"
          {...register("sauces")}
        />
        <CheckboxWithLabel
          labelText="Mayonnaise"
          value="mayonnaise"
          {...register("sauces")}
        />
        <CheckboxWithLabel
          labelText="Guacamole"
          value="guacamole"
          {...register("sauces")}
        />

        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment  */}
        {/* @ts-expect-error */}
        <RadioGroup name="stooge" control={control}>
          <RadioGroupItem labelText="Larry" value="larry" />
          <RadioGroupItem labelText="Moe" value="moe" />
          <RadioGroupItem labelText="Curly" value="curly" />
        </RadioGroup>

        <TextAreaWithLabel labelText="Notes" {...register("notes")} />

        <pre>{JSON.stringify(watch(), null, 2)}</pre>

        {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}

        <div className="mb-8 flex space-x-4">
          <Button type="button" variant="secondary" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Home;
