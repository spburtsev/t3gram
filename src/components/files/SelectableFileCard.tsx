import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import { classNames } from "~/utils/client";

type File = RouterOutputs["filesRouter"]["searchFiles"][number];

export default function SelectableFileCard({
  file,
  selected,
  onToggleSelected,
}: {
  file: File;
  selected: boolean;
  onToggleSelected: () => void;
}) {
  return (
    <label htmlFor={file.id}>
      <li
        className={classNames(
          "card-compact card overflow-hidden bg-base-100 shadow-xl",
          selected ? "border-2 border-primary" : "border-2 border-transparent"
        )}
      >
        <figure className="relative">
          <Image
            src={file.fileUrl}
            width={1920}
            height={1024}
            className="h-36 w-full cursor-pointer object-cover sm:h-48 md:h-56 lg:h-64 lg:w-full"
            alt={file.title}
          />
          <span className="absolute right-2 top-2">
            <input
              type="checkbox"
              id={file.id}
              className="checkbox-accent checkbox checkbox-lg"
              checked={selected}
              onChange={onToggleSelected}
            />
          </span>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{file.title}</h2>
        </div>
      </li>
    </label>
  );
}
