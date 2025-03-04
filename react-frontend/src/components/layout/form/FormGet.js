import {useEffect, useState} from 'react'

import './FormGet.css'

function FormGet(){
    const [nome, setNome] = useState()
    const [senha, setSenha] = useState()

    function valores(e){
        e.preventDefault()
        console.log(nome,senha)
    }


    return(
        <div id='mainFormGetBG'>
            <h3>Logar contar</h3>
            <div id='mainFormGet'>
                <form method="get" id='formGet'>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" name="nome" id="inome" required onChange={(e)=>{setNome(e.target.value)}}/>
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" required onChange={(e)=>{setSenha(e.target.value)}}/>
                    <button type="submit" onClick={valores}>Logar</button>
                </form>
            </div>
            <p>Não tem uma conta? <a href="/login/signup">Crie uma agora</a></p>
        </div>
    )
}

export default FormGet