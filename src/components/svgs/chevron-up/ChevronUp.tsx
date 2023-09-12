import type { FunctionComponent, SVGAttributes } from "react";
import cx from "clsx";

type Props = SVGAttributes<SVGSVGElement>;

const ChevronUp: FunctionComponent<Props> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    className={cx("h-6 w-6", className)}
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
    />
  </svg>
);

export default ChevronUp;
