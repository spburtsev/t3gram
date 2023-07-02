/* eslint-disable @next/next/no-img-element */
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { useState } from "react";
import CenteredLoadingSpinner from "~/components/CenteredLoadingSpinner";
import ErrorAlert from "~/components/ErrorAlert";
import StackedLayout from "~/components/StackedLayout";
import ModeButton from "~/features/image-editor/ModeButton";
import { EditorMode, editorModeButtons } from "~/features/image-editor/modes";
import { api } from "~/utils/api";

export default function ImageEditPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");
  const {
    data: image,
    error,
    isError,
    isLoading,
  } = api.imagesRouter.getImageById.useQuery(
    {
      id: props.imageId,
    },
    {
      onSuccess: (data) => {
        setCroppedImageUrl(data.fileUrl);
      },
    }
  );
  const [mode, setMode] = useState(EditorMode.View);

  if (isLoading) {
    return (
      <StackedLayout>
        <CenteredLoadingSpinner />
      </StackedLayout>
    );
  }

  if (isError) {
    return (
      <StackedLayout>
        <ErrorAlert message={error.message} />
      </StackedLayout>
    );
  }

  const handleModeButtonClick = (clickedMode: EditorMode) => {
    if (mode === clickedMode) {
      setMode(EditorMode.View);
      return;
    }
    setMode(clickedMode);
  };

  return (
    <StackedLayout>
      <img
        src={image.fileUrl}
        alt={image.title}
        className="mx-auto max-h-[80vh] w-fit object-cover"
      />
      <div className="mt-8 flex items-center justify-center gap-4">
        {editorModeButtons.map((button) => (
          <ModeButton
            key={button.mode}
            mode={button.mode}
            tooltip={button.tooltip}
            icon={button.icon}
            isActive={mode === button.mode}
            onClick={handleModeButtonClick}
          />
        ))}
      </div>
    </StackedLayout>
  );
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const imageId = ctx.query.imageId;

  if (typeof imageId !== "string") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      imageId,
    },
  };
}
