import {Link} from 'react-router-dom'

import './NavBar.css'
import { useEffect, useState } from 'react'



function NavBar(){
    const token = localStorage.getItem("token")

    const [redirect, setRedirect] = useState(false)

    useEffect(()=>{
        if(!token){
            setRedirect(true)
        }
    }, [token])

    return(
        <nav id='navbar'>
            <Link to="/"><h1>Home</h1></Link>
            {redirect ? (
                <Link to="/login/signin">Criar pedidos</Link>
            ):(
                <Link to="/mainfeatures/">Criar pedidos</Link>
            )}
            
            <Link to="/login/signin">Fazer login</Link>
        </nav>
    )
}

export default NavBar