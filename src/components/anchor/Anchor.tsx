import { forwardRef } from "react";
import type { ComponentProps, ElementType, ReactElement, Ref } from "react";
import { Typography } from "~/components/typography";
import { cn } from "~/utils";

export type PlymorphicProps<E extends ElementType = ElementType> = {
  as?: E;
  className?: string;
  variant?: "title";
};

export type Props<E extends ElementType> = PlymorphicProps<E> &
  Omit<ComponentProps<E>, keyof PlymorphicProps>;

const defaultElement = "a";

const Anchor = forwardRef(
  (
    { as = defaultElement, className, variant, ...props }: PlymorphicProps,
    ref: Ref<Element>,
  ) => (
    <Typography
      {...props}
      as={as}
      variant={variant ?? "body2"}
      className={cn(
        "px-0 text-blue-700 underline underline-offset-4 hover:text-blue-500",
        className,
      )}
      ref={ref}
    />
  ),
) as { displayName: string } & (<E extends ElementType = typeof defaultElement>(
  props: Props<E>,
) => ReactElement);

Anchor.displayName = "Anchor";

export default Anchor;
