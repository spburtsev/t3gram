import { api } from "~/utils/api";
import ErrorAlert from "../ErrorAlert";
import RecentFileCard from "./RecentFileCard";

export default function RecentFilesList() {
  const {
    data: files,
    error,
    isError,
    isLoading,
  } = api.filesRouter.getRecentFiles.useQuery();

  if (isLoading) {
    return (
      <div className="mt-2 flex items-center">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  if (isError) {
    return <ErrorAlert message={error.message} />;
  }

  if (files.length === 0) {
    return (
      <p className="text-base-content-secondary mt-2 text-center">
        No files yet.
      </p>
    );
  }

  return (
    <ul
      role="list"
      className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {files.map((file, fileIdx) => (
        <RecentFileCard key={fileIdx} file={file} />
      ))}
    </ul>
  );
}
