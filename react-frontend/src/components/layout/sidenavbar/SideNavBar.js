import './SideNavBar.css'

function SideNavBar({isAdmin}){
    return (
        <div id='NavBar'>
            <a href="/mainfeatures">Editar perfil</a>
            <a href="/mainfeatures/criarpedidos">Criar um pedido</a>
            <a href="/mainfeatures/meuspedidos">Meus pedidos</a>
            <hr/>
            {isAdmin === 0 && <div id='admDiv'>    
                <a href="/mainfeatures/admprojetos">Visualizar Projetos</a>
                <a href="/mainfeatures/criarcategorias">Nova Categoria</a>
                <hr/>
            </div> }
            <button id='deslogarBtn'>Deslogar</button>
        </div>
    )
}

export default SideNavBar