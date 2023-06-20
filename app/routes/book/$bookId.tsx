import {
  Form,
  useLoaderData,
  useFetcher,
} from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { Button } from "~/components/Button";
import { getBookById } from "~/domain/book/BookPublicApi";
import NoBookFound from "~/assets/no-book-found.jpeg";
import {
  findOneByUserId,
} from "~/server/userBook/userBook.server";
import { getUserId } from "~/session.server";
import { LoaderArgs } from "@remix-run/node";
import { MyBookForm } from "./components/MyBookForm";
import { findOneByUserBookId } from "~/server/review/review.server";
import { Book } from "~/domain/book/Book";
import { UserBook } from "~/domain/userBook/userBook";
import { Review } from "~/domain/review/review";
import { useUserConnexionModalContext } from "~/contexts/UserConnexionModalContext";
import { useEffect } from "react";

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderArgs) => {
  invariant(params.bookId, "Book id is required");
  const book = await getBookById(params.bookId);
  const userId = await getUserId(request);
  const userBook = await findOneByUserId(userId, book.id);
  const review = await findOneByUserBookId(userBook?.id ?? undefined);
  return { book, userBook, review, userId };
};

export default function BookDetailsPage() {
  // TODO fallback in no book fetched
  const { book, userBook, review, userId } = useLoaderData<{
    book: Book;
    userBook: UserBook;
    review: Review;
    userId: string;
  }>();
  const imgPath = book.volumeInfo.imageLinks?.thumbnail ?? NoBookFound;
  const { handleOpenModal, triggerAction, setTriggerAction } =
    useUserConnexionModalContext();
  const fetcher = useFetcher();

  useEffect(() => {
    const createUserBookAction = () => {
      setTriggerAction(false);
      fetcher.submit(null, {
        method: "post",
        action: `/api/userBook/${book.id}/create`,
      });
    };
    if (triggerAction) {
      createUserBookAction();
    }
  }, []);

  return (
    <div className="p-16 flex flex-row">
      <div className="w-1/3 flex justify-center">
        <img
          className="rounded-t-lg w-2/3"
          src={imgPath}
          alt={`Cover of ${book.volumeInfo.title}`}
        />
      </div>
      <div className="w-2/3 flex flex-col items-center justify-between">
        <div className="border-bottom">
          <h3 className="text-2xl font-bold mb-8">{book.volumeInfo.title}</h3>
          <h4 className="text-xl font-semibold mb-8">
            {book.volumeInfo.authors}
          </h4>
          <div>{book.volumeInfo.description}</div>
        </div>
        {userBook == null ? (
          <Form method="post" className="h-14 text-lg">
            <Button
              type="button"
              theme="dark"
              text="Add to my books"
              onClick={() => {
                userId != null
                  ? fetcher.submit(null, {
                      method: "post",
                      action: `/api/userBook/${book.id}/create`,
                    })
                  : handleOpenModal(
                      `/book/${book.id}`,
                      "You need to create an account to add a book to your library. If you already have an account, you can log in.",
                      true
                    );
              }}
            />
          </Form>
        ) : (
          <>
            <MyBookForm
              isRead={userBook.isRead}
              review={review}
              bookId={book.id}
              userBookId={userBook.id}
            />
            <Form
              method="post"
              className="h-14 text-lg"
              action={`/api/userBook/${book.id}/delete`}
            >
              <Button type="submit" theme="dark" text="Delete from my books" />
            </Form>
          </>
        )}
      </div>
    </div>
  );
}
