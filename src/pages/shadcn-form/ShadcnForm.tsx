import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "../../constants/routes";
import {
  Anchor,
  Button,
  Checkbox,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  H1,
  TextInput,
  Textarea,
  toast,
} from "../../components";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../components/radio-group/radio-group";

import schema from "../../utils/schema";
import { useStore } from "../../store";
import { sleep } from "~/utils";

type Values = z.infer<typeof schema>;

const ShadcnForm = () => {
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    setExampleFormState,
    setFirstName,
    setLastName,
  } = useStore();

  const form = useForm<Values>({
    defaultValues: {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      employed: false,
      toppings: [],
      sauces: [],
    },
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const { control, formState, handleSubmit, reset, watch } = form;

  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<Values> = async (values) => {
    setExampleFormState(values);
    setFirstName(values.firstName);
    setLastName(values.lastName);

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

  const items = [
    {
      id: "ketchup",
      label: "Ketchup",
    },
    {
      id: "mustard",
      label: "Mustard",
    },
    {
      id: "mayonnaise",
      label: "Mayonnaise",
    },
    {
      id: "guacamole",
      label: "Guacamole",
    },
  ] as const;

  return (
    <div className="container">
      <H1>ShadcnForm</H1>

      <p>
        Go to protected{" "}
        <Anchor to={ROUTES.PROTECTED_PAGE} as={Link}>
          page
        </Anchor>
      </p>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <TextInput {...field} />
                </FormControl>
                <FormDescription>
                  This is just a description for test purposes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <TextInput {...field} />
                </FormControl>
                <FormDescription>
                  This is just a description for test purposes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="employed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Employed</FormLabel>
                  <FormDescription>
                    This is just a description for test purposes.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="favoriteColour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Favourite Colour</FormLabel>
                <FormControl>
                  <select {...field}>
                    <option value="#ff0000">❤️ Red</option>
                    <option value="#00ff00">💚 Green</option>
                    <option value="#0000ff">💙 Blue</option>
                  </select>
                </FormControl>
                <FormDescription>
                  This is just a description for test purposes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="toppings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Toppings</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    multiple
                    onChange={(event) =>
                      event.target.selectedOptions != null
                        ? field.onChange(
                            [...event.target.selectedOptions].map(
                              (opt) => opt.value,
                            ),
                          )
                        : field.onChange([])
                    }
                  >
                    <option value="chicken">🐓 Chicken</option>
                    <option value="ham">🐷 Ham</option>
                    <option value="mushrooms">🍄 Mushrooms</option>
                    <option value="cheese">🧀 Cheese</option>
                    <option value="tuna">🐟 Tuna</option>
                    <option value="pineapple">🍍 Pineapple</option>
                  </select>
                </FormControl>
                <FormDescription>
                  This is just a description for test purposes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="sauces"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Sidebar</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={control}
                    name="sauces"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked != null
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="stooge"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Notify me about...</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="larry" />
                      </FormControl>
                      <FormLabel className="font-normal">Larry</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="moe" />
                      </FormControl>
                      <FormLabel className="font-normal">Moe</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="curly" />
                      </FormControl>
                      <FormLabel className="font-normal">Curly</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  This is just a description for test purposes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <pre>{JSON.stringify(watch(), null, 2)}</pre>

          <pre>{JSON.stringify(errors, null, 2)}</pre>

          <div className="mb-8 flex space-x-4">
            <Button type="button" variant="secondary" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ShadcnForm;
