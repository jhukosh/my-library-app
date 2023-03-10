import { createSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import type { User } from "~/domain/User/user.server";
import { getUserById } from "~/domain/User/user.server";
import { prisma } from "~/db.server";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

function createDatabaseSessionStorage({ cookie }: any) {
  return createSessionStorage({
    cookie,
    async createData(data, expires) {
      // `expires` is a Date after which the data should be considered
      // invalid. You could use it to invalidate the data somehow or
      // automatically purge this record from your database.
      const { id } = await prisma.session.create({
        data: {
          userId: data.userId,
          content: "test",
        },
      });
      return id;
    },
    async readData(id) {
      return (await prisma.session.findUnique({ where: { id } })) || null;
    },
    async updateData(id, data, expires) {
      await prisma.session.update({ where: { id }, data });
    },
    async deleteData(id) {
      await prisma.session.delete({ where: { id } });
    },
  });
}

export const { getSession, commitSession, destroySession } =
  createDatabaseSessionStorage({
    cookie: {
      name: "__session",
      sameSite: "lax",
    },
  });

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getCurrentSession(request);
  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

const USER_SESSION_KEY = "userId";

export async function getCurrentSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return getSession(cookie);
}

export async function getUserId(
  request: Request
): Promise<User["id"] | undefined> {
  const session = await getCurrentSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (userId === undefined) return null;

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function logout(request: Request) {
  const session = await getCurrentSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
