import type { Meta, StoryObj } from "@storybook/react";
import TextInputWithLabel from "./TextInputWithLabel";

const meta = {
  title: "Form Elements/TextInputWithLabel",
  component: TextInputWithLabel,
  tags: ["autodocs"],
  argTypes: {
    labelText: { control: "text" },
  },
} satisfies Meta<typeof TextInputWithLabel>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    labelText: "This is a label",
  },
};

export default meta;
