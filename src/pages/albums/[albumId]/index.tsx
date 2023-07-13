import { type InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import StackedLayout from "~/components/StackedLayout";
import { getAlbumTitleFromPrisma } from "~/server/api/routers/albums";
import { protectedSsr } from "~/utils/protected-ssr";
import { useMemo } from "react";
import FolderIcon from "@heroicons/react/24/outline/FolderIcon";
import { api } from "~/utils/api";
import CenteredLoadingSpinner from "~/components/CenteredLoadingSpinner";
import ErrorAlert from "~/components/ErrorAlert";
import ImageCard from "~/features/albums/ImageCard";

const Breadcrumbs = dynamic(() => import("~/components/Breadcrumbs"));

export default function AlbumPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const breadcrumbs = useMemo(() => {
    return [
      { label: "Albums", href: "/albums", icon: FolderIcon },
      { label: props.albumTitle },
    ];
  }, [props]);
  const {
    data: images,
    isLoading,
    isError,
    error,
  } = api.albumsRouter.getAlbumImages.useQuery(props.albumId);

  return (
    <StackedLayout subNavigation={<Breadcrumbs items={breadcrumbs} />}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-4 max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-base font-semibold leading-7">
            {props.albumTitle}
          </h2>
        </div>
        {isLoading ? (
          <CenteredLoadingSpinner />
        ) : isError ? (
          <ErrorAlert message={error.message} />
        ) : (
          <ul className="grid grid-cols-3 gap-4">
            {images.map((image) => (
              <li key={image.id}>
                <ImageCard image={image} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </StackedLayout>
  );
}

export const getServerSideProps = protectedSsr<{
  albumTitle: string;
  albumId: string;
}>({
  getProps: async (ctx, session) => {
    const albumId = ctx.query.albumId;
    const userId = session.user.id;

    if (typeof albumId !== "string" || typeof userId !== "string") {
      return {
        notFound: true,
      };
    }

    const albumTitle = await getAlbumTitleFromPrisma(albumId, userId);
    return {
      props: {
        albumTitle,
        albumId,
      },
    };
  },
});
