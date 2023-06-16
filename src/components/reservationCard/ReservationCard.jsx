import React, { useContext, useState } from "react";
import "./ReservationCard.scss";
import propTypes from "prop-types";
import useFetch from "../../customhooks/useFetch";
import { Searchcontext } from "../../context/Searchcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../../context/Authcontext";
import { set } from "date-fns";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../../utils/spinner/Spinner";
import { useEffect } from "react";
import { useRef } from "react";

export const ReservationCard = ({ id, setopen, hotelname, ref }) => {
    const navigate = useNavigate();
    const ReservationCardRef = useRef(null);

    console.log(id, "id hotel page 4")
    const [selectedrooms, setselectedrooms] = useState([]);
    const { data, error, loading } = useFetch(
        `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/hotels/room/${id}`
    );
    console.log(import.meta.env.VITE_REACT_SERVER_URL, "data hotel page 0")
    console.log(data, "data hotel page 0")
    const { date, service_info } = useContext(Searchcontext);
    const { currentUser } = useContext(Authcontext);
    const [booking, setbooking] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [roomdetails, setroomdetails] = useState({});
    const handleselectroom = (e, title) => {
        const number = e.target.parentElement.children[0].innerText;
        const isChecked = e.target.checked;
        const key = [number, title];


        setselectedrooms((prevSelectedRooms) => {
            if (isChecked) {
                return [...prevSelectedRooms, e.target.value];
            } else {
                return prevSelectedRooms.filter((room) => room !== e.target.value);
            }
        });

        setroomdetails((prevRoomDetails) => {
            if (isChecked) {
                return {
                    ...prevRoomDetails,
                    [key]: { roomNumber: number, roomType: title },
                };
            } else {
                const updatedRoomDetails = { ...prevRoomDetails };
                delete updatedRoomDetails[key];
                return updatedRoomDetails;
            }
        });
    };
    useEffect(() => {
        ReservationCardRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }, [])

    const getDates = (startDate, endDate) => {
        let dates = [];
        const theDate = new Date(startDate);

        theDate.setHours(0, 0, 0, 0);
        const midnightEndDate = new Date(endDate);
        midnightEndDate.setHours(0, 0, 0, 0);
        while (theDate < midnightEndDate) {
            dates = [...dates, new Date(theDate).getTime()];
            theDate.setDate(theDate.getDate() + 1);
        }


        dates = [...dates, midnightEndDate.getTime()];

        return dates;
    };





    console.log(date[0]?.startDate, date[0]?.endDate)
    const isRoomAvailable = (roomnumber) => {
        console.log(roomnumber?.unavialableDates, "hsfs")

        const dates = getDates(date[0]?.startDate, date[0]?.endDate);
        console.log(dates, "dates")
        const isAvailable = dates.every((roomdate) => {
            console.log(roomdate, "roomdate")
            if (!roomnumber?.unavialableDates?.includes(roomdate)) {
                return false;
            } else {
                return true;
            }
        });
        return !isAvailable;
    };

    const saveBooking = async () => {
        try {
            const bookingPrice = totalprice();
            console.log(date[0].startDate)
            console.log(date[0].endDate)
            const booked = await axios.post(
                `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/booking/create_payment_intent`,
                {
                    user: currentUser?.email,
                    hotelid: id,
                    guests: service_info?.adults + service_info?.child,
                    checkInDate: date[0]?.startDate,
                    checkOutDate: date[0]?.endDate,
                    paymentAmount: totalprice(),
                    additionalDetails: selectedrooms,
                    bookingPrice: bookingPrice,
                    hotelname
                }, {
                withCredentials: true,
                httpOnly: true,
            }
            );

            if (booked?.data?.success) {
                setbooking(false);
                setopen(false);
            } else {
                alert("Something went wrong");
            }

            return booked;
        } catch (err) {
            console.log(err, "RROE ");
        }
    };




    const totalprice = () => {
        let total = 0;
        console.log(selectedrooms, "selectedrooms")
        selectedrooms?.forEach((roomNumberId) => {
            console.log(data)
            const room = data?.roomslist?.find((room) => {
                console.log(room)

                return room?.roomNumbers?.some((roomNumber) => roomNumber._id === roomNumberId)
            }

            );
            console.log(room, 'room')
            const roomprice = room?.price;
            total += roomprice;
        });
        return total;
    };

    console.log(currentUser)
    const handleReservation = async () => {
        console.log("in this")
        const dates = getDates(date[0]?.startDate, date[0]?.endDate);

        if (currentUser === null) {
            navigate("/login");
            return;
        }

        setbooking(true);
        const price = totalprice();

        try {
            console.log('herenew')
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/room/updatedate/dates`,
                {
                    dates,
                    selectedrooms,
                    hotelid: id,
                }
            );
            console.log(response)
            const booked = await saveBooking();

            const bookingdata = {
                booked: booked?.data?.newbooking,
                price,
                hotelname,
                client_secret: booked?.data?.clientSecret
            };
            setbooking(false)


            setBookingDetails(bookingdata);
            setShowConfirmation(true);

            navigate("/success", {
                state: {
                    data: bookingdata
                }
            });
        } catch (err) {
            console.log(err);
            setbooking(false);
        }
    };




    const confirmBookingDetails = () => {
        if (selectedrooms.length === 0) {

            return toast.error(' please select a room 🤔 🤔')

        }
        console.log('here. in this')

        setBookingDetails({
            hotelname,
            totalprice: totalprice(),
            checkInDate: date[0]?.startDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            }),
            checkOutDate: date[0]?.endDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            }),
            guests: service_info?.adults + service_info?.child,
        });

        console.log(bookingDetails)

        setShowConfirmation(true);
    };

    const handleReselection = () => {
        setroomdetails([]);
        setselectedrooms([]);
        setShowConfirmation(false);

        const checkboxes = document.querySelectorAll('.roomnumber__checkbox');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    };

    return (
        <div className="reservationCard">
            <div className="reservationCard__container">
                <button
                    className="reservationCard__closebtn"
                    onClick={() => setopen(false)}
                >
                    X
                </button>
                {data?.roomslist?.map((room) => {
                    return (
                        <div className="reservationCard__room" key={room?._id}>
                            <h3 className="reservationCard__roomtype">
                                Room Type: {room?.title}
                            </h3>
                            <h5 className="reservationCard__desc">{room?.desc}</h5>
                            <h3 className="reservationCard__roomprice">
                                Rs {room?.price} only
                            </h3>
                            <div className="roomnumber">
                                {/*  done change to include that if no room is availabel then you can just show that no roomavailable for this date */}



                                {room?.roomNumbers?.map((roomnumber) => {
                                    return (
                                        <div
                                            className="roomnumber__container"
                                            key={roomnumber._id}
                                        >
                                            <label htmlFor="roomcheck"> {roomnumber.number}</label>
                                            <input
                                                type="checkbox"
                                                name="roomcheck"
                                                id="roomcheck"
                                                style={
                                                    !isRoomAvailable(roomnumber)
                                                        ? { cursor: "not-allowed", opacity: "0.5" }
                                                        : {}
                                                }
                                                className="roomnumber__checkbox"
                                                value={roomnumber._id}
                                                disabled={!isRoomAvailable(roomnumber)}
                                                onClick={(e) => handleselectroom(e, room.title)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
                <button
                    className="reservationCard__bookbtn"
                    disabled={booking}
                    onClick={confirmBookingDetails}
                >
                    Confirm Booking Details
                </button>
            </div>

            {/* here showing the booking confirmation before requesting  the api to initiate the payment and booking */}
            {showConfirmation && (
                <div className="confirmation_container">
                    {
                        booking ? (
                            < Spinner />)
                            :
                            (
                                <div className="reservationCard__confirmation">
                                    <button
                                        className="close_confirmation"
                                        onClick={() => handleReselection()}
                                    >
                                        🧐 Edit
                                    </button>
                                    <h3 className="confirmation_title">Confirm Reservation</h3>
                                    <div className="details">
                                        <span className="confirmation_details">  Hotel Name:</span> {bookingDetails?.hotelname}
                                        <br />
                                        <span className="confirmation_details"> Total Price:</span> ₹ {bookingDetails?.totalprice}
                                        <br />
                                        <span className="confirmation_details">  Check In Date: </span>{bookingDetails?.checkInDate}
                                        <br />
                                        <span className="confirmation_details">  Check Out Date:</span> {bookingDetails?.checkOutDate}
                                        <br />
                                        <span className="confirmation_details">  Guests: </span>{bookingDetails?.guests}
                                        <br />
                                        <span className="confirmation_details">  Rooms:</span>
                                        <div className="rooms">
                                            {Object.entries(roomdetails).map(([key, value]) => {
                                                const roomNumber = value.roomNumber;
                                                const roomType = value.roomType;

                                                return (
                                                    <div key={key}>
                                                        <p>  <span className=" number confirmation-details"> Room Number:  </span>{roomNumber}</p>
                                                        <p><span className=" type confirmation-details">Room Type:</span> {roomType}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                    </div>
                                    <button className="confirmstion_btn" onClick={handleReservation}>
                                        Reserve Now
                                    </button>
                                </div>
                            )
                    }
                </div>
            )}
        </div>
    );
};

ReservationCard.propTypes = {
    id: propTypes.string,
    setopen: propTypes.func,
    hotelname: propTypes.string,
};
