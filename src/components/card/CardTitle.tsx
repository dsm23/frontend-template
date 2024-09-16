import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "~/utils";

const CardTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

export default CardTitle;
