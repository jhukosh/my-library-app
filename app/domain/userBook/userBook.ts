import { v4 as uuidv4 } from "uuid";

export class UserBook {
  // make them private and add a getter ?
  id: string;
  externalBookId: string;
  userId: string;
  review: string | null;

  private constructor(
    externalBookId: string,
    userId: string,
    review: string | null
  ) {
    this.externalBookId = externalBookId;
    this.userId = userId;
    this.review = review;
    this.id = uuidv4();
  }

  static create(
    externalBookId: string,
    userId: string,
    review?: string
  ): UserBook {
    return new UserBook(externalBookId, userId, review ?? null);
  }
}
