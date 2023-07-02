import Image from "next/image";
import Link from "next/link";
import { type RouterOutputs } from "~/utils/api";

type RecentImage = RouterOutputs["imagesRouter"]["getRecentImages"][number];

export default function RecentImageCard({ image }: { image: RecentImage }) {
  const editUrl = `/images/${image.id}/edit`;
  return (
    <li className="card-compact card overflow-hidden bg-base-100 shadow-xl">
      <figure>
        <Image
          src={image.fileUrl}
          width={700}
          height={300}
          className="h-36 w-full object-cover sm:h-48 md:h-56 lg:h-64 lg:w-full"
          alt={image.title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{image.title}</h2>
        <div className="card-actions justify-end">
          <Link href={editUrl} className="btn-ghost btn">
            Edit
          </Link>
        </div>
      </div>
    </li>
  );
}
