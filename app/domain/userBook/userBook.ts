import { v4 as uuidv4 } from "uuid";

export class UserBook {
  // make them private and add a getter ?
  id: string;
  externalBookId: string;
  userId: string;
  reviewId: string | null;
  isRead: boolean;

  private constructor(
    externalBookId: string,
    userId: string,
    reviewId: string | null = null, 
    isRead = false
  ) {
    this.externalBookId = externalBookId;
    this.userId = userId;
    this.reviewId = reviewId;
    this.id = uuidv4();
    this.isRead = isRead
  }

  static create(
    externalBookId: string,
    userId: string,
  ): UserBook {
    return new UserBook(externalBookId, userId);
  }
}
