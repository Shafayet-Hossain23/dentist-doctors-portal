import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { set } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const CheckoutForm = ({ data }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false)
    const { price, treatmentName, patientName, email, _id } = data
    const [clientSecret, setClientSecret] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctors-portal-server-sand.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            // console.log(error)
            setError(error.message)
        }
        else {
            setError('')
        }

        setProcessing(true)
        setSuccess('');

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: email
                    },
                },
            },
        );
        if (confirmError) {
            setError(confirmError)
            return;
        }
        // console.log(paymentIntent)
        if (paymentIntent.status === "succeeded") {
            // setSuccess("Congrats! Successfuly payment compeleted")
            // setTransactionId(paymentIntent.id)
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }
            fetch(`https://doctors-portal-server-sand.vercel.app/payments`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                        setProcessing(false)
                        // navigate("/dashboard")
                    }
                })
        }
        // setProcessing(false)
        // console.log(processing)

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary mt-5' type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Payment Now
                </button>
            </form>
            <div>
                <p className='text-red-400 mt-2 text-xl'>{error}</p>
            </div>
            <div>
                {
                    success && <div>
                        <p className='text-green-500'>{success}</p>
                        <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                    </div>
                }
            </div>
        </>
    );
};

export default CheckoutForm;