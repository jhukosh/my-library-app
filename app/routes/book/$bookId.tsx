import { Form, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { Button } from "~/components/Button";
import { Book } from "~/domain/book/Book";
import { getBookById } from "~/domain/book/BookPublicApi";
import NoBookFound from "~/assets/no-book-found.jpeg";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.bookId, "Book id is required");
  const book = getBookById(params.bookId);
  return book;
};

export default function BookDetailsPage() {
  // TODO fallback in no book fetched
  const book = useLoaderData<Book>();
  const imgPath = book.volumeInfo.imageLinks?.thumbnail ?? NoBookFound;
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
          <h4 className="text-xl font-semibold mb-8">{book.volumeInfo.authors}</h4>
          <div>{book.volumeInfo.description}</div>
        </div>
        <Form method="post">
          <Button type="submit" theme="dark" text="Add to my books (todo)" />
        </Form>
      </div>
    </div>
  );
}
