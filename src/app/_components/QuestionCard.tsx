"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export type QuestionCardProps = {
  question: {
    id: string;
    text: string;
    authorName: string;
    createdAt: string | Date;
    _count: { answers: number };
  };
};

export function QuestionCard({ question }: QuestionCardProps) {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer rounded-2xl shadow-md transition hover:shadow-lg"
      onClick={() => router.push("/question/" + question.id)}
    >
      <CardHeader>
        <CardTitle className="text-sm font-semibold lg:text-lg">
          {/* {question.text} */}
          {question.text.length <= 200 ? question.text : question.text.slice(0,200)+"..."}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="">
            <p className="mt-2 text-xs text-blue-600">
              {question._count.answers}{" "}
              {question._count.answers === 1 ? "answer" : "answers"}
            </p>
          </div>

          <div className="">
            <p className="text-sm text-gray-600">
              -- <span className="font-medium">{question.authorName}</span>
            </p>
            <p className="text-xs text-gray-400">
              {new Date(question.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
