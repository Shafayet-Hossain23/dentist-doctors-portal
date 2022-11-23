import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../Components/useAdmin';
import Header from '../sharedPages/Header/Header';
import { AuthContext } from '../UserContext/UserContext';

const DashbordLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    return (
        <div className='lg:mx-12 mx-4'>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* <!-- Page content here --> */}
                    <Outlet></Outlet>
                    {/* <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><Link to='/dashboard'>My appoinment</Link></li>
                        {isAdmin && <>
                            <li><Link to='/dashboard/allusers'>All Users</Link></li>
                            <li><Link to='/dashboard/addDoctor'>Add A Doctor</Link></li>
                            <li><Link to='/dashboard/manageDoctors'>Manage Doctors</Link></li>
                        </>}
                    </ul>

                </div>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default DashbordLayout;