import { forwardRef } from "react";
import type { ComponentProps, ElementType, ReactElement, Ref } from "react";
import cx from "clsx";
import { Typography } from "../typography";

import styles from "./styles.module.css";

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
      variant={variant === "title" ? "h4" : "body2"}
      className={cx(
        styles.anchor,
        {
          [styles.variant]: variant === "title",
        },
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
