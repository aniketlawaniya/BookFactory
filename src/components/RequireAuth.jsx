import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../store/data/AuthContext";


function RequireAuth() {
    const location=useLocation();
    const {token}=useAuth();
    return token?<Outlet/>:<Navigate to="/login" state={{from:location}} replace></Navigate>
}

export  {RequireAuth}
