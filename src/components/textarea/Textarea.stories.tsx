import type { Meta, StoryObj } from "@storybook/react";
import TextArea from "./Textarea";

const meta = {
  title: "Form Elements/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextArea>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
