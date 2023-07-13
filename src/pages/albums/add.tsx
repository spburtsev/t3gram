import { useRef, useState } from "react";
import { useArray } from "~/hooks/inputs";
import StackedLayout from "~/components/StackedLayout";
import { api } from "~/utils/api";
import FolderIcon from "@heroicons/react/24/outline/FolderIcon";
import FolderPlusIcon from "@heroicons/react/24/outline/FolderPlusIcon";
import Link from "next/link";
import { useDebounce } from "~/hooks/extras";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import FileSearchWithSelections from "~/components/images/ImageSearchWithSelection";
import type { RouterOutputs } from "~/utils/api";
import { protectedSsr } from "~/utils/protected-ssr";

type ImageFile = RouterOutputs["imagesRouter"]["searchImages"][number];

export default function AddFilePage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const chosenImages = useArray<ImageFile>();
  const [imageSearch, setImageSearch] = useState("");
  const debouncedImageSearch = useDebounce(imageSearch, 200);
  const m = api.albumsRouter.addAlbum.useMutation({
    onSuccess: () => {
      if (titleRef.current !== null) {
        titleRef.current.value = "";
      }
      chosenImages.clear();
      alert("Album created!");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = titleRef.current?.value.trim();
    if (title === undefined || title?.length === 0) {
      return;
    }
    m.mutate({
      title,
      files: chosenImages.items.map((file) => file.id),
    });
  };

  return (
    <StackedLayout subNavigation={<SubNavigation />}>
      <form
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-12">
          <div className="border-b pb-12">
            <h2 className="text-base font-semibold leading-7">
              Create a new album
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="album-title"
                  className="block text-sm font-medium leading-6"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="album-title"
                    id="album-title"
                    autoComplete="album-title"
                    required
                    ref={titleRef}
                    className="input-bordered input-primary input w-full"
                    placeholder="My Album"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                {/* Files search */}
                <div className="mt-5">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div
                      className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                      aria-hidden="true"
                    >
                      <MagnifyingGlassIcon
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="search"
                      name="search"
                      id="search"
                      value={imageSearch}
                      onChange={(e) => setImageSearch(e.target.value)}
                      className="input w-full py-1.5 pl-9"
                      placeholder="Search files by title"
                    />
                  </div>
                </div>
                <FileSearchWithSelections
                  search={debouncedImageSearch}
                  chosenFiles={chosenImages}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="btn-primary btn"
              disabled={m.isLoading}
            >
              {m.isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Creating
                </>
              ) : (
                "Create"
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
          <Link href="/albums">
            <FolderIcon className="mr-2 h-5 w-5 stroke-current" />
            Albums
          </Link>
        </li>
        <li>
          <FolderPlusIcon className="mr-2 h-5 w-5 stroke-current" />
          New album
        </li>
      </ul>
    </nav>
  );
}

export const getServerSideProps = protectedSsr();
