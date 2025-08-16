import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  createQuestion: publicProcedure
    .input(z.object({ text: z.string(), authorName: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const question = await ctx.db.question.create({
        data: { text: input.text, authorName: input.authorName },
      });
      return question;
    }),

  getQuestions: publicProcedure
    .input(z.object({take: z.number(), cursorId: z.string().optional()}).optional())
    .query(async ({input, ctx})=>{
        const take = input?.take ?? 20;
        const cursorId = input?.cursorId;


        const questions = await ctx.db.question.findMany({
            take: take + 1,
            ...(cursorId ? { cursor: { id: cursorId }, skip: 1 } : {}),
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                text: true,
                authorName: true,
                createdAt: true,
                _count: { select: { answers: true} }
            },
        })
        const hasMore = questions.length > take;
        if(hasMore) questions.pop();

        return {
            items: questions,
            hasMore
        }
    })
});
