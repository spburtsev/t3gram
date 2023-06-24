import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";
import { classNames, colorTransition } from "~/utils/client";

type RecentAlbum = RouterOutputs["albumsRouter"]["getRecentAlbums"][number];

export default function RecentAlbumItem(props: { album: RecentAlbum }) {
  const albumUrl = `/albums/${props.album.id}`;

  return (
    <li>
      <Link
        href={albumUrl}
        className={classNames(
          "group flex gap-x-3 rounded-md bg-base-300 p-4 font-semibold leading-6 hover:bg-base-200 items-center",
          colorTransition
        )}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent text-accent font-medium">
          {props.album.initial}
        </span>
        <span className="truncate">{props.album.title}</span>
      </Link>
    </li>
  );
}
