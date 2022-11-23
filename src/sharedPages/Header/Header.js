import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../UserContext/UserContext';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const logoutHandler = () => {
        logOut()
            .then()
            .catch()
    }
    const listItems =
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/appoinment'>Appoinment</Link></li>
            <li><Link to='/reviews'>Reviews</Link></li>
            <li><Link to='/contactUs'>Contact Us</Link></li>

            {
                user?.uid ? <>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li onClick={logoutHandler}><Link>Logout</Link></li>
                </> :
                    <li><Link to='/login'>Login</Link></li>
            }
        </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {listItems}
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl px-0">Doctors Portal</Link>
            </div>
            <div className="navbar-end hidden lg:flex w-2/3">
                <ul className="menu menu-horizontal p-0">
                    {listItems}
                </ul>
            </div>
            <div className='ml-36 lg:ml-0'>
                <label title='Dashboard menu' htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-primary lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Header;