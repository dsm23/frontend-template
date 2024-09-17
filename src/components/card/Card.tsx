import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "~/utils";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = "Card";

export default Card;
