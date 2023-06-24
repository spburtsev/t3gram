import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

const f = createUploadthing();

export const uploadThingFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async (req, res) => {
      const session = await getServerSession(req, res, authOptions);
      if (session === null) {
        throw new Error("Unauthorized");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadThingFileRouter;
