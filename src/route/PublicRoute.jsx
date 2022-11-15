
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const useAuth = () => {
  const user = localStorage.getItem("token");
  if (user) {
    return true;
  } else {
    return false;
  }
};

const PublicRoute = ({element}) => {
  const auth = useAuth();
  return auth ? <Navigate to="/paneladmin" />: element
};

export default PublicRoute;