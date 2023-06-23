import { ActionFunction, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteUserBook } from "~/server/userBook/userBook.server";
import { getUserId } from "~/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.bookId, "Book id is required");
  const userId = await getUserId(request);
  if (userId != null) await deleteUserBook(userId, params.bookId);
  else console.error("User Id not provided");
  return redirect(`/book/${params.bookId}`);
};
