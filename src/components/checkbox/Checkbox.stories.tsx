import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./Checkbox";

const meta = {
  title: "Form Elements/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
