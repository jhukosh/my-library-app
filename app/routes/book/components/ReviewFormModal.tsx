import { Form } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/Button";
import { Review } from "~/domain/review/review";

type ReviewFormModalProps = {
  bookId: string;
  review?: Review;
  userBookId: string;
  show: boolean;
  setShow: (show: boolean) => void;
};

export const ReviewFormModal = ({
  bookId,
  review,
  userBookId,
  show,
  setShow,
}: ReviewFormModalProps) => {
  const [title, setTitle] = useState<string>(review?.title ?? "");
  const [description, setDescription] = useState<string>(
    review?.description ?? ""
  );

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex w-full overflow-x-hidden overflow-y-hidden h-full max-h-full bg-slate-500/75">
      <section className="relative w-full sm:w-2/4 sm:max-w-2/4 h-screen sm:max-h-full sm:top-32 sm:left-1/4">
        <div className="relative bg-white rounded-lg shadow p-6 w-full h-full flex flex-col gap-4 text-slate-600">
          <button
            className="self-end bg-slate-400 text-2xl rounded-full text-white w-8 h-8 hover:bg-slate-200"
            type="button"
            onClick={() => setShow(false)}
          >
            X
          </button>

          <h3 className="self-start text-slate-500 text-xl">
            What did you think of this book ?
          </h3>
          <Form
            method="post"
            className="flex flex-col gap-4"
            action={`/api/review/book/${bookId}/userBook/${userBookId}/mutation`}
          >
            <label className="flex flex-col gap-1">
              Your title
              <input
                name="title"
                id=""
                type="text"
                className="border rounded p-2 text-slate-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1 ">
              Your review
              <textarea
                name="description"
                id=""
                cols={20}
                rows={10}
                className="border rounded p-2 text-slate-400"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <div className="w-1/3 self-center">
              <Button type="submit" text="Save review" theme="dark" />
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
};
