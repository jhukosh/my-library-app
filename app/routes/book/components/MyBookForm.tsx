import { Form, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { Review } from "~/domain/review/review";

type MyBookFormProps = {
  bookId: string;
  isRead: boolean;
  review?: Review;
  userBookId: string;
};

export const MyBookForm = ({
  isRead,
  review,
  bookId,
  userBookId,
}: MyBookFormProps) => {
  const [title, setTitle] = useState<string>(review?.title ?? "");
  const [description, setDescription] = useState<string>(
    review?.description ?? ""
  );
  const submit = useSubmit();

  const handleToggleIsRead = (event: any) => {
    submit(event.currentTarget, { replace: true });
  };

  return (
    <div className="flex flex-col w-full">
      <Form
        method="post"
        action={`/api/userBook/${bookId}/update`}
        onChange={handleToggleIsRead}
      >
        <label>
          <input type="checkbox" name="isRead" defaultChecked={isRead} /> I have
          read this book
        </label>
      </Form>
      <Form
        method="post"
        className="flex flex-col"
        action={`/api/review/book/${bookId}/userBook/${userBookId}/mutation`}
      >
        <label className="flex flex-col">
          My review title
          <input
            name="title"
            id=""
            type="text"
            className="border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          My review
          <textarea
            name="description"
            id=""
            cols={20}
            rows={10}
            className="border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <input type="submit" value="Save review" />
      </Form>
    </div>
  );
};
