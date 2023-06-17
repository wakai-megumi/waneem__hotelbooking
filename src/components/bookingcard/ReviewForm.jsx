import React, { useState } from "react";
import "./ReviewForm.scss";
import propTypes from "prop-types";

const ReviewForm = ({ onSubmit }) => {
    const [review, setReview] = useState("");
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ review, title, rating });
        setTitle("");
        setReview("");
        setRating(0);
    };

    return (
        <div className="review-form">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Review short title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    rows={5}
                    placeholder="Write your review..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <label htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    min="0"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ReviewForm;

ReviewForm.propTypes = {
    onSubmit: propTypes.func.isRequired,
};
