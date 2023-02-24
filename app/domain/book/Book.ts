export type Book = {
  id: string;
  kind: string;
  etag: string;
  selfLink: string;
  saleInfo: {
    country: string;
    isEbook: boolean;
    saleability: string; //TODO type or enum
  };
  volumeInfo: {
    title: string;
    authors: string[];
    averageRating: number;
    canonicalVolumeLink: string;
    categories: string[];
    // contentVersion: "preview-1.0.0"
    description: string;
    imageLinks: { smallThumbnail: string; thumbnail: string };
    // industryIdentifiers: {type: string, identifier: string}[]
    infoLink: string;
    language: string;
    // maturityRating: "NOT_MATURE"
    pageCount: number;
    panelizationSummary: {
      containsEpubBubbles: false;
      containsImageBubbles: false;
    };
    previewLink: string;
    printType: string;
    publishedDate: string;
    ratingsCount: number;
    readingModes: { text: false; image: false };
  };
};
