import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const imagesRouter = createTRPCRouter({
  getRecentImages: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.image.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 3,
    });
  }),
  getImageById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const image = await ctx.prisma.image.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!image) {
        throw new Error("Image not found");
      }
      return image;
    }),
  searchImages: protectedProcedure
    .input(
      z.object({
        search: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.image.findMany({
        where: {
          userId: ctx.session.user.id,
          title: {
            contains: input.search,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    }),
  addImage: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
        description: z.string().max(255),
        fileUrl: z.string().min(1),
        fileKey: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.image.create({
        data: {
          title: input.title,
          description: input.description,
          fileUrl: input.fileUrl,
          fileKey: input.fileKey,
          userId: ctx.session.user.id,
        },
      });
    }),
});
