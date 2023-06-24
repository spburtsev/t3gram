import {
  Fragment,
  type ReactNode,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useSession, signOut } from "next-auth/react";
import { classNames, colorTransition } from "~/utils/client";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const navigationLinks = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    name: "Files",
    href: "/files",
    icon: DocumentDuplicateIcon,
  },
  { name: "Albums", href: "/albums", icon: FolderIcon },
];

export default function StackedLayout(props: {
  children: ReactNode;
  subNavigation?: ReactNode;
}) {
  const { data: session } = useSession();
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

  const handleSignOut = useCallback(() => {
    signOut()
      .then(() => {
        void router.replace("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router]);

  const handleGoToProfile = useCallback(() => {
    console.log("TODO: go to profile");
  }, []);

  const userNavigation = useMemo(
    () => [
      { name: "Your profile", handler: handleGoToProfile },
      { name: "Sign out", handler: handleSignOut },
    ],
    [handleGoToProfile, handleSignOut]
  );

  const userName = session?.user?.name ?? "User";
  const userAvatar = session?.user?.image ?? "/avatar.png";

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-base-100" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-primary-content"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <Image
                        height={32}
                        width={256}
                        className="h-8 w-auto"
                        src="/t3gram-white.svg"
                        alt="T3Gram"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-primary-focus"
                                      : "hover:bg-primary-focus",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-primary-content"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0 text-primary-content"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/* <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-primary-content hover:bg-primary-focus"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-primary-content"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li> */}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Image
                height={32}
                width={256}
                className="h-8 w-auto"
                src="/t3gram-white.svg"
                alt="T3Gram"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-primary-focus text-primary-content"
                              : "text-neutral-content hover:bg-primary-focus hover:text-primary-content",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                            colorTransition
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-primary-content"
                                : "text-neutral-content group-hover:text-primary-content",
                              "h-6 w-6 shrink-0",
                              colorTransition
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-primary-content hover:bg-primary-focus"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-primary-content"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

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
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-base-content"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="input-ghost block h-full w-full border-0 bg-base-200 py-0 pl-8 pr-0 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <div
                  className="divider divider-horizontal hidden lg:flex"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <div className="avatar">
                      <div className="h-8 rounded-full">
                        <Image
                          className="bg-neutral"
                          src={userAvatar}
                          alt={userName}
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-base-content"
                        aria-hidden="true"
                      >
                        {userName}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-base-content"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      className="menu rounded-box menu-md absolute right-0 z-10 mt-2.5 w-32 origin-top-right bg-base-200 shadow-sm"
                      as="ul"
                    >
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name} as="li">
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={item.handler}
                              className={classNames(
                                active ? "focus" : undefined
                              )}
                            >
                              {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
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
