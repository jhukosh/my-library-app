import { prisma } from "~/db.server";

export const findOneByUserBookId = async (userBookId?: string) => {
  if (userBookId == null) return null;
  return prisma.review.findUnique({ where: { userBookId } });
};

export const mutateReview = async (
  userBookId: string,
  externalBookId: string,
  title: string,
  description: string,
) => {
  return prisma.review.upsert({
    where: { userBookId },
    update: {
      title,
      description
    },
    create: {
      externalBookId,
      title,
      description,
      userBookId
    },
  });
};
