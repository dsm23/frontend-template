import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "~/utils";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  ),
);

CardHeader.displayName = "CardHeader";

export default CardHeader;
