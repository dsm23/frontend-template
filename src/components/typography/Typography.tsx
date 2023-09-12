import { forwardRef } from "react";
import type {
  ComponentProps,
  ElementRef,
  ElementType,
  HTMLAttributes,
  ReactElement,
  Ref,
} from "react";
import cx from "clsx";

import styles from "./styles.module.css";

const elemMap = {
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
  body1: styles.body1,
  body2: styles.body2,
  body3: styles.body3,
} as const;

export type PlymorphicProps<E extends ElementType = ElementType> = {
  as?: E;
  className?: string;
  variant: keyof typeof elemMap;
};

export type Props<E extends ElementType> = PlymorphicProps<E> &
  Omit<ComponentProps<E>, keyof PlymorphicProps>;

const defaultElement = "p";

const Typography = forwardRef(
  (
    {
      as: Component = defaultElement,
      className,
      variant,
      ...props
    }: PlymorphicProps,
    ref: Ref<Element>,
  ) => (
    <Component
      {...props}
      className={cx(elemMap[variant], className)}
      ref={ref}
    />
  ),
) as { displayName: string } & (<E extends ElementType = typeof defaultElement>(
  props: Props<E>,
) => ReactElement);

const H1 = forwardRef<ElementRef<"h1">, HTMLAttributes<ElementRef<"h1">>>(
  (props, ref) => <Typography {...props} as="h1" variant="h1" ref={ref} />,
);
const H2 = forwardRef<ElementRef<"h2">, HTMLAttributes<ElementRef<"h2">>>(
  (props, ref) => <Typography {...props} as="h2" variant="h2" ref={ref} />,
);
const H3 = forwardRef<ElementRef<"h3">, HTMLAttributes<ElementRef<"h3">>>(
  (props, ref) => <Typography {...props} as="h3" variant="h3" ref={ref} />,
);
const H4 = forwardRef<ElementRef<"h4">, HTMLAttributes<ElementRef<"h4">>>(
  (props, ref) => <Typography {...props} as="h4" variant="h4" ref={ref} />,
);
const P = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>((props, ref) => <Typography {...props} as="p" variant="body1" ref={ref} />);

const Body1 = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>((props, ref) => <Typography {...props} as="p" variant="body1" ref={ref} />);

const Body2 = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>((props, ref) => <Typography {...props} as="p" variant="body2" ref={ref} />);

const Body3 = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>((props, ref) => <Typography {...props} as="p" variant="body3" ref={ref} />);

H1.displayName = "H1";
H2.displayName = "H2";
H3.displayName = "H3";
H4.displayName = "H4";
P.displayName = "P";
Body1.displayName = "Body1";
Body2.displayName = "Body2";
Body3.displayName = "Body3";

Typography.displayName = "Typography";

export { H1, H2, H3, H4, P, Body1, Body2, Body3 };

export default Typography;
