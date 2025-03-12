import './MeusPedidos.css'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

function MeusPedidos() {
    const imgAdicionar = require("../../../imgs/mais.png")

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    const [pedidoUm, setPedidoUm] = useState()
    const [pedidoDois, setPedidoDois] = useState()

    useEffect(()=>{
        let promise = fetch('http://localhost:8081/pedidos', {
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        Promise.resolve(promise).then((resp)=>{
            console.log(resp)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            console.log("Fetch realizado")
        })
    }, [])

    return(
        <div id='mainPedidos'>
            <div className='divPedido'>
                {pedidoUm ? (
                    <p>teste</p>
                ) : (
                    <div className='divRedirect' onClick={()=>{navigate('/mainfeatures/criarpedidos')}}>
                        <p>Nenhum projeto adicionado ainda!</p>
                        <img src={imgAdicionar} alt="" />               
                        <p>Clique aqui para adicionar um projeto</p>
                    </div>
                )}
                
            </div>
            <div className='divPedido' onClick={()=>{navigate('/mainfeatures/criarpedidos')}}>
                <div className='divRedirect'>
                    <p>Nenhum projeto adicionado ainda!</p>
                    <img src={imgAdicionar} alt="" />               
                    <p>Clique aqui para adicionar um projeto</p>
                </div>
            </div>
        </div>
    )
}

export default MeusPedidos