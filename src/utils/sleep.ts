export const sleep = async (ms = 0) =>
  await new Promise((resolve) => setTimeout(resolve, ms));
