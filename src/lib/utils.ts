export const c = (...args: (string | null | undefined)[]) => {
  return args.filter(Boolean).join(" ");
};
