import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddADoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const { data: optionsNames = [] } = useQuery({
        queryKey: ["appoinmentOptionsName"],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-sand.vercel.app/appoinmentOptionsName');
            const data = await res.json()
            return data;
        }
    })
    // console.log(optionsNames)

    /* const addDoctorHandler = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imagebbHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData)
            })

    } */
    const imagebbHostKey = process.env.REACT_APP_imagebb_key
    const addDoctorHandler = data => {
        const image = data.image[0];
        const formData = new FormData();
        // console.log(imagebb)
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imagebbHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url)
                    const doctorInfo = {
                        doctorName: data.name,
                        doctorEmail: data.email,
                        speciality: data.speciality,
                        imgUrl: imgData.data.url
                    }
                    fetch('https://doctors-portal-server-sand.vercel.app/doctors', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `bearer ${localStorage.getItem("accessToken")}`
                        },
                        body: JSON.stringify(doctorInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success("successfully added")
                                navigate('/dashboard/manageDoctors')
                            }
                        })
                }
            })
    }
    return (
        <div className='mt-4'>
            <div>
                <h1 className='text-2xl font-medium mb-5'>Add A Doctor</h1>
            </div>
            <form onSubmit={handleSubmit(addDoctorHandler)} className="lg:w-2/3 w-full  lg:ml-4">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Name?</span>
                    </label>
                    <input
                        {...register("name", {
                            required: "Name is required "
                        })}
                        type="text" placeholder="Enter Your Name" className="input input-bordered w-full" />
                    {errors.name && <p className='text-error mb-2'>{errors.name?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Email?</span>
                    </label>
                    <input  {...register("email", {
                        required: "Email is required "
                    })}
                        type="email" placeholder="Enter Your email" className="input input-bordered w-full" />
                    {errors.email && <p className='text-error mb-2'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Speciality?</span>
                    </label>
                    <select  {...register("speciality", {
                        required: "speciality is required "
                    })}
                        className="select select-bordered w-full ">
                        {
                            optionsNames.map(optionName => <option
                                key={optionName._id}
                                value={optionName.name}
                            >{optionName.name}</option>)
                        }
                    </select>
                    {errors.speciality && <p className='text-error mb-2'>{errors.speciality?.message}</p>}
                </div>
                <div className='my-5'>
                    <label className="label">
                        <span className="label-text font-semibold">Upload Your Photo?</span>
                    </label>
                    <input
                        {...register("image", {
                            required: "Image is required "
                        })}
                        type="file" className="file-input file-input-bordered w-full" />
                    {errors.image && <p className='text-error mb-2'>{errors.image?.message}</p>}
                </div>
                <div>
                    <button type='submit' className='btn w-full mt-6'>Add</button>
                </div>

            </form>

        </div>
    );
};

export default AddADoctor;