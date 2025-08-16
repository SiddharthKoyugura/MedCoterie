"use client";

import { api } from "~/trpc/react";
import { QuestionCard } from "./_components/QuestionCard";
import Form from "./_components/Form";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const { data, isLoading } = api.question.getQuestions.useQuery({ take: 10 });

  const saveQuestionMutate = api.question.saveQuestion.useMutation({
    onSuccess: (question) => {
      toast.success("Question Submitted Succesfully!");
      setText("");
      setAuthorName("");

      data?.items.push({
        id: question.id,
        text: question.text,
        authorName: question.authorName,
        createdAt: question.createdAt,
        _count: {answers: 0},
      });

    },
    onError: () => {
      toast.error("Failed to Submit a Question");
    },
  });

  const [text, setText] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");


  const handleSubmit = () => {
    saveQuestionMutate.mutate({
      text,
      authorName
    });
    return;
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No questions yet.</p>;

  return (
    <div className="mx-auto my-4 grid w-[90%] gap-4">
      <div className="flex justify-end">
        <Form
          openDialogText="Submit a Question"
          formName="Question"
          text={text}
          setText={setText}
          authorName={authorName}
          setAuthorName={setAuthorName}
          handleSubmit={handleSubmit}
        />
      </div>
      {data.items.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
