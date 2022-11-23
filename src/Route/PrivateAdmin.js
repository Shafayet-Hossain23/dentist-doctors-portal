import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Components/Loading';
import useAdmin from '../Components/useAdmin';
import { AuthContext } from '../UserContext/UserContext';

const PrivateAdmin = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    const [isAdmin, adminLoading] = useAdmin(user?.email)
    if (loading || adminLoading) {
        return <Loading></Loading>
    }
    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateAdmin;