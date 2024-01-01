import { useEffect, useState } from "react";
import axios from "axios";
import Book from "./components/Book/Book.jsx";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import FilterButtons from "./components/FilterButtons/FilterButtons.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import { BookStoreProvider } from "./context/BookStoreContext/BookStoreContext.jsx";
import BookPage from "./pages/BookPage/BookPage.jsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function App() {
    const theme = createTheme({
        palette: {
            mode: "light",
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BookStoreProvider>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/:bookId" element={<BookPage />} />
                </Routes>
            </BookStoreProvider>
        </ThemeProvider>
    );
}

export default App;
