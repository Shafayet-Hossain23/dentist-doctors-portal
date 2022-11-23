import { async } from '@firebase/util';
import { useQueries, useQuery } from '@tanstack/react-query';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Allusers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-sand.vercel.app/allUsers')
            const data = await res.json()
            return data
        }
    })
    const adminHandler = (id) => {
        fetch(`https://doctors-portal-server-sand.vercel.app/users/admin/${id}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success("Make admin successfully")
                    refetch()
                }
            })
    }

    return (
        <div className='mt-4'>
            <Toaster />
            <div>
                <h1 className='text-2xl font-medium'>All Users</h1>
            </div>
            <div className="overflow-x-auto my-4">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, i) => <tr
                                key={user?._id}
                                className="hover">
                                <th>{i + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    {user?.role !== "admin" && <button onClick={() => adminHandler(user?._id)} className="btn btn-xs btn-primary ">Make Admin</button>}
                                </td>
                                <td><button className="btn btn-xs">Delete</button></td>
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
    );
};

export default Allusers;