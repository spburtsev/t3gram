import { type UseArrayReturn } from "~/hooks/inputs";
import { api } from "~/utils/api";
import ErrorAlert from "../ErrorAlert";
import SelectableFileCard from "./SelectableImageCard";
import type { RouterOutputs } from "~/utils/api";
import CenteredLoadingSpinner from "../CenteredLoadingSpinner";

type ImageFile = RouterOutputs["imagesRouter"]["searchImages"][number];

export default function ImageSearchWithSelections(props: {
  search: string;
  chosenFiles: UseArrayReturn<ImageFile>;
}) {
  const {
    data: images,
    isError,
    isLoading,
    error,
  } = api.imagesRouter.searchImages.useQuery({
    search: props.search,
  });

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  if (isError) {
    return <ErrorAlert message={error.message} />;
  }

  if (images.length === 0) {
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
        {images.map((image) => (
          <SelectableFileCard
            key={image.id}
            image={image}
            selected={
              props.chosenFiles.items.find((item) => item.id === image.id) !==
              undefined
            }
            onToggleSelected={() => handleToggleSelected(image)}
          />
        ))}
      </ul>
    </div>
  );
}
