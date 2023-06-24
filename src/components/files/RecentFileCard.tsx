import Image from "next/image";
import Link from "next/link";
import { type RouterOutputs } from "~/utils/api";

type RecentFile = RouterOutputs["filesRouter"]["getRecentFiles"][number];

export default function RecentFileCard({ file }: { file: RecentFile }) {
  const editUrl = `/files/${file.id}/edit`;
  return (
    <li className="card-compact card overflow-hidden bg-base-100 shadow-xl">
      <figure>
        <Image
          src={file.fileUrl}
          width={1920}
          height={1024}
          className="h-36 w-full object-cover sm:h-48 md:h-56 lg:h-64 lg:w-full"
          alt={file.title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{file.title}</h2>
        <div className="card-actions justify-end">
          <Link href={editUrl} className="btn-ghost btn">
            Edit
          </Link>
        </div>
      </div>
    </li>
  );
}
