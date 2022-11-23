import React from 'react';
import Button from '../../../Components/Button';
import appointment from '../../../assets/images/appointment.png'

const Connected = () => {
    return (
        <div style={{ backgroundImage: `url(${appointment})` }} className='text-center mb-10 text-white py-14'>
            <div>
                <p className='text-secondary text-xl font-semibold'>Contact us</p>
                <p className='text-3xl'>Stay connected with us</p>
            </div>
            <div className='lg:w-1/3 w-2/3 mt-5 mx-auto text-black'>
                <form>
                    <input name='userName' type="text" placeholder="Your Name" className="input input-bordered w-full my-3" />
                    <input name='email' type="email" placeholder="Email" className="input input-bordered w-full" />
                    <textarea name='message' className="textarea textarea-bordered w-full my-3 text-black" placeholder="Your Message"></textarea>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default Connected;