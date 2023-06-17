import React from "react";
import PropTypes from "prop-types";
import "./ReviewCard.scss"
const ReviewCard = ({ reviewinfo }) => {
    const { userimage, username, review, rating, title } = reviewinfo;

    return (
        <div className="review-card">
            <div className="user-info">
                <img src={userimage} alt={username} className="user-image" />
                <h3 className="username">{username}</h3>
            </div>
            <h3 className="review-text">{title}</h3>

            <p className="review-text">{review}</p>

            <div className="rating">
                <span className="rating-stars">Rating: {rating} stars</span>
            </div>
        </div>
    );
};

ReviewCard.propTypes = {
    reviewinfo: PropTypes.shape({
        userimage: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        review: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.number.isRequired,

    }).isRequired,
};

export default ReviewCard;
