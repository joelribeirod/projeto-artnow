import { useEffect, useState } from 'react'
import './SideNavBar.css'

function SideNavBar({isAdmin}){
    const [position, setPosition] = useState(false)
    const [positionBg, setPositionBg]= useState(false)
    const [tamanho, setTamanho] = useState(window.innerWidth)

    function mudarTamanho() {
        if(!position){
            setPositionBg(true)
            setPosition(true)
        }else if(position){
            setPositionBg(false)
            setPosition(false)
        }
    }

    useEffect(() => {
        const width = window.innerWidth

        if(width < 768){
            setPositionBg(true)
            setPosition(true)
        }else if(width > 768){
            setPositionBg(false)
            setPosition(false)
        }

    }, [tamanho])
    
    function atualizarTamanho() {
        setTamanho(window.innerWidth)
    }

    window.addEventListener("resize", atualizarTamanho);

    window.addEventListener("click", (e)=>{
        const teste = document.getElementById('mainNavBarBG')

        if(e.target === teste){
            setPositionBg(true)
            setPosition(true)
        }
    })

    return (
        <div id='NavBar'>
            <span className={position ? "hamburguerAtivo material-symbols-outlined" : "hamburguerDesativo material-symbols-outlined"} id="menuHamburguer" onClick={mudarTamanho}>menu</span>
            <div id='mainNavBar' className={position ? 'desativo' : 'ativo'}>
                
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
            <div id='mainNavBarBG' className={positionBg ? 'ativarBg' : 'desativarBg'}>

            </div>
        </div>
    )
}

export default SideNavBar