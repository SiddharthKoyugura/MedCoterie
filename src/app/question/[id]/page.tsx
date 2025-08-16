"use client";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function QuestionPage() {
  const [text, setText] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");

  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = api.question.getQuestionById.useQuery({ id });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mx-auto mt-8 max-w-2xl space-y-6 text-black">
      {/* Question */}
      <Card className="border border-black bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{data?.text}</CardTitle>
          <p className="text-sm text-gray-600">By {data?.authorName}</p>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-500">
            {data?.createdAt ? new Date(data.createdAt).toLocaleString() : ""}
          </p>
          <p className="mt-2 text-sm font-medium">
            {data?.answers.length} Answers
          </p>
        </CardContent>
      </Card>

      {/* Answer List */}
      <div className="space-y-3">
        {data?.answers.length === 0 ? (
          <p className="text-center text-gray-500 italic">No answers yet</p>
        ) : (
          data?.answers.map((ans) => (
            <Card
              key={ans.id}
              className="border border-black bg-white shadow-sm"
            >
              <CardContent className="p-3">
                <p className="text-sm">{ans.text}</p>
                <p className="mt-1 text-xs text-gray-500">
                  — {ans.authorName}, {new Date(ans.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Submit Answer */}
      <Card className="border border-black bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Submit Answer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Your name"
            value={authorName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthorName(e.target.value)}
            className="border border-black"
          />
          <Input
            placeholder="Type your answer..."
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            className="border border-black"
          />
          <Button
            onClick={() => null
            //   saveAnswer.mutate({ text, authorName, questionId: data?.id })
            }
            disabled={!text || !authorName}
            className="w-full border border-black bg-black text-white transition hover:bg-white hover:text-black"
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
