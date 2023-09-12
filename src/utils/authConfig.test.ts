import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SpyInstance } from "vitest";
import { LogLevel } from "@azure/msal-browser";
import type { ILoggerCallback } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

interface LocalTestContext {
  mockErrorFn: SpyInstance;
  mockInfoFn: SpyInstance;
  mockDebugFn: SpyInstance;
  mockWarnFn: SpyInstance;
}

const loggerCallback = msalConfig.system?.loggerOptions
  ?.loggerCallback as ILoggerCallback;

describe("authConfig", () => {
  beforeEach<LocalTestContext>((context) => {
    context.mockErrorFn = vi.spyOn(console, "error");
    context.mockInfoFn = vi.spyOn(console, "info");
    context.mockDebugFn = vi.spyOn(console, "debug");
    context.mockWarnFn = vi.spyOn(console, "warn");

    context.mockErrorFn.mockImplementation(() => {});
    context.mockInfoFn.mockImplementation(() => {});
    context.mockDebugFn.mockImplementation(() => {});
    context.mockWarnFn.mockImplementation(() => {});
  });

  it<LocalTestContext>("authConfig, error", (context) => {
    loggerCallback(LogLevel.Error, "This is an error message", false);

    expect(context.mockErrorFn).toHaveBeenCalledTimes(1);
    expect(context.mockInfoFn).toHaveBeenCalledTimes(0);
    expect(context.mockDebugFn).toHaveBeenCalledTimes(0);
    expect(context.mockWarnFn).toHaveBeenCalledTimes(0);
  });

  it<LocalTestContext>("authConfig, info", (context) => {
    loggerCallback(LogLevel.Info, "This is an error message", false);

    expect(context.mockErrorFn).toHaveBeenCalledTimes(0);
    expect(context.mockInfoFn).toHaveBeenCalledTimes(1);
    expect(context.mockDebugFn).toHaveBeenCalledTimes(0);
    expect(context.mockWarnFn).toHaveBeenCalledTimes(0);
  });

  it<LocalTestContext>("authConfig, debug", (context) => {
    loggerCallback(LogLevel.Verbose, "This is an error message", false);

    expect(context.mockErrorFn).toHaveBeenCalledTimes(0);
    expect(context.mockInfoFn).toHaveBeenCalledTimes(0);
    expect(context.mockDebugFn).toHaveBeenCalledTimes(1);
    expect(context.mockWarnFn).toHaveBeenCalledTimes(0);
  });

  it<LocalTestContext>("authConfig, warn", (context) => {
    loggerCallback(LogLevel.Warning, "This is an error message", false);

    expect(context.mockErrorFn).toHaveBeenCalledTimes(0);
    expect(context.mockInfoFn).toHaveBeenCalledTimes(0);
    expect(context.mockDebugFn).toHaveBeenCalledTimes(0);
    expect(context.mockWarnFn).toHaveBeenCalledTimes(1);
  });

  it<LocalTestContext>("authConfig, containsPii", (context) => {
    loggerCallback(LogLevel.Error, "This is an error message", true);

    expect(context.mockErrorFn).toHaveBeenCalledTimes(0);
    expect(context.mockInfoFn).toHaveBeenCalledTimes(0);
    expect(context.mockDebugFn).toHaveBeenCalledTimes(0);
    expect(context.mockWarnFn).toHaveBeenCalledTimes(0);
  });
});
