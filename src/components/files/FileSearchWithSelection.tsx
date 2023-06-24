import { type UseArrayReturn } from "~/hooks/inputs";
import { api } from "~/utils/api";
import ErrorAlert from "../ErrorAlert";
import SelectableFileCard from "./SelectableFileCard";
import type { RouterOutputs } from "~/utils/api";

type ImageFile = RouterOutputs["filesRouter"]["searchFiles"][number];

export default function FileSearchWithSelections(props: {
  search: string;
  chosenFiles: UseArrayReturn<ImageFile>;
}) {
  const {
    data: files,
    isError,
    isLoading,
    error,
  } = api.filesRouter.searchFiles.useQuery({
    search: props.search,
  });

  if (isLoading) {
    return (
      <div className="mt-6 flex items-center">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  if (isError) {
    return <ErrorAlert message={error.message} />;
  }

  if (files.length === 0) {
    return (
      <p className="text-base-content-secondary mt-6 text-center">
        No files found.
      </p>
    );
  }

  const handleToggleSelected = (file: ImageFile) => {
    const probableIndex = props.chosenFiles.items.findIndex(
      (item) => item.id === file.id
    );
    if (probableIndex !== -1) {
      props.chosenFiles.remove(probableIndex);
    } else {
      props.chosenFiles.add(file);
    }
  };

  return (
    <div className="mt-6">
      <span className="text-base-content-secondary">
        {props.chosenFiles.items.length} selected
      </span>
      <ul
        role="list"
        className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
      >
        {files.map((file) => (
          <SelectableFileCard
            key={file.id}
            file={file}
            selected={
              props.chosenFiles.items.find((item) => item.id === file.id) !==
              undefined
            }
            onToggleSelected={() => handleToggleSelected(file)}
          />
        ))}
      </ul>
    </div>
  );
}
