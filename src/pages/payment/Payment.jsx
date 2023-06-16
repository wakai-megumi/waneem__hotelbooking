import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './checkoutform/CheckoutForm';
import { useLocation } from 'react-router-dom';
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

    ///////////////////
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


    return (
        <div className="payment">
            <h2> Please dont refresh the page</h2>
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
        </div>
    )
}

