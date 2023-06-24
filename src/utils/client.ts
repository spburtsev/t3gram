export function classNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const colorTransition = "transition-colors duration-200 ease-in-out";
