import './LandPage.css'
import NavBar from "../../layout/navbar/NavBar"
import Footer from "../../layout/footer/Footer"

function LandPage(){
    return(
        <>
            <NavBar/>
            <div id='mainLandPage'>
                <h1>Art Now</h1>
                <div id='promise'>
                    <p>Crie pedidos com suas referências e receba em alta velocidade</p>
                </div>
                <a href='/login' id='linkComecar'>
                    Começar
                </a>
                <div id='desc'>
                    <p>O projeto art now tem o intuito de facilitar a criação de artes para seus clientes sem a necessidade de comunicação</p>
                    <p>Peça suas artes conforme a categoria que mais te agrada e receba um aviso quando algum projeto for finalizado</p>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default LandPage