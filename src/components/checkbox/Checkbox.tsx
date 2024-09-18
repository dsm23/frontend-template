import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

import { cn } from "~/utils";

const Checkbox = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, checked, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "peer size-4 shrink-0 rounded-sm border border-slate-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=checked]:text-slate-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900",
      className,
    )}
    {...props}
  >
    <Indicator className={cn("flex items-center justify-center text-current")}>
      {checked === "indeterminate" && <Minus className="size-4" />}
      {checked === true && <Check className="size-4" />}
    </Indicator>
  </Root>
));

Checkbox.displayName = Root.displayName;

export default Checkbox;
