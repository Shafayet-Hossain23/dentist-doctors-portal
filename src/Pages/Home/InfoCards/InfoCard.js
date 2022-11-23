import React from 'react';

const InfoCard = ({ data }) => {
    const { id, name, description, icon, bgClass } = data
    return (
        <div className={`card card-side text-white pl-5 shadow-xl ${bgClass}`}>
            <figure><img src={icon} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;