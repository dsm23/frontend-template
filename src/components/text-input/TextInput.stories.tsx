import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";

const meta = {
  title: "Form Elements/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextInput>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
