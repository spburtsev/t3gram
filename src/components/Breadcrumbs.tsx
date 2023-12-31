import Link from "next/link";
import { type HeroIcon } from "~/utils/client";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: HeroIcon;
};

const iconClassName = "mr-2 h-5 w-5 stroke-current";

export default function Breadcrumbs(props: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs px-8 py-4 text-sm">
      <ul>
        {props.items.map((item, itemIdx) => (
          <BreadcrumbItem key={itemIdx} item={item} />
        ))}
      </ul>
    </nav>
  );
}

function BreadcrumbItem(props: { item: BreadcrumbItem }) {
  return (
    <li>
      {props.item.href ? (
        <Link href={props.item.href}>
          <BreadcrumbViewedItem item={props.item} />
        </Link>
      ) : (
        <BreadcrumbViewedItem item={props.item} />
      )}
    </li>
  );
}

function BreadcrumbViewedItem(props: { item: BreadcrumbItem }) {
  if (!props.item.icon) {
    return <>{props.item.label}</>;
  }
  return (
    <>
      <props.item.icon className={iconClassName} />
      {props.item.label}
    </>
  );
}
