import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom"

export default function VerifyRoute() {
  const token = Cookies.get('notvalid')
  
    return !token ? <Navigate to='/auth' /> : <Outlet /> 
}
