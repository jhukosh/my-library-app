export class Review {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  rating: number | null;
  externalBookId: string;
  userBookId: string;

  constructor(
    id: string,
    title: string,
    description: string,
    externalBookId: string,
    userBookId: string,
    isPublic = false,
    rating: number | null = null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.externalBookId = externalBookId;
    this.rating = rating;
    this.isPublic = isPublic;
    this.userBookId = userBookId;
  }
}
