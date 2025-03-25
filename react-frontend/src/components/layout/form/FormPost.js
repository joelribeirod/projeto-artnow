import {useState} from 'react'
import { useNavigate, Link } from "react-router-dom"

import './FormPost.css'
import Loading from '../../loading/Loading'

function FormPost(){
    const [nome, setNome] = useState()
    const [erroNome, setErroNome] = useState()

    const [senha, setSenha] = useState()
    const [erroSenha, setErroSenha] = useState()

    const [email, setEmail] = useState()
    const [erroEmail, setErroEmail] = useState()

    const [tipoInput, setTipoInput] = useState('password')

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function cadastrarUser(e){
        const inputNome = document.getElementById('inome')
        const inputEmail = document.getElementById('iemail')
        const inputSenha = document.getElementById('isenha')
        console.log(inputNome)
        e.preventDefault()

        const FormErr = []

        

        if(!nome || nome === null || nome === undefined){
            setErroNome("Formato do nome incorreto")
            inputNome.classList.add('erro')
            FormErr.push({erro: "Formato do nome incorreto"})
        }

        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!email || email === null || email === undefined || !regex.test(email)){
            setErroEmail("Formato do email incorreto")
            inputEmail.classList.add('erro')
            FormErr.push({erro: "Formato do email incorreto"})
        }

        if(!senha || senha === null || senha === undefined || senha.length < 4){
            setErroSenha("Senha muito curta, minimo 4 digitos")
            inputSenha.classList.add('erro')
            FormErr.push({erro: "Formato da senha incorreto"})
        }

        if(FormErr.length > 0){
            console.log(FormErr)
            return false
        }

        const usuario = {
            email: email,
            nome: nome,
            senha: senha
        }

        setLoading(true)

        let promise = await fetch('https://projeto-artnow.onrender.com/login/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(usuario)
        }).then((resp) => 
            resp.json()
        )

        Promise.resolve(promise).then((data)=>{
            if(data.success){
                navigate('/login/signin')
            }else if(data.error){
                if(data.error === 'nome'){
                    setErroNome("Esse nome ja existe!")
                    inputNome.classList.add('erro')
                }else if(data.error === 'email'){
                    setErroEmail("Esse email ja existe")
                    inputEmail.classList.add('erro')
                }else{
                    window.alert('Ocorreu algum erro no sistema: ', data.error)
                }
               
            }
        }).catch((err) => {
            console.log(err)
        }).finally(()=> setLoading(false))
    }

    return(
        <div id="mainFormPostBG">
            {loading && <Loading/>}
            <h3>Criar conta</h3>
            <div id="mainFormPost">
                <form method="post" id="formPost">
                    <label htmlFor="nome">Nome:</label>
                        <input type="text" name="nome" id="inome" required onChange={(e) => {
                            setNome(e.target.value)
                            setErroNome('')
                            e.target.classList.remove('erro')
                        }}/>
                        {erroNome && <p className='erroDigN'>{erroNome}</p>}
                    <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="iemail" required onChange={(e) => {
                            setEmail(e.target.value)
                            setErroEmail('')
                            e.target.classList.remove('erro')
                        }}/>
                        {erroEmail && <p className='erroDigE'>{erroEmail}</p>}
                    <label htmlFor="senha">Senha:</label>
                        <input type={tipoInput} id='isenha' required onChange={(e) => {
                            setSenha(e.target.value)
                            setErroSenha('')
                            e.target.classList.remove('erro')

                        }}
                        />
                        {erroSenha && <p className='erroDigS'>{erroSenha}</p>}
                    <div id="visualizarSenhaPOST" onClick={()=>{
                        const alterarVisibilidade = document.getElementById('alterarVisibilidade')
                        const ver = document.getElementById('ver')

                        if(alterarVisibilidade.textContent === 'visibility'){
                            alterarVisibilidade.textContent = 'visibility_off'
                            ver.textContent = 'Esconder senha'
                            setTipoInput('text')
                        }else if(alterarVisibilidade.textContent === 'visibility_off'){
                            alterarVisibilidade.textContent = 'visibility'
                            ver.textContent = 'Ver senha'
                            setTipoInput('password')
                        }
                    }}>
                        <div id="corrigirError">
                            <span className="material-symbols-outlined" id="alterarVisibilidade">visibility</span>
                            <p id="ver">Ver senha</p>
                        </div>
                    </div>
                    <button type="submit" onClick={cadastrarUser}>Criar conta</button>
                </form>
            </div>
            
            <p>Já tem uma conta? <Link to="/login/signin">Acesse-a agora</Link></p>
        </div>
    )
}

export default FormPost