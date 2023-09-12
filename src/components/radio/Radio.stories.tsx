import type { Meta, StoryObj } from "@storybook/react";
import Radio from "./Radio";

const meta = {
  title: "Form Elements/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Radio>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
