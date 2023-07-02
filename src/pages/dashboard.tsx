import StackedLayout from "~/components/StackedLayout";
import PlusSmallIcon from "@heroicons/react/24/outline/PlusSmallIcon";
import Link from "next/link";
import { type ReactNode } from "react";
import RecentImagesList from "~/components/images/RecentImagesList";
import RecentAlbumsList from "~/components/albums/RecentAlbumsList";

export default function DashboardPage() {
  return (
    <StackedLayout>
      <div className="space-y-16 xl:space-y-20">
        <RecentItemsSection
          title={"Recent images"}
          addItemText="New image"
          addItemUrl="/images/add"
        >
          <RecentImagesList />
        </RecentItemsSection>
        <RecentItemsSection
          title={"Recent albums"}
          addItemText="New album"
          addItemUrl="/albums/add"
        >
          <RecentAlbumsList />
        </RecentItemsSection>
      </div>
    </StackedLayout>
  );
}

function RecentItemsSection(props: {
  title: string;
  addItemUrl: string;
  addItemText: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold leading-7">{props.title}</h2>
          <Link href={props.addItemUrl} className="btn">
            <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
            {props.addItemText}
          </Link>
        </div>
        {props.children}
      </div>
    </section>
  );
}
