import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SortIcon from "@mui/icons-material/Sort";
import { IconButton, Slide } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useBookStore } from "../../context/BookStoreContext/BookStoreContext";
export default function FilterButtons() {
    const { setBooksData } = useBookStore();
    const [filterClicked, setFilterClicked] = useState(false);
    const sortBy = async (sortType) => {
        const result = await axios.get(
            `http://localhost:4545/api/v1/bookstore/sort?sortby=${sortType}`
        );
        setBooksData(result.data);
    };
    return (
        <div className="FilterButtons">
            <IconButton onClick={() => setFilterClicked((prev) => !prev)}>
                <SortIcon />
            </IconButton>

            <Slide
                in={filterClicked}
                mountOnEnter
                unmountOnExit
                direction="right"
            >
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                >
                    <Button
                        onClick={() => {
                            setBooksData([]);
                            sortBy("year");
                        }}
                    >
                        By Year
                    </Button>
                    <Button
                        onClick={() => {
                            setBooksData([]);
                            sortBy("rating");
                        }}
                    >
                        By Rating
                    </Button>
                    <Button
                        onClick={() => {
                            setBooksData([]);
                            sortBy("price");
                        }}
                    >
                        By Price
                    </Button>
                </ButtonGroup>
            </Slide>
        </div>
    );
}
