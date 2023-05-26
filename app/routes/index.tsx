import { LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Book } from "~/domain/book/Book";
import { getBooks } from "~/domain/book/BookPublicApi";
import NoBookFound from "~/assets/no-book-found.jpeg";

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const param = url.searchParams.get("search");

  if (param) return getBooks(param);
  return null;
};

export default function Index() {
  const books = useLoaderData();
  return (
    <>
      <main className="relative h-full w-full flex flex-col items-center bg-white">
        <h1 className="text-4xl font-bold mt-16 text-cyan-800">
          * My Library *
        </h1>
        <div className="flex w-full flex-col items-center justify-center">
          <Form reloadDocument method="get" className="my-4 w-full sm:w-1/2">
            <label className="flex flex-col py-2 font-semibold">
              <input
                type="text"
                name="search"
                placeholder="Search by title or author"
                className="rounded-lg border-2 p-3 text-lg"
              />
            </label>
          </Form>
        </div>

        {books ? (
          <div className="grid grid-cols-3 gap-8 md:gap-24 md:px-40 px-16 auto-rows-fr mt-16">
            {books.map((b: Book) => {
              const imgPath = b.volumeInfo.imageLinks?.thumbnail ?? NoBookFound;
              return (
                <div
                  key={b.id}
                  className="w-full border border-slate-200 rounded-lg shadow bg-slate-50"
                >
                  <img
                    className="rounded-t-lg w-full h-80 object-cover object-top"
                    src={imgPath}
                    alt={`Cover of ${b.volumeInfo.title}`}
                  />
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {b.volumeInfo.title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {b.volumeInfo.authors}
                    </p>

                    <Link
                      key={b.id}
                      to={`/book/${b.id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <p>Read more</p>
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col w-full mt-16 justify-center items-center gap-2">
            <h2 className="font-bold text-3xl text-slate-500">
              Search books by title or authors
            </h2>
            <p className="font-semibold italic text-2xl text-cyan-700">
              Add them to your library
            </p>
            <p className="text-2xl text-slate-400">
              And write your personal review to keep track of your readings
            </p>
          </div>
        )}
      </main>
    </>
  );
}
