import { Form, Link } from "@remix-run/react";
import { Button } from "./Button";

export const Header = ({ userId }: { userId: string }) => {
  return (
    <div className="flex flex-col justify-between sm:flex-row bg-slate-600 p-4">
      <Link to="/" className="h-14 flex items-center">
        <p className="text-white">Logo</p>
      </Link>
      {userId ? (
        <Form
          action="/logout"
          method="post"
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button theme="dark" type="submit" text="Log Out" />
        </Form>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link to="/join" className="h-14 w-32 text-lg">
            <Button theme="light" text="Sign up" />
          </Link>
          <Link to="/login" className="h-14 w-32 text-lg">
            <Button theme="dark" text="Log In" />
          </Link>
        </div>
      )}
    </div>
  );
};
