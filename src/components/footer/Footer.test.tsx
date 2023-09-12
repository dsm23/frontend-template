import { expect, test } from "vitest";
import { render } from "~/test-utils";
import Footer from "./Footer";

test("Footer renders", () => {
  const { container } = render(<Footer />);

  expect(container.querySelector("footer")).toBeTruthy();
});
