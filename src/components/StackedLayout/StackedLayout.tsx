import dynamic from "next/dynamic";
import { type ReactNode, useState, useMemo, useCallback } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { navigationLinks } from "./navigation-links";

const SearchBox = dynamic(() => import("./SearchBox"));
const MobileSidebar = dynamic(() => import("./MobileSidebar"));
const DesktopSidebar = dynamic(() => import("./DesktopSidebar"));
const ProfileDropdown = dynamic(() => import("./ProfileDropdown"));

export default function StackedLayout(props: {
  children: ReactNode;
  subNavigation?: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const isCurrentPage = useCallback(
    (href: string) => {
      return router.pathname.startsWith(href);
    },
    [router.pathname]
  );

  const navigation = useMemo(() => {
    return navigationLinks.map((link) => ({
      ...link,
      current: isCurrentPage(link.href),
    }));
  }, [isCurrentPage]);

  return (
    <>
      <div>
        <MobileSidebar navigation={navigation} show={sidebarOpen} />
        <DesktopSidebar navigation={navigation} />
        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-base-300 bg-base-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-base-content lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div
              className="divider divider-horizontal lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <SearchBox />
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <div
                  className="divider divider-horizontal hidden lg:flex"
                  aria-hidden="true"
                />
                <ProfileDropdown />
              </div>
            </div>
          </div>
          {props.subNavigation ? props.subNavigation : null}
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{props.children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
