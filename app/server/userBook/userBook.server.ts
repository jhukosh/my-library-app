import { prisma } from "~/db.server";
import { UserBook } from "~/domain/userBook/userBook";

export const createUserBook = async (externalBookId: string, userId: string) => {
  const newUserBook = UserBook.create(externalBookId, userId);
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

export const toggleIsRead = (
  userId: string,
  externalBookId: string,
  isRead: boolean
) => {
  return prisma.userBook.update({
    where: { userId_externalBookId: { userId, externalBookId } },
    data: { isRead },
  });
};
