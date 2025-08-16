"use client";

import { api } from "~/trpc/react";
import { QuestionCard } from "./_components/QuestionCard";

export default function Home() {
  const { data, isLoading } = api.question.getQuestions.useQuery({ take: 10 });

  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No questions yet.</p>;

  return (
    <div className="w-[90%] mx-auto my-4 grid gap-4">
      {
        data.items.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))
      }
    </div>
  );
}
