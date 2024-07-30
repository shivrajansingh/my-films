import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import AuthHeader from "./template/AuthHeader"
import AuthFooter from "./template/AuthFooter"
import { useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate(); 
  useEffect(()=>{
    let user = localStorage.getItem('user'); 
    if(user){
      navigate("/")
    }
  }, [navigate]);
  return (
    <>
      <AuthHeader/>
        <Outlet/>
      <AuthFooter/>
    </>
  )
}
