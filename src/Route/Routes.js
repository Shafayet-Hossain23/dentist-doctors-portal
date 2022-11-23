import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Components/ErrorPage";
import DashbordLayout from "../Layout/DashbordLayout";
import Main from "../Layout/Main";
import About from "../Pages/About/About";
import Appoinment from "../Pages/Appointment/Appoinment";
import ContactUs from "../Pages/Contact/ContactUs";
import AddADoctor from "../Pages/Dashboard/AddADoctor";
import Allusers from "../Pages/Dashboard/Allusers";
import Dashbord from "../Pages/Dashboard/Dashbord";
import ManageDoctors from "../Pages/Dashboard/ManageDoctors";
import MyAppoinment from "../Pages/Dashboard/MyAppoinment";
import Payment from "../Pages/Dashboard/Payment";
import Home from "../Pages/Home/Home";
import Reviews from "../Pages/Reviews/Reviews";
import Login from "../signInUp/Login";
import Register from "../signInUp/Register";
import PrivateAdmin from "./PrivateAdmin";
import PrivateRoute from "./PrivateRoute";



export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/appoinment',
                element: <PrivateRoute><Appoinment></Appoinment></PrivateRoute>
            },
            {
                path: '/reviews',
                element: <Reviews></Reviews>
            },
            {
                path: '/contactUs',
                element: <PrivateRoute><ContactUs></ContactUs></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashbordLayout></DashbordLayout></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppoinment></MyAppoinment>
            },
            {
                path: '/dashboard/allusers',
                element: <PrivateAdmin><Allusers></Allusers></PrivateAdmin>
            },
            {
                path: '/dashboard/addDoctor',
                element: <PrivateAdmin><AddADoctor></AddADoctor></PrivateAdmin>
            },
            {
                path: '/dashboard/manageDoctors',
                element: <PrivateAdmin><ManageDoctors></ManageDoctors></PrivateAdmin>
            },
            {
                path: 'dashboard/payment/:id',
                loader: ({ params }) => {
                    return fetch(`https://doctors-portal-server-sand.vercel.app/bookings/${params.id}`)
                },
                element: <Payment></Payment>
            },
        ]
    }
])