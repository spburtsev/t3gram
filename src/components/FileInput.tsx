import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import { useState, useCallback } from "react";
import { classNames } from "~/utils/client";

export default function FileInput(props: { onLoad: (file: File) => void }) {
  const [dragEntered, setDragEntered] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragEntered(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragEntered(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDragEntered(false);

      const file = event.dataTransfer.files[0];
      if (file === undefined) {
        return;
      }
      props.onLoad(file);
    },
    [props]
  );

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      const files = event.target.files;
      if (files === null) {
        return;
      }
      const file = files[0];
      if (file === undefined) {
        return;
      }
      props.onLoad(file);
    },
    [props]
  );

  return (
    <div
      className={classNames(
        dragEntered ? "border-primary-focus" : "border-primary",
        "mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10"
      )}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div className="text-center">
        <PhotoIcon className="mx-auto h-12 w-12" aria-hidden="true" />
        <div className="mt-4 flex text-sm leading-6 text-base-content">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleFileInputChange}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5">PNG or JPG up to 8MB</p>
      </div>
    </div>
  );
}
