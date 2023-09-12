import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "./mocks/server";

vi.mock("zustand");

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
