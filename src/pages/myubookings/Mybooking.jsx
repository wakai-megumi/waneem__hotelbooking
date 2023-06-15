import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../../components/bookingcard/BookingCard.jsx";
import BookingCardSkeleton from "../../components/skeletons/bookingcardskelton/BookingcardSkeleton.jsx"
import "./Mybooking.scss";

const Mybooking = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/booking/user_booking`, {
                useremail: JSON.parse(localStorage.getItem("currentUser")).email,
            });

            setBookings(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setError(error.response.data.message)
        }
    };
    console.log()

    //callback to handle the edit and delete booking
    const handleEditDelete = async (action, bookingId, dates,) => {
        console.log(bookingId, dates)
        if (action === "update") {
            console.log("update")
        }
        if (action === "delete") {
            const response = await axios.delete(`${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/booking/delete`, {
                headers: {
                    'data': JSON.stringify({
                        id: bookingId,
                        dates: dates
                    })
                }
            },
                {
                    withCredentials: true
                })

            console.log(response)

        }
    }
    console.log(bookings)
    return (
        <div className="booking-page">
            <h2 className="booking-page__title">Your Bookings</h2>
            <div className="booking-page__list">
                {(isLoading || bookings.length == 0) ? (
                    <>
                        {
                            error && <h2> {error}</h2>
                        }
                        <BookingCardSkeleton />
                        <BookingCardSkeleton />
                        <BookingCardSkeleton />
                        <BookingCardSkeleton />
                        <BookingCardSkeleton />
                        <BookingCardSkeleton />

                    </>
                ) : (
                    bookings.map((booking) => <BookingCard key={booking._id} booking={booking} handleEditDelete={handleEditDelete} />)
                )}
            </div>
        </div>
    );
};

export default Mybooking;
