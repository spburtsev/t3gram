import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import { classNames } from "~/utils/client";

type ImageFile = RouterOutputs["imagesRouter"]["searchImages"][number];

export default function SelectableImageCard({
  image,
  selected,
  onToggleSelected,
}: {
  image: ImageFile;
  selected: boolean;
  onToggleSelected: () => void;
}) {
  return (
    <label htmlFor={image.id}>
      <li
        className={classNames(
          "card-compact card overflow-hidden border-2 bg-base-100 shadow-xl",
          selected ? "border-primary" : "border-transparent"
        )}
      >
        <figure className="relative">
          <Image
            src={image.fileUrl}
            width={1920}
            height={1024}
            className="h-36 w-full cursor-pointer object-cover sm:h-48 md:h-56 lg:h-64 lg:w-full"
            alt={image.title}
          />
          <span className="absolute right-2 top-2">
            <input
              type="checkbox"
              id={image.id}
              className="checkbox-accent checkbox checkbox-lg"
              checked={selected}
              onChange={onToggleSelected}
            />
          </span>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{image.title}</h2>
        </div>
      </li>
    </label>
  );
}
