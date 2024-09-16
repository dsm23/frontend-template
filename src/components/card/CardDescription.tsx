import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "~/utils";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

export default CardDescription;
