import { Menu, Transition } from "@headlessui/react";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useCallback, useMemo } from "react";
import { classNames } from "~/utils/client";

export default function ProfileDropDown() {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "User";
  const userAvatar = session?.user?.image ?? "/avatar.png";

  const router = useRouter();

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

  return (
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
                  className={classNames(active ? "focus" : undefined)}
                >
                  {item.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
