import { Form, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Review } from "~/domain/review/review";
import { Button } from "~/components/Button";
import { CheckDoubleIcon } from "~/assets/icons/CheckDouble";
import { DeleteCrossIcon } from "~/assets/icons/DeleteCross";

type UserBookInfosProps = {
  bookId: string;
  isRead: boolean;
};

export const UserBookInfos = ({ isRead, bookId }: UserBookInfosProps) => {
  const submit = useSubmit();

  const handleToggleIsRead = (event: any) => {
    submit(event.currentTarget, { replace: true });
  };

  return (
    <div className="flex flex-col w-full px-16">
      <div className="text-cyan-700 mb-6 text-xl flex gap-2 items-center italic justify-center">
        <p>This book is saved in your library </p>
        <CheckDoubleIcon className="w-8 h-8" />
      </div>

      <Form
        method="post"
        action={`/api/userBook/${bookId}/update`}
        onChange={handleToggleIsRead}
        className="flex justify-center items-center mb-6"
      >
        <label className="text-slate-500 text-lg flex">
          {isRead ? "You've read this book" : "Mark as read"}
          <input
            className="ml-2 w-6 h-6"
            type="checkbox"
            name="isRead"
            defaultChecked={isRead}
          />
        </label>
      </Form>
    </div>
  );
};
