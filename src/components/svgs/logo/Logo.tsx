import type { FunctionComponent, SVGAttributes } from "react";
import { cn } from "~/utils";

type Props = SVGAttributes<SVGSVGElement>;

const Logo: FunctionComponent<Props> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-6 w-6", className)}
    fill="none"
    viewBox="0 0 47 40"
  >
    <path
      fill="#6366f1"
      d="M23.5 6.5c-6 0-9.75 3-11.25 9 2.25-3 4.875-4.125 7.875-3.375 1.712.428 2.935 1.67 4.29 3.044C26.62 17.41 29.172 20 34.75 20c6 0 9.75-3 11.25-9-2.25 3-4.875 4.125-7.875 3.375-1.712-.428-2.935-1.67-4.29-3.044C31.63 9.09 29.078 6.5 23.5 6.5ZM12.25 20c-6 0-9.75 3-11.25 9 2.25-3 4.875-4.125 7.875-3.375 1.712.428 2.935 1.67 4.29 3.044C15.37 30.91 17.922 33.5 23.5 33.5c6 0 9.75-3 11.25-9-2.25 3-4.875 4.125-7.875 3.375-1.712-.428-2.935-1.67-4.29-3.044C20.38 22.59 17.828 20 12.25 20Z"
    />
  </svg>
);

export default Logo;
