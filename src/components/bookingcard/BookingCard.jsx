import React from "react";
import "./BookingCard.scss";
import propTypes from "prop-types";
const BookingCard = ({ booking, handleEditDelete }) => {
    const { hotel, checkInDate, checkOutDate, guests, roomN } = booking;
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }
    console.log(booking._id)
    const checkIn = new Date(checkInDate).toLocaleDateString("en-IN", options)
    const checkOut = new Date(checkOutDate).toLocaleDateString("en-IN", options)

    const getDates = (checkInDate, checkOutDate) => {
        let dates = []
        const theDate = new Date(checkInDate)
        const enddate = new Date(checkOutDate)
        while (theDate < enddate) {
            dates = [...dates, new Date(theDate)?.getTime()]
            theDate.setDate(theDate?.getDate() + 1)
        }
        dates = [...dates, enddate.getTime()]
        return dates
    }

    //callback to parent mybookingpage
    const handleEdit = () => {
        handleEditDelete("update", booking._id)
    }
    const handleDelete = () => {
        const dates = getDates(checkInDate, checkOutDate)
        handleEditDelete("delete", booking._id, dates)
    }

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
                    <span className="booking-card__hotel-booking-status-value" style={booking.status === "approved" ? { color: 'green' }
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
            </div>
            <div className="booking-card__hotel__info-bookingedit">
                <button className="booking-card__button" onClick={handleEdit}>Edit </button>
                <button className="booking-card__button" onClick={handleDelete}>Cancel</button>
            </div>

        </div>
    );
};


export default BookingCard;

BookingCard.propTypes = {
    booking: propTypes.object.isRequired,
    handleEditDelete: propTypes.func.isRequired
};
