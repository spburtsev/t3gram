import { api } from "~/utils/api";
import ErrorAlert from "../ErrorAlert";
import RecentAlbumItem from "./RecentAlbumItem";

export default function RecentAlbumsList() {
  const {
    data: albums,
    error,
    isError,
    isLoading,
  } = api.albumsRouter.getRecentAlbums.useQuery();

  if (isLoading) {
    return (
      <div className="mt-2 flex items-center">
        <span className="loading loading-ring loading-lg mx-auto"></span>;
      </div>
    );
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
    <ul role="list" className="-mx-2 mt-2 space-y-1">
      {albums.map((album, albumIdx) => (
        <RecentAlbumItem key={albumIdx} album={album} />
      ))}
    </ul>
  );
}
