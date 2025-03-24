import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import SideNavBar from '../../layout/sidenavbar/SideNavBar'
import './MainFeatures.css'

function MainFeatures(){
    const navigate = useNavigate()

    const [isAdmin, setIsAdmin] = useState()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const expirou = localStorage.getItem('tokenExpiraEm')

        if(!token){
            navigate('/login/signin')
        }else{
            const payload = JSON.parse(atob(token.split(".")[1]))
            setIsAdmin(payload.isAdmin)
        }

        if(expirou < Date.now()){
            localStorage.removeItem('token')
            localStorage.removeItem('tokenExpiraEm')
            navigate('/login/signin')
        }
    },[navigate])

    return(
        <div id='mainFeatures'>
            <SideNavBar isAdmin={isAdmin}/>
            <div id='renderizarComponentesFeatures'>
                <Outlet/>
            </div>
            {/*  */}
        </div>
    )
}

export default MainFeatures