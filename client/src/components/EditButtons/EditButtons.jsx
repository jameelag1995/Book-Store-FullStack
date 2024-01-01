import { Button, ButtonGroup, IconButton, Slide } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export default function EditButtons() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const deleteBook = async () => {
        const result = await axios.delete(
            `http://localhost:4545/api/v1/bookstore/${bookId}`
        );
        navigate("/");
    };
    return (
        <div className="EditButtons">
            <Slide in={isEditing} direction="left" mountOnEnter unmountOnExit>
                <ButtonGroup>
                    <Button variant="contained" color="success">
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={deleteBook}
                    >
                        Delete
                    </Button>
                </ButtonGroup>
            </Slide>
            <IconButton onClick={() => setIsEditing((prev) => !prev)}>
                <EditIcon />
            </IconButton>
        </div>
    );
}
