import { Form, Link } from "@remix-run/react";
import { Button } from "./Button";

export const Header = () => {
  const user = null;

  return (
    <div className="flex flex-col justify-between sm:flex-row bg-slate-600 p-4">
      <Link
        to="/"
        className="h-14 flex items-center"
      >
       <p className="text-white">Logo</p>
      </Link>
      {user ? (
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/my-books"
            className="flex items-center justify-center rounded border border-transparent bg-white px-4 py-2 text-base font-medium text-cyan-700 shadow-sm hover:bg-cyan-50"
          >
            My Books
          </Link>
          <Link
            to="/reviews"
            className="flex items-center justify-center rounded border border-transparent bg-white px-4 py-2 text-base font-medium text-cyan-700 shadow-sm hover:bg-cyan-50"
          >
            My reviews
          </Link>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded bg-cyan-500 py-2 px-4 text-white hover:bg-cyan-600 "
            >
              Logout
            </button>
          </Form>
        </div>
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
