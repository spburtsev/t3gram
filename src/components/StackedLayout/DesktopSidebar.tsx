import Image from "next/image";
import Link from "next/link";
import { classNames, colorTransition } from "~/utils/client";
import { type NavigationLink } from "./navigation-links";

export default function DesktopSidebar(props: {
  navigation: Array<NavigationLink & { current: boolean }>;
}) {
  return (
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
                {props.navigation.map((item) => (
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
  );
}
