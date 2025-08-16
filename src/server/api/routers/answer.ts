import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const answerRouter = createTRPCRouter({
  saveAnswer: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        text: z.string(),
        authorName: z.string(),
        questionId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, text, authorName, questionId } = input;

      if (id) {
        return ctx.db.answer.update({
          where: { id },
          data: { text, authorName, questionId },
        });
      }

      return ctx.db.answer.create({
        data: { text, authorName, questionId },
      });
    }),
});
