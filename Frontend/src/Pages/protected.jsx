import { Navigate } from "react-router-dom";

const ProtectedRoute=({children})=>{
    const auth = sessionStorage.getItem("auth")
    if (!auth){
        return<Navigate to="/login" replace/>
    }
    return children
}

export default ProtectedRoute;