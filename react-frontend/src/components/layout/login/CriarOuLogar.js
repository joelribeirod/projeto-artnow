import './CriarOuLogar.css'
import { Link } from 'react-router-dom'

function CriarOuLogar(){
    return(
        <div id="redirecionar">
            <p>Você deseja:</p>
            <Link to="/login/signup" id='criar'>Criar Conta?</Link>
            <Link to="/login/signin" id='logar'>Logar Contar?</Link>
        </div>
    )
}

export default CriarOuLogar