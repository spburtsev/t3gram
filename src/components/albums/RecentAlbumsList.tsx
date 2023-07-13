import { api } from "~/utils/api";
import ErrorAlert from "../ErrorAlert";
import RecentAlbumItem from "./RecentAlbumItem";
import CenteredLoadingSpinner from "../CenteredLoadingSpinner";

export default function RecentAlbumsList() {
  const {
    data: albums,
    error,
    isError,
    isLoading,
  } = api.albumsRouter.getRecentAlbums.useQuery();

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  if (isError) {
    return <ErrorAlert message={error.message} />;
  }

  if (albums.length === 0) {
    return (
      <p className="text-base-content-secondary mt-2 text-center">
        No albums yet.
      </p>
    );
  }

  return (
    <ul role="list" className="mt-6 space-y-1">
      {albums.map((album, albumIdx) => (
        <RecentAlbumItem key={albumIdx} album={album} />
      ))}
    </ul>
  );
}
