import { Form, Link } from "@remix-run/react";

export const Header = () => {
  const user = null;

  return (
    <div className="flex flex-col justify-end sm:flex-row bg-slate-600 p-4">
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
          <Link
            to="/join"
            className="flex items-center justify-center rounded border border-transparent bg-white px-4 py-2 text-base font-medium text-slate-600 shadow-sm hover:bg-cyan-50 hover:text-cyan-700"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center rounded bg-slate-400 px-4 py-2 font-medium text-white hover:bg-cyan-600"
          >
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};
