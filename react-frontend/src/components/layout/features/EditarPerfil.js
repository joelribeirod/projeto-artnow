import { useEffect, useState } from "react";

import './EditarPerfil.css'

function EditarPerfil() {
    const token = localStorage.getItem('token')

    const [user, setUser] = useState('')

    useEffect(()=>{
        fetch('http://localhost:8081/login/user', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((resp)=>resp.json()).then((usuario) =>{
            setUser(usuario)
        }).catch((err) => {
            console.log(err)
        })
    },[])

    return (
        <div id="editPerfil">
            <h1>Seu perfil:</h1>
            <div id="editPerfilForm">
                <label htmlFor="inome">Nome: </label>
                    <input type="text" id="inome" disabled placeholder={user.nome}/>
                <label htmlFor="iemail">Email: </label>
                    <input type="email" id="iemail" disabled placeholder={user.email}/>
                <label htmlFor="isenha">Senha: </label>
                    <input type="password" id="isenha" disabled value={'dezdigitos'}/>
            </div>
            <div id="editPerfilBtns">
                <button>Editar dados</button>
                <button>Deletar conta</button>
            </div>
        </div>
    )
}

export default EditarPerfil