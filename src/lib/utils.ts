export const getPlaceholderImage = (width: number, height: number) => {
  return `https://placehold.in/${width}x${height}.png/light`;
};

export const generateString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export const c = (...args: (string | null | undefined)[]) => {
  return args.map((s) => `${s}`).join(" ");
};
