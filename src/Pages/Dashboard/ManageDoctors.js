import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmationModal from '../../Components/ConfirmationModal';
import Loading from '../../Components/Loading';

const ManageDoctors = () => {
    const [modalData, setModalData] = useState(null)
    const closeModal = () => {
        setModalData(null)
    }
    const deleteDoctorHandler = (doctor) => {
        // console.log(doctor)
        fetch(`https://doctors-portal-server-sand.vercel.app/doctors/${doctor?._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount === 1) {
                    toast.success("Successfully Deleted")
                    refetch()
                }
            })
    }
    const { data: doctorsCollection = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-sand.vercel.app/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json()
                return data
            }
            catch (error) {

            }
        }
    })

    console.log(doctorsCollection)
    if (isLoading) {
        <Loading></Loading>
    }
    return (
        <div className='mt-4'>
            <div>
                <h1 className='text-2xl font-medium'>Manage Doctors</h1>
            </div>
            <div className="overflow-x-auto my-4">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctorsCollection?.map((doctor, i) => <tr
                                key={doctor?._id}
                                className="hover">
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={doctor?.imgUrl} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor?.doctorName}</td>
                                <td>{doctor?.speciality}</td>
                                {/* <td><button className="">Delete</button></td> */}
                                <td> <label
                                    onClick={() => setModalData(doctor)}
                                    htmlFor="confirmation-modal" className="btn btn-xs">Delete</label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                modalData && <ConfirmationModal
                    modalData={modalData}
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${modalData?.doctorName}, It can not be undone`}
                    closeModal={closeModal}
                    deleteDoctorHandler={deleteDoctorHandler}
                    btnName={"Delete"}
                ></ConfirmationModal>
            }
            <div>
                <Toaster />
            </div>

        </div>
    );
};

export default ManageDoctors;