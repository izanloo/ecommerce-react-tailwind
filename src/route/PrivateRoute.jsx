import React, { useEffect } from 'react';
import { Navigate , Outlet, useLocation } from 'react-router-dom';
import { CheckUserExpired } from '../utils/functions'

const useAuth = () => {
  const user = localStorage.getItem("token");
  if (user) {
    return true;
  } else {
    return false;
  }
};

const PrivateRoute = () => {
    const location = useLocation();
    useEffect(() => {
        CheckUserExpired("Private");
    },[location]);
  const auth = useAuth();
  return auth ? <Navigate to="/paneladmin" />: <Outlet/>
};

export default PrivateRoute;