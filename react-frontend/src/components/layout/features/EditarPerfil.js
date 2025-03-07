import { useEffect, useState } from "react";

import './EditarPerfil.css'

function EditarPerfil() {

    return (
        <div id="editPerfil">
            <h1>Seu perfil:</h1>
            <div id="editPerfilForm">
                <label htmlFor="inome">Nome: </label>
                    <input type="text" id="inome" disabled/>
                <label htmlFor="iemail">Email: </label>
                    <input type="email" id="iemail" disabled/>
                <label htmlFor="isenha">Senha: </label>
                    <input type="email" id="isenha" disabled/>
            </div>
            <div id="editPerfilBtns">
                <button>Editar dados</button>
                <button>Deletar conta</button>
            </div>
        </div>
    )
}

export default EditarPerfil