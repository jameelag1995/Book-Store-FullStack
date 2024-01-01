import { filePath } from "../utils/filePath.js";
import fs from "fs";

const initializeDataFile = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]), "utf-8");
    }
};

const readBooksFromFile = () => {
    try {
        initializeDataFile();
        const fileData = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(fileData);
    } catch (error) {
        throw new Error("Error reading from books file");
    }
};

const writeBooksToFile = (books) => {
    try {
        initializeDataFile();
        fs.writeFileSync(filePath, JSON.stringify(books), "utf-8");
    } catch (error) {
        throw new Error("Error writing to the books file");
    }
};



export { readBooksFromFile, writeBooksToFile };
