import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import './EditarPerfil.css'
import Loading from "../../loading/Loading";

function EditarPerfil() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [user, setUser] = useState('')

    const [editarDados, setEditarDados] = useState(false)

    const [newSenha, setNewSenha] = useState('dezdigitos')
    const [newNome, setNewNome] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const [del, setDel] = useState(false)
    const [inputDel, setInputDel] = useState(false)
    const [senhaDel, setSenhaDel] = useState('')

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)

        let promise = fetch(`${process.env.REACT_APP_API_URL}/login/user`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((resp)=>resp.json())

        Promise.resolve(promise).then((usuario) =>{
            setUser(usuario)
        }).catch((err) => {
            console.log(err)
        }).finally(()=> setLoading(false))
    },[token])

    function edit(){
        const inome = document.getElementById('inome')
        document.getElementById('iemail').removeAttribute('disabled')
        document.getElementById('isenha').removeAttribute('disabled')

        inome.removeAttribute('disabled')
        inome.focus()
    }

    function cancelEdit(){
        document.getElementById('inome').setAttribute('disabled', true)
        document.getElementById('iemail').setAttribute('disabled', true)
        document.getElementById('isenha').setAttribute('disabled', true)

        setNewNome('')
        setNewEmail('')
        setNewSenha('dezdigitos')
    }

    async function salvarEdit() {
        const dados = {}

        if(newSenha !== 'dezdigitos'){
            if(newSenha.length < 4){
                window.alert('Senha não pode ser menor que 4 digitos')
                return null
            }

            dados['senha'] = newSenha            
        }

        if(newNome){
            dados['nome'] = newNome
        }

        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(newEmail ){
            if(!regex.test(newEmail)){
                window.alert('formato incorreto de email')
                return null
            }

            dados['email'] = newEmail
        }

        if(Object.keys(dados).length < 1){
            window.alert('nenhum dado editado')
            return null
        }

        setLoading(true)
        
        let promise = await fetch(`${process.env.REACT_APP_API_URL}/login/edituser/${user.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        }).then((resp) => resp.json())

        Promise.resolve(promise).then(
            window.location.reload()
        ).catch((err)=>{
            console.log(err)
        }).finally(()=> setLoading(false))

    }

    async function deletarConta() {
        const senha = {
            senha: senhaDel
        }

        setLoading(true)

        let promise = await fetch(`${process.env.REACT_APP_API_URL}/login/deleteuser/${user.id}`, {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(senha)
        }).then((resp)=>resp.json())

        Promise.resolve(promise).then((resp)=>{
            if(resp.erro){
                window.alert('Credenciais incorretas')
            }else {
                localStorage.removeItem('token')
                localStorage.removeItem('tokenExpiraEm')
                navigate('/login/signin')
            }
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    }

    return (
        <div id="editPerfil">
            {loading && <Loading/>}
            <h1>Seu perfil:</h1>
            <div id="editPerfilForm">
                <label htmlFor="inome">Nome: </label>
                    <input
                        type="text"
                        id="inome" 
                        disabled 
                        placeholder={user.nome} 
                        value={newNome} 
                        onChange={(e)=>(setNewNome(e.target.value))}
                    />
                <label htmlFor="iemail">Email: </label>
                    <input
                        type="email"
                        id="iemail" 
                        disabled 
                        placeholder={user.email} 
                        value={newEmail} 
                        onChange={(e)=>(setNewEmail(e.target.value))}
                    />
                <label htmlFor="isenha">Senha: </label>
                    <input
                        type="password"
                        id="isenha" 
                        disabled 
                        value={newSenha} 
                        onChange={(e)=>(setNewSenha(e.target.value))}
                    />
            </div>
            <div id="editPerfilBtns">
                {editarDados ? (
                    <div id="editBtns">
                        <button onClick={()=>{
                            salvarEdit()
                        }}>Salvar</button>
                        <button onClick={()=>{
                            setEditarDados(false)
                            cancelEdit()
                        }}>Cancelar</button>
                    </div>
                ) : (
                    <button onClick={()=>{
                        setEditarDados(true)
                        edit()
                        
                    }}>Editar dados</button>
                )}

                {del ? (
                    <button onClick={()=>{
                        setInputDel(true)
                        setDel(false)
                    }}>deseja mesmo deletar sua conta?</button>
                ): inputDel ? (
                    <div id="delDiv">
                        <p>Digite sua senha: </p>
                        <input type="password" onChange={(e)=>(setSenhaDel(e.target.value))}/>
                        <div>
                            <button onClick={()=>{
                                deletarConta()
                            }}>Deletar</button>
                            <button onClick={()=>{
                                setInputDel(false)
                                setDel(false)
                            }}>Cancelar</button>
                        </div>
                    </div>          
                ) : (
                    <button onClick={()=>{setDel(true)}}>
                        Deletar conta
                    </button> 
                )}
                
                
                
            </div>
        </div>
    )
}

export default EditarPerfil