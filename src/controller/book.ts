import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getAuthorById, isAuthor } from "./author";

export interface Book {
  id: number;
  title: string;
  yearPublished: number;
  authorId: number;
}

export let books: Book[] = [
  { id: 1, title: "Oliver Twist", yearPublished: 1835, authorId: 1 },
  { id: 2, title: "Harry Potter", yearPublished: 1997, authorId: 2 },
  { id: 3, title: "The Lord of the Rings", yearPublished: 1954, authorId: 2 },
];

export function getAllBooks(req: Request, res: Response) {
  res.status(200).json(books);
}

export function getBookById(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json(book);
}

export function createBook(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const title: string = req.body.title;
  const yearPublished: number = req.body.yearPublished;
  const authorId: number = req.body.authorId;

  if (isAuthor(authorId) === false) {
    return res.status(404).json({ message: "Author not found" });
  }
  const newBook: Book = {
    id: books.length + 1,
    title: title,
    yearPublished: yearPublished,
    authorId: authorId,
  };
  books.push(newBook);
  res.status(201).json(newBook);
}

export function deleteBook(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  books = books.filter((book) => book.id !== id);
  res.status(200).json(book);
}

export function updateBook(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  const title: string = req.body.title;
  const yearPublished: number = req.body.yearPublished;
  const authorId: number = req.body.authorId;

  if (isAuthor(authorId) === false) {
    return res.status(404).json({ message: "Author not found" });
  }
  book.title = title;
  book.yearPublished = yearPublished;
  book.authorId = authorId;
  res.status(200).json(book);
}
