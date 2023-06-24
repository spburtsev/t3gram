import { useUploadThing } from "~/hooks/uploadthing";
import Image from "next/image";
import { useRef, useState } from "react";
import FileInput from "~/components/FileInput";
import StackedLayout from "~/components/StackedLayout";
import { api } from "~/utils/api";
import Link from "next/link";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import DocumentPlusIcon from "@heroicons/react/24/outline/DocumentPlusIcon";

export default function AddFilePage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const m = api.filesRouter.addImage.useMutation({
    mutationKey: ["add-image"],
    onSuccess: () => {
      if (titleRef.current !== null) {
        titleRef.current.value = "";
      }
      if (descriptionRef.current !== null) {
        descriptionRef.current.value = "";
      }
      handleFileRemove();
      alert("image added successfully");
    },
    onError: () => {
      alert("error occurred while uploading");
    },
  });

  const handleFileLoad = (file: File) => {
    setFile(file);
    if (fileUrl !== null) {
      URL.revokeObjectURL(fileUrl);
    }
    setFileUrl(URL.createObjectURL(file));
  };

  const handleFileRemove = () => {
    setFile(null);
    if (fileUrl !== null) {
      URL.revokeObjectURL(fileUrl);
    }
    setFileUrl(null);
  };

  const { startUpload, isUploading } = useUploadThing({
    endpoint: "imageUploader",
    onClientUploadComplete: (uploadedFiles) => {
      if (uploadedFiles === undefined) {
        return;
      }
      const firstReturnedFile = uploadedFiles[0];
      if (firstReturnedFile === undefined) {
        return;
      }
      const { fileUrl, fileKey } = firstReturnedFile;
      const title = titleRef.current?.value.trim();
      const description = descriptionRef.current?.value.trim();
      if (title === undefined || description === undefined) {
        return;
      }
      m.mutate({
        title,
        description,
        fileUrl,
        fileKey,
      });
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file === null) {
      return;
    }
    void startUpload([file]);
  };

  return (
    <StackedLayout subNavigation={<SubNavigation />}>
      <form
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-12">
          <div className="border-b pb-12">
            <h2 className="text-base font-semibold leading-7">Add file</h2>
            <p className="mt-1 text-sm leading-6">
              Upload your image file with a title and description.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="photo-title"
                  className="block text-sm font-medium leading-6"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="photo-title"
                    id="photo-title"
                    autoComplete="photo-title"
                    required
                    ref={titleRef}
                    className="input-bordered input-primary input w-full"
                    placeholder="My Photo"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo-input"
                  className="block text-sm font-medium leading-6"
                >
                  Photo
                </label>
                {file === null || fileUrl === null ? (
                  <FileInput onLoad={handleFileLoad} />
                ) : (
                  <div className="relative">
                    <button
                      className="btn-ghost btn-sm absolute right-0 top-0"
                      onClick={handleFileRemove}
                    >
                      Remove
                    </button>
                    <Image
                      src={fileUrl}
                      alt="Your file"
                      width={1920}
                      height={1024}
                      className="max-w-full rounded-md object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    ref={descriptionRef}
                    className="textarea-primary textarea w-full"
                    placeholder="Brief description for your photo."
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6">
                  (Optional) Write a description.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="btn-primary btn"
              disabled={m.isLoading || isUploading}
            >
              {m.isLoading || isUploading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Uploading
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </form>
    </StackedLayout>
  );
}

function SubNavigation() {
  return (
    <nav className="breadcrumbs px-8 py-4 text-sm">
      <ul>
        <li>
          <Link href="/files">
            <DocumentDuplicateIcon className="mr-2 h-5 w-5 stroke-current" />
            Files
          </Link>
        </li>
        <li>
          <DocumentPlusIcon className="mr-2 h-5 w-5 stroke-current" />
          Add File
        </li>
      </ul>
    </nav>
  );
}
