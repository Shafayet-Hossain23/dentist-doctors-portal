import React from 'react';
import Banner from './Banner/Banner';
import Connected from './Connected/Connected';
import DentalCare from './DentalCare/DentalCare';
import InfoCards from './InfoCards/InfoCards';
import MakeApponment from './MakeAppoinment/MakeApponment';
import Services from './Services/Services';
import Testimonials from './Testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <DentalCare></DentalCare>
            <MakeApponment></MakeApponment>
            <Testimonials></Testimonials>
            <Connected></Connected>
        </div>
    );
};

export default Home;