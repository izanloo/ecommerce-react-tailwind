import { Navigate,useLocation } from "react-router-dom"

export default function ProtectedRoute ({element}){
    const isLogin = localStorage.getItem("token");
    const location = useLocation()

    if(!isLogin){
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return element
}



