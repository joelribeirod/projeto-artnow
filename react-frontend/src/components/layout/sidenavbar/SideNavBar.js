import { useNavigate, Link, useLocation} from "react-router-dom";
import { useEffect, useState } from 'react'
import './SideNavBar.css'

function SideNavBar({isAdmin}){
    const location = useLocation().pathname

    const navigate = useNavigate()

    const [position, setPosition] = useState(false)
    const [positionBg, setPositionBg]= useState(false)
    const [tamanho, setTamanho] = useState(window.innerWidth)
    const [rota, setRota] = useState(0)

    function mudarTamanho() {
        if(!position){
            setPositionBg(true)
            setPosition(true)
        }else if(position){
            setPositionBg(false)
            setPosition(false)
        }
    }

    useEffect(()=>{
        switch (location) {
            case "/mainfeatures":
                setRota(0)
                break;
            case "/mainfeatures/criarpedidos":
                setRota(1)
                break;       
            case "/mainfeatures/meuspedidos":
                setRota(2)
                break;     
            case "/mainfeatures/admprojetos":
                setRota(3)
                break;       
            case "/mainfeatures/criarcategorias":
                setRota(4)
                break;    
            default:
                setRota(3)
                break;
        }
    }, [location, rota])

    useEffect(() => {
        const width = window.innerWidth

        if(width < 768){
            setPositionBg(true)
            setPosition(true)
        }else if(width >= 768){
            setPositionBg(false)
            setPosition(false)
        }

    }, [tamanho])
    
    function atualizarTamanho() {
        setTamanho(window.innerWidth)
    }

    window.addEventListener("resize", atualizarTamanho);

    window.addEventListener("click", (e)=>{
        const hideMainNavBarBg = document.getElementById('mainNavBarBG')

        if(e.target === hideMainNavBarBg){
            setPositionBg(true)
            setPosition(true)
        }
    })

    function deslogar(){
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiraEm')
        navigate('/login/signin')
    }

    function esconderSideNavBar(){
        if(window.innerWidth < 768){
            setPositionBg(true)
            setPosition(true)
        }
        
    }

    return (
        <div id='NavBar'>
            <span className={position ? "hamburguerAtivo material-symbols-outlined" : "hamburguerDesativo material-symbols-outlined"} id="menuHamburguer" onClick={mudarTamanho}>menu</span>
            <div id='mainNavBar' className={position ? 'desativo' : 'ativo'}>
                <Link 
                    to="/mainfeatures" 
                    className={rota === 0 && "rotaAtiva"} 
                    onClick={()=>{esconderSideNavBar()}}>Editar perfil
                </Link>
                <Link 
                    to="/mainfeatures/criarpedidos" 
                    className={rota === 1 && "rotaAtiva"} 
                    onClick={()=>{esconderSideNavBar()}}>Criar um pedido
                </Link>
                <Link 
                    to="/mainfeatures/meuspedidos" 
                    className={rota === 2 && "rotaAtiva"} 
                    onClick={()=>{esconderSideNavBar()}}>Meus pedidos
                </Link>
                <hr className="linha"/>
                {isAdmin === 0 && <div id='admDiv'>
                    <Link 
                        to="/mainfeatures/admprojetos" 
                        className={rota === 3 && "rotaAtiva"} 
                        onClick={()=>{esconderSideNavBar()}}>Visualizar Projetos
                    </Link>
                    <Link 
                        to="/mainfeatures/criarcategorias" 
                        className={rota === 4 && "rotaAtiva"} 
                        onClick={()=>{esconderSideNavBar()}}>Nova Categoria
                    </Link>
                    <hr/>
                </div> }
                <button id='deslogarBtn' onClick={()=>{deslogar()}}>
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                </button>
            </div>
            <div id='mainNavBarBG' className={positionBg ? 'ativarBg' : 'desativarBg'}>

            </div>
        </div>
    )
}

export default SideNavBar