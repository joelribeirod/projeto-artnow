import {useEffect, useState} from 'react'

import './FormPost.css'

function FormPost(){
    const [nome, setNome] = useState()
    const [senha, setSenha] = useState()
    const [email, setEmail] = useState()

    function valores(e){
        e.preventDefault()
        console.log(nome, email, senha)
    }

    return(
        <div id="mainFormPostBG">
            <h3>Criar conta</h3>
            <div id="mainFormPost">
                <form method="post" id="formPost">
                    <label htmlFor="nome">Nome:</label>
                        <input type="text" name="nome" id="inome" required onChange={(e) => {
                            setNome(e.target.value)
                        }}/>
                    <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="iemail" required onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    <label htmlFor="senha">Senha:</label>
                        <input type="password" required onChange={(e) => {
                            setSenha(e.target.value)
                        }}/>
                    <button type="submit" onClick={valores}>Criar conta</button>
                </form>
            </div>
            <p>Já tem uma conta? <a href="/login/signin">Acesse-a agora</a></p>
        </div>
    )
}

export default FormPost