import { useQuery } from '@tanstack/react-query';

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../UserContext/UserContext';

const MyAppoinment = () => {
    const { user } = useContext(AuthContext)

    // const url = `https://doctors-portal-server-sand.vercel.app/bookings?email=${user?.email}`;
    const { data: userBookings = [] } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-sand.vercel.app/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(userBookings)
    return (
        <div className='mt-4'>
            <div>
                <h1 className='text-2xl font-medium'>My Appoinment</h1>
            </div>
            <div>
                <div className="overflow-x-auto mt-4">
                    <table className="table w-full">
                        {/* <!-- head --> */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Treatment</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Pay Action</th>
                                <th>price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userBookings?.map((book, i) => <tr
                                    key={book?._id}
                                    className="hover">
                                    <th>{i + 1}</th>
                                    <td>{book?.patientName}</td>
                                    <td>{book?.treatmentName}</td>
                                    <td>{book?.timeSlot}</td>
                                    <td>{book?.appoinmentDate}</td>

                                    {
                                        book?.price && !book?.paid &&
                                        <td>
                                            <Link
                                                to={`dashboard/payment/${book._id}`}
                                                className='btn btn-xs btn-primary'
                                            >Pay Now</Link>
                                        </td>
                                    }
                                    {
                                        book?.price && book?.paid &&
                                        <td className='text-green-500'>
                                            Paid
                                        </td>
                                    }
                                    <td>{book?.price}</td>
                                </tr>)
                            }

                            {/* <tr className="hover">
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default MyAppoinment;