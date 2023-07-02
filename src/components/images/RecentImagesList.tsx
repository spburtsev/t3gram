import { api } from "~/utils/api";
import ErrorAlert from "../ErrorAlert";
import RecentImageCard from "./RecentImageCard";
import CenteredLoadingSpinner from "../CenteredLoadingSpinner";

export default function RecentFilesList() {
  const {
    data: images,
    error,
    isError,
    isLoading,
  } = api.imagesRouter.getRecentImages.useQuery();

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  if (isError) {
    return <ErrorAlert message={error.message} />;
  }

  if (images.length === 0) {
    return (
      <p className="text-base-content-secondary mt-2 text-center">
        No images yet.
      </p>
    );
  }

  return (
    <ul
      role="list"
      className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {images.map((image, imageIdx) => (
        <RecentImageCard key={imageIdx} image={image} />
      ))}
    </ul>
  );
}
