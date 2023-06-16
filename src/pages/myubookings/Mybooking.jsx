import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../../components/bookingcard/BookingCard.jsx";
import BookingCardSkeleton from "../../components/skeletons/bookingcardskelton/BookingcardSkeleton.jsx"
import "./Mybooking.scss";
import { toast } from "react-toastify";
import { set } from "date-fns";
import Footer from "../../components/footer/Footer.jsx";
import { useNavigate } from "react-router-dom";


const Mybooking = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    console.log(bookings, "bookings page 0")
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

    //callback to handle the edit and delete booking
    const handleEditDelete = async (action, bookingId, dates,) => {
        console.log(bookingId, dates)
        if (action === "update") {
            console.log("update")
            toast.info("currently not allowed to update the booking , you can contact the associated hotel for same")
        }
        if (action === "delete") {
            console.log(dates)
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

            if (response.data.success === true) {
                const RemainingBookings = bookings.filter((booking) => booking._id !== bookingId)
                setBookings(RemainingBookings)
                return;
            }


        }
    }
    const navigate = useNavigate()
    const navigate_back_to_search_page = () => {
        navigate('/', { replace: true })
    }

    console.log(bookings)
    return (
        <>
            <div className="booking-page">
                <h2 className="booking-page__title">Your Bookings</h2>
                <div className="booking-page__list">
                    {(isLoading || bookings.length == 0) ? (
                        <>
                            {
                                error && <>
                                    <h2> {error}</h2>
                                    <h4 style={{ fontWeight: "500" }}>just go to our search page to book a place at your favourite location , <span onClick={navigate_back_to_search_page}
                                        style={{ cursor: 'pointer', fontSize: '2rem', color: "rgb(20, 200, 250)" }} > click here</span></h4>

                                </>
                            }
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
            <Footer />
        </>
    );
};

export default Mybooking;
