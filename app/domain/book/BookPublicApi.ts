import axios from "axios";
import type { Book } from "./Book";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const getBooks = async (search: string): Promise<Book[]> => {
  const apiKey = process.env.GOOGLE_API_KEY;
  let response;
  try {
    response = await axios(`${BASE_URL}?key=${apiKey}&q=${search}`).then(
      (response) => response.data
    );
  } catch (err) {
    console.error(err);
  }
  return response.items;
};

export const getBookById = async (bookId: string): Promise<Book> => {
  const apiKey = process.env.GOOGLE_API_KEY;
  let response;
  try {
    response = await axios(`${BASE_URL}/${bookId}?key=${apiKey}`).then(
      (response) => response.data
    );
  } catch (err) {
    console.error(err);
  }
  return response;
};
