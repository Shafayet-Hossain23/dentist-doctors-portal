import React from 'react';
import fluoride from '../../../assets/images/fluoride.png'
import cavity from '../../../assets/images/cavity.png'
import whitening from '../../../assets/images/whitening.png'
import Service from './Service';

const Services = () => {
    const servicesData = [
        {
            id: 1,
            name: 'Fluoride Treatment',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: fluoride
        },
        {
            id: 2,
            name: 'Cavity Filling',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: cavity
        },
        {
            id: 3,
            name: 'Teeth Whitening',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: whitening
        },
    ]

    return (
        <div className='mb-10'>
            <div className='text-center'>
                <p className='text-secondary text-xl font-semibold'>OUR SERVICES</p>
                <p className='text-3xl'>Services We Provide</p>
            </div>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 mx-4 mt-14'>
                {
                    servicesData.map(data => <Service
                        key={data.id}
                        data={data}
                    ></Service>)
                }
            </div>
        </div>
    );
};

export default Services;