import {Link} from 'react-router-dom'

import './NavBar.css'

function NavBar(){
    return(
        <nav id='navbar'>
            <Link to="/"><h1>Home</h1></Link>
            <Link to="/login">Criar pedidos</Link>
            <Link to="/login/signin">Fazer login</Link>
        </nav>
    )
}

export default NavBar