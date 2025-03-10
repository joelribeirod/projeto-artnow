import { useEffect, useState } from 'react'
import './SideNavBar.css'

function SideNavBar({isAdmin}){
    const [position, setPosition] = useState(false)
    const [tamanho, setTamanho] = useState(window.innerWidth)

    function mudarTamanho() {
        if(!position){
            setPosition(true)
        }else if(position){
            setPosition(false)
        }
    }

    useEffect(() => {
        const width = window.innerWidth

        if(width < 768){
            setPosition(true)
        }else if(width > 768){
            setPosition(false)
        }

    }, [tamanho])
    
    function atualizarTamanho() {
        setTamanho(window.innerWidth)
    }

    window.addEventListener("resize", atualizarTamanho);

    return (
        <div id='NavBar' className={position ? 'desativo' : 'ativo'}>
            <span className={position ? "hamburguerAtivo material-symbols-outlined" : "hamburguerDesativo material-symbols-outlined"} id="menuHamburguer" onClick={mudarTamanho}>menu</span>
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