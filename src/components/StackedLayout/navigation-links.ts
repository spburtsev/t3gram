import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import FolderIcon from "@heroicons/react/24/outline/FolderIcon";

export const navigationLinks = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    name: "Images",
    href: "/images",
    icon: DocumentDuplicateIcon,
  },
  { name: "Albums", href: "/albums", icon: FolderIcon },
];

export type NavigationLink = (typeof navigationLinks)[number];
