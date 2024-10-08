import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { Indicator, Root, Item } from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "~/utils";

const RadioGroup = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  return <Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = Root.displayName;

const RadioGroupItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => {
  return (
    <Item
      ref={ref}
      className={cn(
        "aspect-square size-4 rounded-full border border-slate-900 text-slate-900 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
        className,
      )}
      {...props}
    >
      <Indicator className="flex items-center justify-center">
        <Circle className="size-2.5 fill-current text-current" />
      </Indicator>
    </Item>
  );
});
RadioGroupItem.displayName = Item.displayName;

export { RadioGroup, RadioGroupItem };
