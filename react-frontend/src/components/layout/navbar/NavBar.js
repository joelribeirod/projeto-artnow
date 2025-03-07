import './NavBar.css'

function NavBar(){
    return(
        <nav id='navbar'>
            <a href="/"><h1>Home</h1></a>
            <a href="/login">Criar pedidos</a>
            <a href="/login/signin">Fazer login</a>
        </nav>
    )
}

export default NavBar