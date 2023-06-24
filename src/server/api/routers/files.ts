import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const filesRouter = createTRPCRouter({
  getRecentFiles: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.file.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 3,
    });
  }),
  searchFiles: protectedProcedure
    .input(
      z.object({
        search: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.file.findMany({
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
      return ctx.prisma.file.create({
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
