import React from 'react';



const DiseaseOption = ({ data, setTreatment }) => {
    const { name, slots, price } = data
    return (
        <div className="card  shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>
                    {
                        slots.length > 0 ? slots[0] : "Try Another Day"
                    }
                </p>
                <p>
                    {slots.length} {slots.length > 1 ? "spaces" : "space"} available
                </p>
                <p>
                    price: <span className='text-secondary font-medium'>${price}</span>
                </p>
                {/* <div className="card-actions">
                    <Button>BOOK APPOINMENT</Button>
                </div> */}
                <div>
                    <label
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(data)}
                        htmlFor="booking-modal"
                        className="btn btn-primary">BOOK APPOINMENT
                    </label>
                </div>
            </div>
        </div>
    );
};

export default DiseaseOption;