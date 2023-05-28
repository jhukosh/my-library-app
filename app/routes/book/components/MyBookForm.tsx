import { Form, useSubmit } from "@remix-run/react";

type MyBookFormProps = {
  bookId: string;
  isRead: boolean;
  review?: string;
};

export const MyBookForm = ({ isRead, review, bookId }: MyBookFormProps) => {
  const submit = useSubmit();

  const handleChange = (event: any) => {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <div className="flex flex-col w-full">
      <Form method="post" action={`/api/userBook/${bookId}/update`} onChange={handleChange}>
        <label>
          <input type="checkbox" name="isRead" defaultChecked={isRead} /> I have read this book
        </label>
      </Form>
      <Form method="post" className="flex flex-col">
        <label className="flex flex-col">
          My review title
          <input name="" id="" type="text" className="border rounded" />
        </label>
        <label className="flex flex-col">
          My review
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            className="border rounded"
          ></textarea>
        </label>
      </Form>
    </div>
  );
};
