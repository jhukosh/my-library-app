import { ActionFunction, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { createUserBook } from "~/server/userBook/userBook.server";
import { getUserId } from "~/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.bookId, "Book id is required");
  const userId = await getUserId(request);
  if (userId != null) return createUserBook(params.bookId, userId);
  else console.error("User Id not provided");
  return redirect(`/book/${params.bookId}`);
};
