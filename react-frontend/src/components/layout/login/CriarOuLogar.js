import './CriarOuLogar.css'

function CriarOuLogar(){
    return(
        <div id="redirecionar">
            <p>Você deseja:</p>
            <a href="/login/signup" id='criar'>Criar Conta?</a>
            <a href="/login/signin" id='logar'>Logar Contar?</a>
        </div>
    )
}

export default CriarOuLogar