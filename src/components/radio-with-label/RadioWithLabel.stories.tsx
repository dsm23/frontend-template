import type { Meta, StoryObj } from "@storybook/react";
import RadioWithLabel from "./RadioWithLabel";

const meta = {
  title: "Form Elements/RadioWithLabel",
  component: RadioWithLabel,
  tags: ["autodocs"],
  argTypes: {
    labelText: { control: "text" },
  },
} satisfies Meta<typeof RadioWithLabel>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    labelText: "This is a label",
  },
};

export default meta;
