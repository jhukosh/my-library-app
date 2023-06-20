import { Form, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Review } from "~/domain/review/review";
import { ReviewFormModal } from "./ReviewFormModal";
import { Button } from "~/components/Button";

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
  const [showReviewModal, setShowReviewModal] = useState(false);
  const submit = useSubmit();

  const handleToggleIsRead = (event: any) => {
    submit(event.currentTarget, { replace: true });
  };

  useEffect(() => setShowReviewModal(false), [review])

  return (
    <div className="flex flex-col w-full">
      <h3 className="self-start text-slate-500 m-6 text-xl">
        This book is saved in your library !
      </h3>
      <Form
        method="post"
        action={`/api/userBook/${bookId}/update`}
        onChange={handleToggleIsRead}
      >
        <label className="self-start text-slate-500 text-lg flex">
          {isRead ? "You've read this book" : "You havn't read this book yet"}
          <input
            className="ml-2 w-6 h-6"
            type="checkbox"
            name="isRead"
            defaultChecked={isRead}
          />
        </label>
      </Form>

      {review != null ? (
        <>
          <h4>{review.title}</h4>
          <p>{review.description}</p>
          <Button
            theme="dark"
            text="Edit"
            onClick={() => setShowReviewModal(true)}
          />
        </>
      ) : (
        <Button
          theme="dark"
          text="Add"
          onClick={() => setShowReviewModal(true)}
        />
      )}

      <ReviewFormModal
        bookId={bookId}
        review={review}
        userBookId={userBookId}
        show={showReviewModal}
        setShow={setShowReviewModal}
      />
    </div>
  );
};
