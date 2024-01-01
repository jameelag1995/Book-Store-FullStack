import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const BookStoreContext = createContext({
    booksData: [],
    setBooksData: () => {},
});
export const useBookStore = () => {
    return useContext(BookStoreContext);
};
export const BookStoreProvider = ({ children }) => {
    const [booksData, setBooksData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                "http://localhost:4545/api/v1/bookstore"
            );
            setBooksData(result.data);
        };
        fetchData();
    }, []);
    const BookStoreValues = { booksData, setBooksData };
    return (
        <BookStoreContext.Provider value={BookStoreValues}>
            {children}
        </BookStoreContext.Provider>
    );
};
