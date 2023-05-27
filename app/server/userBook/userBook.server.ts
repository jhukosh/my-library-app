import { prisma } from "~/db.server";
import { UserBook as UserBookDomain } from "~/domain/userBook/userBook";

export async function createUserBook(
  externalBookId: string,
  userId: string,
  review?: string
) {
  const newUserBook = UserBookDomain.create(externalBookId, userId, review);
  return prisma.userBook.create({
    data: newUserBook,
  });
}

export async function getByUserId(userId: string) {
  return prisma.userBook.findMany({ where: { userId } });
}

export async function findOneByUserId(
  userId: string | undefined,
  externalBookId: string
) {
  if (userId == null) return null;

  return prisma.userBook.findUnique({
    where: { userId_externalBookId: { userId, externalBookId } },
  });
}

export const deleteUserBook = async (
  userId: string,
  externalBookId: string
) => {
  return prisma.userBook.delete({
    where: { userId_externalBookId: { userId, externalBookId } },
  });
};
