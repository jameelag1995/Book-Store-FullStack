import React, { useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import { useBookStore } from "../../context/BookStoreContext/BookStoreContext";
import Book from "../../components/Book/Book";
import { Slide } from "@mui/material";

export default function Home() {
    const { booksData } = useBookStore();
    useEffect(() => {}, [booksData]);

    return (
        <Slide in direction="up">
            <main className="Home Page">
                <h1>Book Store</h1>
                <SearchBar />
                <FilterButtons />
                <div className="books-container">
                    {booksData &&
                        booksData.map((book) => (
                            <Book key={book.id} book={book} />
                        ))}
                </div>
            </main>
        </Slide>
    );
}
