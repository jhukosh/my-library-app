import { LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Book } from "~/domain/book/Book";
import { getBooks } from "~/domain/book/BookPublicApi";

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const param = url.searchParams.get("search");

  if (param) return getBooks(param);
  return null;
};

export default function Index() {
  // return (
  //   <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
  //     <h1>Welcome to Remix</h1>
  //     <ul>
  //       <li>
  //         <a
  //           target="_blank"
  //           href="https://remix.run/tutorials/blog"
  //           rel="noreferrer"
  //         >
  //           15m Quickstart Blog Tutorial
  //         </a>
  //       </li>
  //       <li>
  //         <a
  //           target="_blank"
  //           href="https://remix.run/tutorials/jokes"
  //           rel="noreferrer"
  //         >
  //           Deep Dive Jokes App Tutorial
  //         </a>
  //       </li>
  //       <li>
  //         <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
  //           Remix Docs
  //         </a>
  //       </li>
  //     </ul>
  //   </div>
  // );
  const search = useLoaderData();
  return (
    <main className="relative h-full min-h-screen bg-white">
      {/* Body */}
      <div className="flex h-[50%] flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Books app</h1>
        <Form reloadDocument method="get" className="mt-4 w-full sm:w-1/2">
          <label className="flex flex-col py-2 font-bold">
            <input
              type="text"
              name="search"
              placeholder="Search by title or author"
              className="rounded border-2 py-2"
            />
          </label>
        </Form>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {search
          ? search.map((b: Book) => (
              <Link key={b.id} to={`/book/${b.id}`}>
                {b.volumeInfo.title}
                <img
                  src={b.volumeInfo.imageLinks?.smallThumbnail}
                  alt={`Cover of ${b.volumeInfo.title}`}
                />
              </Link>
            ))
          : null}
      </div>
    </main>
  );
}
