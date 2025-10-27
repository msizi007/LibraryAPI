import { Router } from "express";
import { param } from "express-validator";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from "../controller/author";

const router = Router();

router.get("/", getAllAuthors);

router.get(
  "/:id",
  param("id").isInt().withMessage("Id must be an integer"),
  getAuthorById
);

router.post("/", createAuthor);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Id must be an integer"),
  deleteAuthor
);

router.put(
  "/:id",
  param("id").isInt().withMessage("Id must be an integer"),
  updateAuthor
);

export default router;
