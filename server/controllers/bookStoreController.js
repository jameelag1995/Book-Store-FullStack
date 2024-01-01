import STATUS_CODE from "../constants/statusCodes.js";
import { readBooksFromFile, writeBooksToFile } from "../model/userModel.js";
import { v4 as uuidv4 } from "uuid";

export const getAllBooks = async (req, res, next) => {
    try {
        const books = readBooksFromFile();
        res.send(books);
    } catch (error) {
        next(error);
    }
};

export const createBook = async (req, res, next) => {
    try {
        let newBook = req.body;
        if (!newBook) {
            res.status(STATUS_CODE.BAD_REQUEST);
            throw new Error("Must Fill All Fields");
        }
        const books = readBooksFromFile();
        const createdBook = { id: uuidv4(), ...newBook };
        books.push(createdBook);
        writeBooksToFile(books);
        res.status(STATUS_CODE.CREATED).send(createdBook);
    } catch (error) {
        next(error);
    }
};

export const getBookById = async (req, res, next) => {
    try {
        const requestedBookId = req.params.bookId;
        if (!requestedBookId) {
            res.status(STATUS_CODE.BAD_REQUEST);
            throw new Error("request must contain bookId as parameter");
        }
        const books = readBooksFromFile();
        const requestedBook = books.find((book) => book.id === requestedBookId);
        if (!requestedBook) {
            res.status(STATUS_CODE.NOT_FOUND);
            throw new Error("No such book with given id");
        }
        res.send(requestedBook);
    } catch (error) {
        next(error);
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const requestedBookId = req.params.bookId;
        if (!requestedBookId) {
            res.status(STATUS_CODE.BAD_REQUEST);
            throw new Error("request must contain bookId as parameter");
        }
        const books = readBooksFromFile();
        let requestedBook = books.find((book) => book.id === requestedBookId);
        if (!requestedBook) {
            res.status(STATUS_CODE.NOT_FOUND);
            throw new Error("No such book with given id");
        }
        const updatedBookContent = req.body;
        if (Object.keys(updatedBookContent).length === 0) {
            res.status(STATUS_CODE.BAD_REQUEST);
            throw new Error("request body must contain content to update");
        } else {
            requestedBook = { ...requestedBook, ...updatedBookContent };
        }
        writeBooksToFile(books);
        res.send(requestedBook);
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const requestedBookId = req.params.bookId;
        if (!requestedBookId) {
            res.status(STATUS_CODE.BAD_REQUEST);
            throw new Error("request must contain bookId as parameter");
        }
        const books = readBooksFromFile();
        const originalNumOfBooks = books.length;
        const updatedBooks = books.filter(
            (book) => book.id !== requestedBookId
        );
        if (originalNumOfBooks === updatedBooks.length) {
            res.status(STATUS_CODE.BAD_REQUEST);
            throw new Error("No such book with given id ");
        }
        writeBooksToFile(updatedBooks);
        res.end("Book Deleted!");
    } catch (error) {
        next(error);
    }
};

export const sortBy = (req, res, next) => {
    try {
        const books = readBooksFromFile();
        const sortMethod = req.query.sortby;
        let sortedBooks = [...books];
        switch (sortMethod) {
            case "year":
                sortedBooks.sort((a, b) => a.publishedIn - b.publishedIn);

                res.send(sortedBooks);
                break;
            case "rating":
                sortedBooks.sort((a, b) => a.averageRating - b.averageRating);
                res.send(sortedBooks);
                break;
            case "price":
                sortedBooks.sort((a, b) => a.price - b.price);
                res.send(sortedBooks);
                break;
            default:
                res.status(STATUS_CODE.BAD_REQUEST);
                throw new Error("No such sort available");
                break;
        }
    } catch (error) {
        next(error);
    }
};

export const searchBookByTitle = (req, res, next) => {
    try {
        const books = readBooksFromFile();
        const titleToSearch = req.query.title.toLowerCase();
        const searchedBooks = books.filter((book) =>
            book.title.toLowerCase().includes(titleToSearch)
        );
        res.send(searchedBooks);
    } catch (error) {
        next(error);
    }
};
