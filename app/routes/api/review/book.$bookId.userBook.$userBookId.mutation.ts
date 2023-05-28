import { ActionFunction, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { mutateReview } from "~/server/review/review.server";
import { getUserId } from "~/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.bookId, "Book id is required");
  invariant(params.userBookId, "User book id is required");
  const userId = await getUserId(request);
  const formData = await request.formData();
  // TODO find a way to remove casting
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  // const rating = formData.get("rating");
  if (userId != null)
    await mutateReview(params.userBookId, params.bookId, title, description);
  else console.error("User Id not provided");
  return redirect(`/book/${params.bookId}`);
};
