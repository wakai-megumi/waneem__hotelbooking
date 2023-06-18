import React from "react";
import "./BookingCard.scss";
import propTypes from "prop-types";
import ReviewForm from "./ReviewForm";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const BookingCard = ({ booking, handleEditDelete }) => {
    const { hotel, checkInDate, checkOutDate, guests, roomN, ReservationAmount, TotalPrice } = booking;
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }
    const [open_reveiw_form, SetOpen_review_form] = useState(false)
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const userid = user._id
    const checkIn = new Date(checkInDate).toLocaleDateString("en-IN", options)
    const checkOut = new Date(checkOutDate).toLocaleDateString("en-IN", options)
    // checkindate , checkoutdate

    const getDates = (startDate, endDate) => {                  // one catch is that we are taking midnight of dates to keep data consistency
        let dates = [];
        const theDate = new Date(startDate);

        theDate.setHours(0, 0, 0, 0);

        while (theDate <= endDate) {
            dates = [...dates, new Date(theDate).getTime()];
            theDate.setDate(theDate.getDate() + 1);
        }

        const midnightEndDate = new Date(endDate);
        midnightEndDate.setHours(0, 0, 0, 0);
        dates = [...dates, midnightEndDate.getTime()];

        return dates;
    };

    //callback to parent mybookingpage
    const handleEdit = () => {
        handleEditDelete("update", booking._id,)
    }
    const handleDelete = () => {
        const dates = getDates(checkInDate, checkOutDate)

        handleEditDelete("delete", booking._id, dates)
    }

    const handleReviewSubmit = async (reviewData) => {
        try {
            const { review, rating, title } = reviewData
            const reviewPayload = {
                user: user._id,
                hotelid: booking.hotelid,
                review,
                rating,
                title: title,
                createdAt: new Date(),
                updatedAt: new Date(),
                username: user?.username,
                userimage: user?.profileimage
            };

            console.log(reviewPayload)
            const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/hotels/reviews/${userid}`, reviewPayload, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,

            })
            SetOpen_review_form(false)
            toast.success("Review submitted successfully")
            console.log(response)

        } catch (error) {
            SetOpen_review_form(false)
            toast.error("An error occurred while submitting the review, please try again later")
            console.error("An error occurred while submitting the review", error);
        }
    };

    return (
        <div className="booking-card">
            <div className="booking-card__hotel">
                <img src={hotel.hotelLogo} alt={hotel.name} className="booking-card__logo" />
                <div className="booking-card__hotel-info">
                    <h3 className="booking-card__hotel-name">{hotel.name}</h3>
                    <p className="booking-card__hotel-address">{hotel.address}</p>
                </div>
                <div className="booking-card__hotel-booking-status">
                    <span className="booking-card__hotel-booking-status-label"> Booking Status :</span>
                    <span className="booking-card__hotel-booking-status-value" style={booking.status === "Approved" ? { color: 'green' }
                        : booking.status === "Pending" ? { color: 'orange' } : { color: 'red' }

                    }>{booking.status}</span>
                </div>
            </div>
            <div className="booking-card__details">
                <div className="booking-card__detail">
                    <span className="booking-card__label">Check-In:</span>
                    <span className="booking-card__value">{checkIn}</span>
                </div>
                <div className="booking-card__detail">
                    <span className="booking-card__label">Check-Out:</span>
                    <span className="booking-card__value">{checkOut}</span>
                </div>
                <div className="booking-card__detail">
                    <span className="booking-card__label">Guests:</span>
                    <span className="booking-card__value">{guests}</span>
                </div>

                <div className="booking-card__detail">
                    <span className="booking-card__label">Room Numbers:</span>
                    <span className="booking-card__value">{roomN.map(number => {
                        return (
                            <span style={{ marginRight: '5px' }} key={number.number}>{number.number} </span>
                        )
                    })}</span>
                </div>
                <div className="booking-card__detail">
                    <span className="booking-card__label">Reservation Amount:</span>
                    <span className="booking-card__value">{ReservationAmount}</span>
                </div>
                <div className="booking-card__detail">
                    <span className="booking-card__label">Total Amount:</span>
                    <span className="booking-card__value">{TotalPrice || '---'}</span>
                </div>
            </div>
            <div className="booking-card__hotel__info-bookingedit">
                <button className="booking-card__button" onClick={handleEdit}>Edit </button>
                <button className="booking-card__button" onClick={handleDelete}>Cancel</button>
            </div>


            <div className="booking-card__review">
                <h3>Write a Review  <button className="reviewbutton" onClick={() => SetOpen_review_form(!open_reveiw_form)}> Review</button></h3>
                {open_reveiw_form && (booking.status === "Approved" ? (
                    <ReviewForm onSubmit={handleReviewSubmit} />
                ) : (
                    <p>Booking should be approved to write a review</p>
                ))}


            </div>
        </div>
    );
};


export default BookingCard;

BookingCard.propTypes = {
    booking: propTypes.object.isRequired,
    handleEditDelete: propTypes.func.isRequired
};
