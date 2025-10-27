import { Router } from "express";
import { param } from "express-validator";

import {
    createBook,
    deleteBook,
    getAllBooks,
    getBookById,
    updateBook,
} from "../controller/book";

const router = Router();

router.get("/", getAllBooks);

router.get(
    "/:id",
    param("id").isInt().withMessage("Id must be an integer"),
    getBookById
);

router.post("/", createBook);

router.delete(
    "/:id",
    param("id").isInt().withMessage("Id must be an integer"),
    deleteBook
);

router.put(
    "/:id",
    param("id").isInt().withMessage("Id must be an integer"),
    updateBook
);

export default router;