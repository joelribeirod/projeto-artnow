import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"

import './FormPost.css'

function FormPost(){
    const [nome, setNome] = useState()
    const [senha, setSenha] = useState()
    const [email, setEmail] = useState()
    const navigate = useNavigate()

    async function cadastrarUser(e){
        e.preventDefault()

        if(!nome || nome === null || nome === undefined){
            window.alert("formato do nome incorreto")
            return false
        }


        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!email || email === null || email === undefined || !regex.test(email.value)){
            window.alert("formato do email incorreto")
            return false
        }

        if(!senha || senha === null || senha === undefined || senha.lenght < 4){
            window.alert("formato da senha incorreto")
            return false
        }

        const usuario = {
            email: email,
            nome: nome,
            senha: senha
        }

        await fetch('http://localhost:8081/login/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(usuario)
        }).then((resp) => 
            resp.json()
        ).then((data)=>{
            if(data.success){
                window.alert(data.success)
                navigate('/login/signin')
            }else if(data.err){
                window.alert(data.err)
            }
        }).catch((err) => {
            console.log(err)
        })
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
                    <button type="submit" onClick={cadastrarUser}>Criar conta</button>
                </form>
            </div>
            <p>Já tem uma conta? <a href="/login/signin">Acesse-a agora</a></p>
        </div>
    )
}

export default FormPost