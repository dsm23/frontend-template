import type { Meta, StoryObj } from "@storybook/react";
import CheckboxWithLabel from "./CheckboxWithLabel";

const meta = {
  title: "Form Elements/CheckboxWithLabel",
  component: CheckboxWithLabel,
  tags: ["autodocs"],
  argTypes: {
    labelText: { control: "text" },
  },
} satisfies Meta<typeof CheckboxWithLabel>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    labelText: "This is a label",
  },
};

export default meta;
