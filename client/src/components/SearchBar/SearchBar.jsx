import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useRef } from "react";
import axios from "axios";
import { useBookStore } from "../../context/BookStoreContext/BookStoreContext";

export default function SearchBar() {
    const { setBooksData } = useBookStore();
    const searchRef = useRef();
    const search = async () => {
        const result = await axios.get(
            `http://localhost:4545/api/v1/bookstore/search?title=${searchRef.current.value}`
        );
        setBooksData(result.data);
    };
    return (
        <Paper
            component="form"
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 1,
            }}
        >
            <InputBase
                inputRef={searchRef}
                onChange={() => {
                    setBooksData([]);
                    search();
                }}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Book Store"
                inputProps={{ "aria-label": "search Book Store" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
