import StackedLayout from "~/components/StackedLayout";
import FolderIcon from "@heroicons/react/24/outline/FolderIcon";
import Link from "next/link";

export default function AlbumPage() {
  return (
    <StackedLayout subNavigation={<SubNavigation title={"..."} />}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"></div>
    </StackedLayout>
  );
}

function SubNavigation(props: { title: string }) {
  return (
    <nav className="breadcrumbs px-8 py-4 text-sm">
      <ul>
        <li>
          <Link href="/albums">
            <FolderIcon className="mr-2 h-5 w-5 stroke-current" />
            Albums
          </Link>
        </li>
        <li>{props.title}</li>
      </ul>
    </nav>
  );
}
