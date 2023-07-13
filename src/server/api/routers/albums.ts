import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const albumsRouter = createTRPCRouter({
  getRecentAlbums: protectedProcedure.query(async ({ ctx }) => {
    const albums = await ctx.prisma.album.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 3,
    });
    return albums.map((x) => ({
      ...x,
      initial: x.title[0]?.toUpperCase() ?? "A",
    }));
  }),
  addAlbum: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
        files: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.album.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
          images: {
            connect: input.files.map((image) => ({
              id: image,
            })),
          },
        },
      });
    }),
  getAlbumImages: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const album = await ctx.prisma.album.findUniqueOrThrow({
        where: {
          id: input,
        },
        include: {
          images: true,
        },
      });
      if (album.userId !== ctx.session.user.id) {
        throw new Error("You have no permission to view this album");
      }
      return album.images;
    }),
});

export async function getAlbumTitleFromPrisma(albumId: string, userId: string) {
  const album = await prisma.album.findUniqueOrThrow({
    where: {
      id: albumId,
    },
  });
  if (album.userId !== userId) {
    throw new Error("You have no permission to view this");
  }
  return album.title;
}
