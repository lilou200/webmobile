
import { createBrowserRouter } from 'react-router-dom';
import { AuthCheck } from '../components/AuthCheck';
import LoginForm from '../components/LoginForm';
import AppLayout from '../layouts/AppLayout';
import AnimalCategoryTable from '../pages/AnimalCategoryTable';
import AvailabilityTable from '../pages/AvailabilityTable';
import CareTable from '../pages/CareTable';
import Home from '../pages/Home';
import OnCallTable from '../pages/OnCallTable';
import UserTable from '../pages/UserTable';
import VeterinarianTable from '../pages/VeterinarianTable';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginForm/>,
    },
    {    
        element: <AppLayout/>,
        children:[
            {
                path: '/',
                element:<AuthCheck><Home /></AuthCheck>
            },
            {
                path: '/user-table',
                element: <AuthCheck><UserTable/></AuthCheck>,
            },
            {
                path: '/care-table',
                element: <AuthCheck><CareTable/></AuthCheck>,
            },
            {
                path: '/animal-category-table',
                element: <AuthCheck><AnimalCategoryTable/></AuthCheck>,
            },
            {
                path: '/veterinarian-table',
                element: <AuthCheck><VeterinarianTable/></AuthCheck>,
            },
            {
                path: '/availability-table',
                element: <AuthCheck><AvailabilityTable/></AuthCheck>,
            },
            {
                path: '/on-call-table',
                element: <AuthCheck><OnCallTable/></AuthCheck>,
            },
        ],
    },
   
]);

export default router;
