import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../UserContext/UserContext';

const ErrorPage = () => {
    const error = useRouteError()
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const logoutHandler = () => {
        logOut()
            .then(result => {
                navigate('/login')
            })
            .catch(error => {

            })
    }
    return (
        <div className='w-1/3 mx-auto mt-10 text-center'>
            <h1 className=''>Oops!</h1>
            <p className=''>An unexpected error has occurred</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <h1 className='text-2xl font-semibold'>Please <button className='btn btn-xs' onClick={logoutHandler}>Logout</button> and log in the website again</h1>
        </div>
    );
};

export default ErrorPage;