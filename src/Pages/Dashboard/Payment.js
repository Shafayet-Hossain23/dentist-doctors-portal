import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Components/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_key);
// console.log(stripePromise)
const Payment = () => {
    const data = useLoaderData()
    // console.log(data)
    // const navigation = useNavigation()
    // if (navigation.state === "loading") {
    //     return <Loading></Loading>
    // }
    return (
        <div className='mt-4'>
            <div>
                <h1 className='text-2xl font-medium'>Payment</h1>
            </div>
            <div>
                <h1 className='text-xl mt-2 font-medium'>Hey, {data?.patientName}!  your payment for {data?.treatmentName} on {data?.appoinmentDate}</h1>
            </div>
            <div className='mt-7'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        data={data}
                    />
                </Elements>
            </div>

        </div>
    );
};

export default Payment;