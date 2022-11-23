import React from 'react';
import img from '../../../assets/images/chair.png'
import bg from '../../../assets/images/bg.png'
import Button from '../../../Components/Button';

const Banner = () => {
    return (
        <div style={{ backgroundImage: `url(${bg})` }} className="hero mt-14">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={img} className="lg:w-1/2 w-full rounded-lg shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <Button>Get Started</Button>
                </div>
            </div>
        </div>
    );
};

export default Banner;