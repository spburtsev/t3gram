import { createNextPageApiHandler } from "uploadthing/next-legacy";
import { uploadThingFileRouter } from "~/server/uploadthing";

const handler = createNextPageApiHandler({
  router: uploadThingFileRouter,
});

export default handler;
