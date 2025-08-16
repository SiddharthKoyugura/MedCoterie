"use client";
import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import Form from "~/app/_components/Form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";


export default function QuestionPage() {
  const router = useRouter();

  const [text, setText] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");

  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = api.question.getQuestionById.useQuery({ id });

  const saveAnswerMutate = api.answer.saveAnswer.useMutation({
    onSuccess: (answer) => {
      toast.success("Answer Submitted Succesfully!");
      setText("");
      setAuthorName("");

      data?.answers.push(answer);
    },
    onError: () => {
      toast.error("Failed to Submit an answer");
    },
  });

  const handleSubmit = () => {
    saveAnswerMutate.mutate({
      text,
      authorName,
      questionId: id,
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mx-auto mt-8 w-[90%] space-y-6 text-black">
      <div className="flex justify-end">
        <Button className="cursor-pointer" onClick={() => router.push("/")}>Back</Button>
      </div>

      {/* Question */}
      <Card className="border border-black bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-sm font-semibold lg:text-lg">
            {data?.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div className="self-end">
              <p className="mb-2 text-sm font-medium text-blue-600">
                {data?.answers.length} Answers
              </p>
              <Form
                openDialogText="Submit an Answer"
                formName="Answer"
                text={text}
                setText={setText}
                authorName={authorName}
                setAuthorName={setAuthorName}
                handleSubmit={handleSubmit}
              />
            </div>

            <div className="self-end text-right">
              <p className="text-sm text-gray-600">By {data?.authorName}</p>
              <p className="text-xs text-gray-500">
                {data?.createdAt
                  ? new Date(data.createdAt).toLocaleString()
                  : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answer List */}

      <div className="space-y-3">
        {data?.answers.length === 0 ? (
          <p className="text-center text-gray-500 italic">No answers yet</p>
        ) : (
          data?.answers.map((ans) => (
            <Accordion
              key={ans.id}
              className="rounded-2xl border-2 border-solid border-gray-400 p-2"
              type="single"
              collapsible
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="cursor-pointer text-sm font-semibold lg:text-lg">
                  {ans.text.slice(0, 50)}...
                </AccordionTrigger>
                <AccordionContent>{ans.text}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        )}
      </div>
    </div>
  );
}
