import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "~/utils";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-card text-card-foreground rounded-lg border shadow-sm",
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = "Card";

export default Card;
