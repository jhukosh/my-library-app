import { ActionFunction, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { toggleIsRead } from "~/server/userBook/userBook.server";
import { getUserId } from "~/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.bookId, "Book id is required");
  const userId = await getUserId(request);
  const formData = await request.formData();
  const isRead = formData.get("isRead") === "on" ? true : false;
  if (userId != null) await toggleIsRead(userId, params.bookId, isRead);
  else console.error("User Id not provided");
  return redirect(`/book/${params.bookId}`);
};
