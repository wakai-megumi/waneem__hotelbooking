import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Success.scss";
const BookingSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { booked, price, hotelname, client_secret } = location.state?.data || {};


    const completePayment = () => {
        const BookingData = {
            booked: booked,
            price,
            hotelname,
            client_secret
        };
        console.log(BookingData)

        navigate("/payment", {
            state: {
                data: BookingData
            }
        });
    };

    console.log(location.state)

    const handleFetchBookings = () => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log('frist')
        // Navigate to the bookings page with the user ID
        navigate(`/bookings/${currentUser._id}`);
        console.log('second')
    };


    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Kolkata"
    };

    const checkout = booked?.checkOutDate ? new Date(booked.checkOutDate).toLocaleDateString("en-IN", options) : "";
    const checkin = booked?.checkInDate ? new Date(booked.checkInDate).toLocaleDateString("en-IN", options) : "";

    return (
        <div className="booking-success">
            <h2 className="booking-success__title">Booking Successful!</h2>
            <p className="booking-success__message">
                Thank you for choosing  {hotelname && hotelname}. Your booking is currently pending and  is  refundable after payment for 14 hours , or 24 hrs before checkIn Date , whichever is valid. You can cancel your booking during this period. please initiate to  complete reservation process. click on payment button to complete reservation process.
            </p>
            <div className="booking-success__card">
                <div className="booking-success__card-item">
                    <span className="booking-success__card-label">Hotel:</span>
                    <span className="booking-success__card-value">{hotelname}</span>
                </div>
                <div className="booking-success__card-item">
                    <span className="booking-success__card-label">Total Price:</span>
                    <span className="booking-success__card-value">Rs {price}</span>
                </div>
                <div className="booking-success__card-item">
                    <span className="booking-success__card-label">Reservation  Price:</span>
                    <span className="booking-success__card-value">Rs {booked?.ReservationAmount}</span>
                </div>
                <div className="booking-success__card-item">
                    <span className="booking-success__card-label">Check-In Date:</span>
                    <span className="booking-success__card-value">{checkin}</span>
                </div>
                <div className="booking-success__card-item">
                    <span className="booking-success__card-label">Check-Out Date:</span>
                    <span className="booking-success__card-value">{checkout}</span>
                </div>
            </div>
            <div className="booking-success__actions">
                <button className="booking-success__button" onClick={completePayment}>
                    Continue to Payment
                </button>

            </div>
        </div>
    );
};

export default BookingSuccess;
