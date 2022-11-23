import React, { useContext } from 'react';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../UserContext/UserContext';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { user } = useContext(AuthContext)
    const { name, slots, price } = treatment
    const date = format(selectedDate, 'PP')
    const modalInfoHandler = (event) => {
        event.preventDefault()
        const form = event.target
        // const appoinmentDate = form.date.value
        const timeSlot = form.slot.value
        const fullName = form.fullName.value
        const email = form.email.value
        const phone = form.phone.value
        const modalInfo = {
            treatmentName: name,
            patientName: fullName,
            email,
            phone,
            timeSlot,
            appoinmentDate: date,
            price
        }
        // console.log(modalInfo)
        fetch('https://doctors-portal-server-sand.vercel.app/bookings', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modalInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged) {
                    toast.success("Successfully Booked")
                    setTreatment('')
                    refetch()
                }
                else {
                    toast.error(`OOPS!!! ${data.message}`)
                    // alert(`OOPs!!! ${data.message}`)
                }

            })

    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-5">{name}</h3>
                    <form onSubmit={modalInfoHandler}>
                        <input name='date' type="text" value={date} disabled
                            placeholder="Type here" className="input input-bordered w-full my-2" />
                        <select name='slot' className="select my-2 select-bordered w-full ">
                            {/* <option disabled selected>Who shot first?</option>
                        <option>Han Solo</option>
                        <option>Greedo</option> */}
                            {
                                slots.map((slot, index) => <option
                                    key={index}
                                    value={slot}
                                >{slot}</option>)
                            }
                        </select>
                        <input name='fullName' type="text" defaultValue={user?.displayName} placeholder="Full Name" className="input input-bordered w-full my-2" />
                        <input name='phone' type="text"
                            placeholder="Phone Number" className="input input-bordered w-full my-2" required />
                        <input name='email' type="email"
                            defaultValue={user?.email} disabled placeholder="Email" className="input input-bordered w-full my-2" />
                        <button className="btn w-full mt-2">submit</button>
                    </form>


                </div>

            </div>
        </>
    );
};

export default BookingModal;