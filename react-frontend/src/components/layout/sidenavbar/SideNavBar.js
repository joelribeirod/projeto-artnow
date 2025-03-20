import { useNavigate, Link} from "react-router-dom";
import { useEffect, useState } from 'react'
import './SideNavBar.css'

function SideNavBar({isAdmin}){
    const navigate = useNavigate()

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

    function deslogar(){
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiraEm')
        navigate('/login/signin')
    }

    return (
        <div id='NavBar'>
            <span className={position ? "hamburguerAtivo material-symbols-outlined" : "hamburguerDesativo material-symbols-outlined"} id="menuHamburguer" onClick={mudarTamanho}>menu</span>
            <div id='mainNavBar' className={position ? 'desativo' : 'ativo'}>
                <Link to="/mainfeatures">Editar perfil</Link>
                <Link to="/mainfeatures/criarpedidos">Criar um pedido</Link>
                <Link to="/mainfeatures/meuspedidos">Meus pedidos</Link>
                <hr/>
                {isAdmin === 0 && <div id='admDiv'>
                    <Link to="/mainfeatures/admprojetos">Visualizar Projetos</Link>
                    <Link to="/mainfeatures/criarcategorias">Nova Categoria</Link>
                    <hr/>
                </div> }
                <button id='deslogarBtn' onClick={()=>{
                    deslogar()
                }}>Deslogar</button>
            </div>
            <div id='mainNavBarBG' className={positionBg ? 'ativarBg' : 'desativarBg'}>

            </div>
        </div>
    )
}

export default SideNavBar