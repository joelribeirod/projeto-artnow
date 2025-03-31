import { Link } from 'react-router-dom'

import './LandPage.css'
import NavBar from "../../layout/navbar/NavBar"
import Footer from "../../layout/footer/Footer"

function LandPage(){
    return(
        <>
            <NavBar/>
            <div id='mainLandPage'>
                <div id='teste'></div>
                <h1>Art Now</h1>
                <div id='promise'>
                    <p>Crie pedidos com suas referências e os receba em pouco tempo</p>
                </div>
                <Link to={"/login/signup"} id='linkComecar'>Começar</Link>
                <div id='desc'>
                    <p>O projeto art now tem o intuito de facilitar a criação de artes para seus clientes sem a necessidade de comunicação.</p>
                    <p>Peça suas artes conforme a categoria que mais te agrada e receba um aviso quando algum projeto for finalizado.</p>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default LandPage