import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  saveQuestion: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        text: z.string(),
        authorName: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, text, authorName } = input;

      if (id) {
        return ctx.db.question.update({
          where: { id },
          data: { text, authorName },
        });
      }

      return ctx.db.question.create({
        data: { text, authorName },
      });
    }),

  getQuestions: publicProcedure
    .input(
      z
        .object({}) // { take: z.number(), cursorId: z.string().optional() }
        .optional(),
    )
    .query(async ({ ctx }) => {
      // const take = input?.take ?? 20;
      // const cursorId = input?.cursorId;

      const questions = await ctx.db.question.findMany({
        // take: take + 1,
        // ...(cursorId ? { cursor: { id: cursorId }, skip: 1 } : {}),
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          text: true,
          authorName: true,
          createdAt: true,
          _count: { select: { answers: true } },
        },
      });

      
      return {
        items: questions
      };
    }),

  getQuestionById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;
      const question = await ctx.db.question.findUnique({
        where: {
          id,
        },
        include: {
          answers: true,
        },
      });

      return question;
    }),

  getQuestionsByTitle: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input, ctx }) => {
      const { text } = input;
      return await ctx.db.question.findMany({
        where: {
          text: {
            contains: text,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          text: true,
          authorName: true,
          createdAt: true,
          _count: { select: { answers: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    }),
});
