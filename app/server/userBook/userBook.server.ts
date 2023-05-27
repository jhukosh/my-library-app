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
