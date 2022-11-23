import React from 'react';
import Button from '../../../Components/Button';
import img from '../../../assets/images/doctor.png'
import appointment from '../../../assets/images/appointment.png'


const MakeApponment = () => {
    return (
        <div style={{ backgroundImage: `url(${appointment})` }} className="hero mb-20  text-white lg:h-[440px] h-full">
            <div className="hero-content flex-col lg:flex-row">
                <img src={img} className="lg:w-1/2 w-full -mt-36 hidden lg:block" alt='' />
                <div className=''>
                    <p className='text-secondary text-xl font-semibold'>APPOINMENT</p>
                    <h1 className="text-5xl font-bold">Make an appointment Today</h1>
                    <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <Button>Get Started</Button>
                </div>
            </div>
        </div>
    );
};

export default MakeApponment;