import React, { useEffect } from 'react';
import { Navigate , Outlet, useLocation } from 'react-router-dom';
import { CheckUserExpired } from '../utils/functions';

const Auth = () => {
    const check = localStorage.getItem("token");
    if (check) {
        return true;
    } else {
        return false;
    }
};

export default function ProtectedRoute() {
    const location = useLocation();
    useEffect(() => {
        CheckUserExpired("ProtectedForAdmin");
    }, [location]);
    const isLogin = Auth()

    return !isLogin ? <Navigate to='/login' /> : <Outlet />
}



