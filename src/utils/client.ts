export function classNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const colorTransition = "transition-colors duration-200 ease-in-out";

export type HeroIcon = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;
