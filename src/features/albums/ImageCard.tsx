import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";

type FetchedImage = RouterOutputs["albumsRouter"]["getAlbumImages"][0];

export default function ImageCard(props: { image: FetchedImage }) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="flex justify-between p-4">
        <h3 className="card-title text-base">{props.image.title}</h3>
        <button type="button">
          <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <figure>
        <Image
          src={props.image.fileUrl}
          alt={props.image.title}
          className="h-36 w-full object-cover sm:h-48 md:h-56 lg:h-64 lg:w-full"
          width={600}
          height={400}
        />
      </figure>
    </div>
  );
}
