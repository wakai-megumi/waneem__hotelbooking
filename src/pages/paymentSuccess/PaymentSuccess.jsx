import React, { useEffect } from 'react'
import Penguin from '../../utils/lovely_penguin/Lovely_penguin'
import "./PaymentSuccess.scss"
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
const PaymentSuccess = () => {
    const navigate = useNavigate()
    const { search } = useLocation()
    const params = new URLSearchParams(search)
    const payment_intent = params.get('payment_intent')
    console.log(payment_intent)
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const userid = user._id
    useEffect(() => {

        const updateBooking = async () => {
            try {
                const res = await axios.put(`${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/booking/confirmReservation/${userid}`, { payment_intent: payment_intent }, {
                    withCredentials: true
                })
                setTimeout(() => {
                    navigate('/bookings', { replace: true })

                }, 6000)

            }
            catch (err) {
                console.log(err, "payment-succes page")

            }
        }
        updateBooking()

    }, [])

    return (
        <div className='paymentsuccess'>
            <Penguin className="penguin" />
            <h2>Payment success</h2>
            <p className='notice'>Thank you for your booking , you are being redirected to your bookings page, wait a while and <span>dont i said dont </span>refresh the page</p>


        </div>
    )
}

export default PaymentSuccess