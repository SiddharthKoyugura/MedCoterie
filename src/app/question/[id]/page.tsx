"use client";
import { useParams } from "next/navigation";
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

export default function QuestionPage() {
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
    onError: (err) => {
      toast.error("Failed to Submit an answer");
    },
  });

  const handleSubmit = () => {
    saveAnswerMutate.mutate({
      text,
      authorName,
      questionId: id
    })
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mx-auto mt-8 w-[90%] space-y-6 text-black">
      {/* Question */}
      <Card className="border border-black bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{data?.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div className="self-end">
              <p className="mt-2 text-sm font-medium">
                {data?.answers.length} Answers
              </p>
              <Form
                openDialogText="Submit an Answer"
                formName="Answer"
                setText={setText}
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
                <AccordionTrigger className="cursor-pointer text-xl">
                  {ans.text.slice(0, 50)}...
                </AccordionTrigger>
                <AccordionContent>{ans.text}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        )}
      </div>

      {/* Submit Answer */}
      {/* <Card className="border border-black bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Submit Answer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Your name"
            value={authorName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthorName(e.target.value)
            }
            className="border border-black"
          />
          <Input
            placeholder="Type your answer..."
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            className="border border-black"
          />
          <Button
            onClick={
              () => null
              //   saveAnswer.mutate({ text, authorName, questionId: data?.id })
            }
            disabled={!text || !authorName}
            className="w-full border border-black bg-black text-white transition hover:bg-white hover:text-black"
          >
            Submit
          </Button>
        </CardContent>
      </Card> */}
    </div>
  );
}
