import { Request, Response } from "express";
import { validationResult } from "express-validator";

export interface Author {
  id: number;
  name: string;
}

export let authors: Author[] = [
  {
    id: 1,
    name: "John Shaggerman",
  },
  {
    id: 2,
    name: "J.K Rownlings",
  },
];

export function getAllAuthors(req: Request, res: Response) {
  res.status(200).json(authors);
}

export function getAuthorById(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(req.params.id);
  const author = authors.find((author) => author.id === id);
  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }
  res.status(200).json(author);
}

export function createAuthor(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const name: string = req.body.name;

  const newAuthor: Author = {
    id: authors.length + 1,
    name: name,
  };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
}

export function deleteAuthor(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(req.params.id);
  const author = authors.find((author) => author.id === id);
  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }
  authors = authors.filter((author) => author.id !== id);
  res.status(200).json(author);
}

export function updateAuthor(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(req.params.id);
  const author = authors.find((author) => author.id === id);
  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }
  const name: string = req.body.name;
  author.name = name;
  res.status(200).json(author);
}

export function isAuthor(id: number) {
  return authors.find((author) => author.id === id) !== undefined;
}
