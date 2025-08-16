"use client";

import { api } from "~/trpc/react";
import { QuestionCard } from "./_components/QuestionCard";
import Form from "./_components/Form";
import { useEffect, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { Input } from "~/components/ui/input";

type QuestionProp = {
  id: string;
  text: string;
  authorName: string;
  createdAt: Date;
  _count: { answers: number };
};

export default function Home() {
  const { data, isLoading } = api.question.getQuestions.useQuery({ take: 10 });

  const [questions, setQuestions] = useState<QuestionProp[]>();
  const [searchText, setSearchText] = useState<string>("");

  // const {searchData, loading} = api.question.getQuestionsByTitle.useQuery();

  const saveQuestionMutate = api.question.saveQuestion.useMutation({
    onSuccess: (question) => {
      toast.success("Question Submitted Succesfully!");
      setText("");
      setAuthorName("");

      data?.items.unshift({
        id: question.id,
        text: question.text,
        authorName: question.authorName,
        createdAt: question.createdAt,
        _count: { answers: 0 },
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
      authorName,
    });
    return;
  };

  const { data: searchData } = api.question.getQuestionsByTitle.useQuery(
    { text: searchText },
  );

  useEffect(() => {
    if (searchData) {
      setQuestions(searchData);
    }
  }, [searchData]);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (data?.items) {
      setQuestions(data.items);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  // setQuestions(data?.items);

  return (
    <div className="mx-auto my-4 grid w-[90%] gap-4">
      <div className="flex justify-end">
        <div className="flex justify-between gap-4">
          <div className="">
            <Input
              placeholder="Search goes here..."
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleSearch(e.target.value)
              }
            />
          </div>
          <div className="">
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
        </div>
      </div>
      {questions?.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
