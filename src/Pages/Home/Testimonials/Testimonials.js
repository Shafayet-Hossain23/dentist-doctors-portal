import React from 'react';
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import quote from '../../../assets/icons/quote.svg'
import Testimonial from './Testimonial';

const Testimonials = () => {
    const reviews = [
        {
            _id: 1,
            name: 'Winson Herry',
            img: people1,
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            location: 'California'
        },
        {
            _id: 2,
            name: 'Winson Herry',
            img: people2,
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            location: 'California'
        },
        {
            _id: 3,
            name: 'Winson Herry',
            img: people3,
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            location: 'California'
        },
    ]
    return (
        <div className='mb-20'>
            <div className='flex justify-between lg:mx-5 mx-0'>
                <div>
                    <p className='text-secondary text-xl font-semibold'>APPOINMENT</p>
                    <p className='text-3xl'>What Our Patients Says</p>
                </div>
                <div>
                    <img className='h-24 w-24' src={quote} alt="" />
                </div>
            </div>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 mx-4 mt-3'>
                {
                    reviews.map(review => <Testimonial
                        key={review._id}
                        review={review}
                    ></Testimonial>)
                }
            </div>

        </div>
    );
};

export default Testimonials;