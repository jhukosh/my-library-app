import { QuillIcon } from "~/assets/icons/Quill";
import { Button } from "~/components/Button";
import { ReviewFormModal } from "./ReviewFormModal";
import { useEffect, useState } from "react";
import { Review } from "~/domain/review/review";

type UserBookReviewProps = {
  review?: Review;
  bookId: string;
  isRead: boolean;
  userBookId: string;
};

export const UserBookReview = ({
  review,
  bookId,
  isRead,
  userBookId,
}: UserBookReviewProps) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  useEffect(() => setShowReviewModal(false), [review]);

  return (
    <>
      <div className="px-16 py-8 border-t">
        {isRead ? (
          <div className="flex w-full justify-center gap-4 items-center">
            <h3 className="text-lg font-bold text-slate-800">
              {review == null ? "No Review yet" : "Your review"}
            </h3>

            <div>
              <Button
                theme="light"
                text={
                  <div className="flex items-center gap-2">
                    <p>{review != null ? "Edit" : "Add"}</p>
                    <QuillIcon className="w-6 h-6" />
                  </div>
                }
                onClick={() => setShowReviewModal(true)}
                className="border"
              />
            </div>
          </div>
        ) : null}

        {review != null ? (
          <div className="flex flex-col gap-4 my-6 px-16">
            <h4 className="text-lg text-slate-500 border-b border-dashed">{review.title}</h4>
            <p className="text-sm text-slate-500">{review.description}</p>
          </div>
        ) : null}
      </div>

      <ReviewFormModal
        bookId={bookId}
        review={review}
        userBookId={userBookId}
        show={showReviewModal}
        setShow={setShowReviewModal}
      />
    </>
  );
};
