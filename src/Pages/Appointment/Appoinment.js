import React, { useState } from 'react';

import Calender from './CalenderSection/Calender';
import DiseaseOptions from './DiseaseOptions/DiseaseOptions';

const Appoinment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    return (
        <div>
            <Calender
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></Calender>
            <DiseaseOptions
                selectedDate={selectedDate}

            ></DiseaseOptions>
        </div>
    );
};

export default Appoinment;