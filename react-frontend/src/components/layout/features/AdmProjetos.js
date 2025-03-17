import { useEffect, useState } from "react";

import './AdmProjetos.css'

function AdmProjetos() {
    const token = localStorage.getItem('token')

    const [pedidos, setPedidos] = useState('')
    const [categorias, setCategorias] = useState([])

    useEffect(()=>{
        let promise = fetch('http://localhost:8081/pedidos/admGetAll', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((resp)=>resp.json())

        Promise.resolve(promise).then((resp)=>{
            if(resp.erro){
                console.log('Houve algum erro: ' + resp.erro)
            }else{
                setPedidos(resp)
            }
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            console.log('Requisição finalizada')
        })
    },[token])

    useEffect(()=>{
        fetch('http://localhost:8081/categorias', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(
            (resp)=>resp.json()
        ).then((categorias) =>{
            setCategorias(categorias)
        }).catch((err) => {
            console.log(err)
        })
    },[token])

    function limitarTexto(texto, limite) {
        return texto.length > limite ? texto.substring(0, limite) + "..." : texto;
    };

    return(
        <div id="mainAdmProjetosBg">
            <div id="filtro">
                filtrando...
            </div>
            <div id="mainAdmProjetos">
                
                {pedidos ? (
                    pedidos.map(pedido => (
                        <div className="pedido">
                            <a href={`admprojetos/projeto/${pedido.id}`} className="detalhes">
                                <p className="pedidoDesc">{limitarTexto(pedido.desc, 50)}</p>

                                {pedido.status === 0 ? (
                                    <span className="yellowCircle"></span>
                                ) : pedido.status === 1 ? (
                                    <span className="greenCircle"></span>
                                ) : pedido.status === 2 ? (
                                    <span className="redCircle"></span>
                                ) : pedido.status === 3 ? (
                                    <span className="blueCircle"></span>
                                ) : (
                                    <span className="redCircle">erro</span>
                                )}

                                {categorias.filter(
                                    (categoria) => categoria.id === pedido.categoria
                                ).map((categoria)=>(
                                    <p className="pedidoCateg" key={categoria.nome}>{categoria.nome}</p>
                                ))}
                            </a>
                        </div>
                        
                    ))
                ):(
                    <p id="aviso">Nenhum pedido registrado ainda!</p>
                )}

            </div>
        </div>
    )
}

export default AdmProjetos