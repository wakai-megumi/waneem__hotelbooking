import React from "react";
import "./BookingcardSkeleton.scss";

const BookingCardSkeleton = () => {
    return (
        <div className="booking-card-skeleton">
            <div className="booking-card-skeleton__hotel"></div>
            <div className="booking-card-skeleton__details">
                <div className="booking-card-skeleton__detail"></div>
                <div className="booking-card-skeleton__detail"></div>
                <div className="booking-card-skeleton__detail"></div>
                <div className="booking-card-skeleton__detail"></div>
            </div>
        </div>
    );
};

export default BookingCardSkeleton;
