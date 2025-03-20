import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import './MainLogin.css'

function MainLogin(){
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(()=>{
        if(token){
            navigate('/mainfeatures/criarpedidos')
        }
    },[token, navigate])
    
    return(
        <div id="main">
            <h2 id="info">Sistema de login</h2>
            <div id="renderizarComponentes">
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLogin