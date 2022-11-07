import { Navigate,useLocation } from "react-router-dom"

export default function ProtectedRoute ({element}){
    const isLogin = localStorage.getItem("token");
    const location = useLocation()
    console.log(isLogin)

    if(!isLogin){
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return element
}



