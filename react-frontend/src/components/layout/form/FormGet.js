import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"

import Loading from '../../loading/Loading'

import './FormGet.css'

function FormGet(){
    const [nome, setNome] = useState()
    const [erroNome, setErroNome] = useState()

    const [senha, setSenha] = useState()
    const [erroSenha, setErroSenha] = useState()

    const [tipoInput, setTipoInput] = useState('password')

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    function manipularToken(data) {
        const token = data.token
        localStorage.setItem("token", token)
        const expiraEm = Date.now() + data.duracaoToken * 1000;
        localStorage.setItem("tokenExpiraEm", expiraEm);

        navigate('/mainfeatures')
    }

    async function resgatarUsuario(e){
        e.preventDefault()
        const inputNome = document.getElementById('inome')
        const inputSenha = document.getElementById('isenha')

        const FormErr = []

        if(!nome || nome === null || nome === undefined){
            setErroNome("Preencha este campo corretamente")
            inputNome.classList.add('erro')
            FormErr.push({erro: "Formato do nome incorreto"})
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
            nome: nome,
            senha: senha
        }

        setLoading(true)

        let promise = await fetch('https://projeto-artnow.onrender.com/login/signin', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(usuario)
        }).then((resp) => 
            resp.json()
        )

        Promise.resolve(promise).then((data)=>{
            if(data.erro){
                inputNome.classList.add('erro')
                inputSenha.classList.add('erro')
                setErroSenha('Credenciais incorretas')
            }else if(data.success){
                manipularToken(data)
            }
        }).catch((err) => {
            console.log(err)
        }).finally(()=> setLoading(false))


    }


    return(
        <div id='mainFormGetBG'>
            {loading && <Loading />}
            <h3>Logar conta</h3>
            <div id='mainFormGet'>
                <form method="get" id='formGet'>
                    <label htmlFor="nome">Nome:</label>
                        <input type="text" name="nome" id="inome" required onChange={(e)=>{
                            setNome(e.target.value)
                            setErroNome('')
                            e.target.classList.remove('erro')
                        }}/>
                        {erroNome && <p className='erroN'>{erroNome}</p>}
                    <label htmlFor="senha">Senha:</label>
                        <input type={tipoInput} id='isenha' required onChange={(e)=>{
                            setSenha(e.target.value)
                            setErroSenha('')
                            e.target.classList.remove('erro')
                        }}/>
                        {erroSenha && <p className='erroS'>{erroSenha}</p>}
                    <div id="visualizarSenhaGET">
                        <div id="corrigirProblema" onClick={()=>{
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
                            <span className="material-symbols-outlined" id="alterarVisibilidade">visibility</span>
                            <p id="ver">Ver senha</p>
                        </div>
                    </div>
                    <button type="submit" onClick={resgatarUsuario}>Logar</button>
                </form>
            </div>
            
            <p>Não tem uma conta? <Link to="/login/signup">Crie uma agora</Link></p>
        </div>
    )
}

export default FormGet