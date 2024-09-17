import type { Meta, StoryObj } from "@storybook/react";
import Anchor from "./Anchor";

const meta = {
  title: "Form Elements/Anchor",
  component: Anchor,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Anchor>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Some Text",
    href: "#",
  },
};

export const Title: Story = {
  args: {
    children: "Some Text",
    href: "#",
  },
};

export default meta;
