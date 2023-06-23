import { v4 as uuidv4 } from "uuid";

export class UserBook {
  // make them private and add a getter ?
  id: string;
  externalBookId: string;
  userId: string;
  isRead: boolean;

  private constructor(
    externalBookId: string,
    userId: string,
    isRead = false
  ) {
    this.externalBookId = externalBookId;
    this.userId = userId;
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
