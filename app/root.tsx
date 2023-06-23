import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { Header } from "./components/Header";
import { getUserId } from "./session.server";
import { UserConnexionModalContextProvider } from "./contexts/UserConnexionModalContext";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  return { userId } ?? null;
};

export default function App() {
  const {userId} = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header userId={userId} />
        <UserConnexionModalContextProvider>
          <Outlet />
        </UserConnexionModalContextProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
