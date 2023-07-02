import { imagesRouter } from "./routers/images";
import { albumsRouter } from "~/server/api/routers/albums";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    imagesRouter,
    albumsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
