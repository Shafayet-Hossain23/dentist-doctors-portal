import React from 'react';

const Testimonial = ({ review }) => {
    const { name, img, review: text, location } = review
    return (
        <div className="card  shadow-xl">
            <div className="card-body">
                <p>{text}</p>
                <div className="card-actions mt-3">
                    <div>
                        <img className='h-14 w-14' src={img} alt="" />
                    </div>
                    <div className='mt-1 ml-2'>
                        <p className='font-bold'>{name}</p>
                        <p>{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;