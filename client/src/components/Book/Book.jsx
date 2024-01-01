import { Slide } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Book({ book }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${book.id}`);
    };
    return (
        <Slide in direction="up" mountOnEnter unmountOnExit>
            <div className="Book" onClick={handleClick}>
                <img src={book.coverImage} alt={book.title} />
                <p>
                    <b>{book.title}</b>
                </p>
                <p>{book.author.name}</p>
            </div>
        </Slide>
    );
}
