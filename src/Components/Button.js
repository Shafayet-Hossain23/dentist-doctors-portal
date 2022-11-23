import React from 'react';

const Button = ({ children }) => {
    return (
        <div>
            <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary">{children}</button>
        </div>
    );
};

export default Button;