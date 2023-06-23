import { Form } from "@remix-run/react";
import { DeleteCrossIcon } from "~/assets/icons/DeleteCross";
import { Button } from "~/components/Button";

export const DeleteFromMyLibraryBtn = ({ bookId }: { bookId: string }) => {
  return (
    <Form method="post" action={`/api/userBook/${bookId}/delete`}>
      <Button
        type="submit"
        theme="light"
        text={<DeleteCrossIcon className="w-6 h-8 mt-1" />}
        className="text-red border"
      />
    </Form>
  );
};
