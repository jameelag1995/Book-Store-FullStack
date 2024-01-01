import { Router } from "express";
import {
    createBook,
    deleteBook,
    getAllBooks,
    getBookById,
    searchBookByTitle,
    sortBy,
    updateBook,
} from "../controllers/bookStoreController.js";

const router = Router();

router.get("/", getAllBooks);

router.post("/", createBook);

router.get("/sort", sortBy);

router.get("/search", searchBookByTitle);

router.get("/:bookId", getBookById);

router.put("/:bookId", updateBook);

router.delete("/:bookId", deleteBook);

export default router;
