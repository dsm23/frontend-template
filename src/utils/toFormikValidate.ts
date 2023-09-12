// https://github.com/robertLichtnow/zod-formik-adapter/blob/master/index.ts

import type { z } from "zod";

function createValidationResult(error: z.ZodError) {
  const result: Record<string, string> = {};

  for (const x of error.errors) {
    result[x.path.filter(Boolean).join(".")] = x.message;
  }

  return result;
}

/**
 * Wrap your zod schema in this function when providing it to Formik's validate prop
 * @param schema The zod schema
 * @returns An validate function as expected by Formik
 */
export function toFormikValidate<T>(
  schema: z.ZodSchema<T>,
  params?: Partial<z.ParseParams>,
) {
  return async (values: T) => {
    const result = await schema.safeParseAsync(values, params);
    if (!result.success) {
      return createValidationResult(result.error);
    }
  };
}
