import { Outlet } from "react-router-dom";

import './MainLogin.css'

function MainLogin(){
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