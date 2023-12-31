import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './checkoutform/CheckoutForm';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Payment.scss"
import Spinner from '../../utils/spinner/Spinner';

const stripePromise = loadStripe("pk_test_51NImxJSIC3pABJ2X85QFTtOupcIvL8OLgMrtRmbWmzAF5HUOiDNvilrXq7L0S9eXwQJDfZWiJPl0BKQzIcQEoro80042pUXUbN")  // my public test key
export const Payment = () => {

    const location = useLocation()
    const [clientSecret, setClientSecret] = useState("");
    const { booked, price, hotelname, client_secret } = location.state?.data || {};
    const [fakeloading, setFakeloading] = useState(false)

    console.log(hotelname)
    useEffect(() => {
        // save PaymentIntent as soon as the page loads
        setFakeloading(true)
        setClientSecret(client_secret)

        setTimeout(() => {
            setFakeloading(false)
        }

            , 1000)


    }, [])

    const navigate = useNavigate()
    ///////////////////
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    }


    return (
        <div className="payment">
            <h2> Please dont refresh the page</h2>
            <h2> if there are issues while making payment ,or dont wanna pay for reservatio ,  you can jump to

                <span style={{ color: "green", cursor: "pointer" }}
                    onClick={() => navigate('/bookings')}>  my bookings page</span> ,
                as you booking requested is succcesfully created , you can wait for confiramtion from hotel</h2>
            <h3> user card number 4242 4242 4242 4242  , other details anythinng for now for testing the stripe </h3>
            <div className="payment__details">

                {fakeloading ? <Spinner />
                    :
                    <>

                        {
                            clientSecret && (
                                <Elements options={options} stripe={stripePromise}>
                                    <CheckoutForm />
                                </Elements>

                            )
                        }

                    </>
                }
            </div>
        </div >
    )
}

