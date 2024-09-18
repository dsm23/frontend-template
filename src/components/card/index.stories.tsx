import type { Meta, StoryObj } from "@storybook/react";
import { BellRing, Check } from "lucide-react";
import Card from "./Card";
import CardContent from "./CardContent";
import CardDescription from "./CardDescription";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import CardTitle from "./CardTitle";
import { Button } from "~/components/button";
import { Switch } from "~/components/switch";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

const meta = {
  title: "Page Layout/Card",
  component: Card,
  subcomponents: {
    Button,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Switch,
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <Card className="w-[380px]" {...args}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            {/* eslint-disable-next-line tailwindcss/no-custom-classname, tailwindcss/classnames-order */}
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex size-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                {/* eslint-disable-next-line tailwindcss/no-custom-classname, tailwindcss/classnames-order */}
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 size-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  ),
};

export default meta;
