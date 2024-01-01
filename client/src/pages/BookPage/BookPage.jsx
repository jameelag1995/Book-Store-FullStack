import { Button, IconButton, Rating, Slide, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import EditButtons from "../../components/EditButtons/EditButtons";

export default function BookPage() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState(null);
    const [ratingVal, setRatingVal] = useState(null);
    useEffect(() => {
        const fetchBookData = async () => {
            const result = await axios.get(
                `http://localhost:4545/api/v1/bookstore/${bookId}`
            );
            setBookData(result.data);
            setRatingVal(result.data.averageRating);
        };
        fetchBookData();
    }, []);
    return (
        <Slide in direction="up">
            <div className="BookPage Page">
                <IconButton
                    onClick={() => {
                        navigate(-1);
                    }}
                    sx={{ position: "absolute", left: "4px", top: "4px" }}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <EditButtons />
                <img src={bookData?.coverImage} alt={bookData?.title} />
                <div className="book-info">
                    {ratingVal && <Rating value={ratingVal} precision={0.5} />}
                    <Typography variant="h5">{bookData?.title}</Typography>
                    <Typography
                        variant="h7"
                        color={"GrayText"}
                        fontWeight={700}
                    >
                        {bookData?.author?.name}
                    </Typography>
                </div>
                <div className="book-details">
                    <div className="section">
                        <Typography variant="h6" fontWeight={600}>
                            {bookData?.publishedIn}
                        </Typography>
                        <Typography variant="p" color={"grey"} fontWeight={500}>
                            Published in
                        </Typography>
                    </div>
                    <div className="section pages">
                        <Typography variant="h6" fontWeight={600}>
                            {bookData?.pages}
                        </Typography>
                        <Typography variant="p" color={"grey"} fontWeight={500}>
                            Pages
                        </Typography>
                    </div>
                    <div className="section">
                        <Typography variant="h6" fontWeight={600}>
                            {bookData?.reviews?.length}
                        </Typography>
                        <Typography variant="p" color={"grey"} fontWeight={500}>
                            Reviews
                        </Typography>
                    </div>
                </div>
                <div className="about">
                    <Typography variant="h5">about</Typography>
                    <Typography variant="p">{bookData?.description}</Typography>
                </div>
                <div className="buttons-container">
                    <Button
                        variant="contained"
                        sx={{ height: "40px" }}
                        fullWidth
                    >
                        <MenuBookIcon sx={{ mr: "8px" }} /> Read
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ height: "40px" }}
                        fullWidth
                    >
                        <HeadphonesIcon sx={{ mr: "8px" }} /> Listen
                    </Button>
                </div>
            </div>
        </Slide>
    );
}
