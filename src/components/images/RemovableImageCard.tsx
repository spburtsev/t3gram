import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";

type ImageFile = RouterOutputs["imagesRouter"]["searchImages"][number];

export default function RemovableImageCard({
  image,
  onRemove,
}: {
  image: ImageFile;
  onRemove: () => void;
}) {
  return (
    <label htmlFor={image.id}>
      <li className="card-compact card overflow-hidden bg-base-100 shadow-xl">
        <figure className="relative">
          <Image
            src={image.fileUrl}
            width={1920}
            height={1024}
            className="h-36 w-full cursor-pointer object-cover sm:h-48 md:h-56 lg:h-64 lg:w-full"
            alt={image.title}
          />
          <button
            type="button"
            className="btn-secondary btn-circle btn absolute right-2 top-2"
            onClick={onRemove}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{image.title}</h2>
        </div>
      </li>
    </label>
  );
}
