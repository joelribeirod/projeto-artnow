import './MeusPedidos.css'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

function MeusPedidos() {
    const imgAdicionar = require("../../../imgs/mais.png")

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    const [pedidoUm, setPedidoUm] = useState()
    const [pedidoDois, setPedidoDois] = useState()
    const [categorias, setCategorias] = useState([])
    const [confirmDelUm, setConfirmDelUm] = useState(false)
    const [confirmDelDois, setConfirmDelDois] = useState(false)

    useEffect(()=>{
        let promise = fetch('http://localhost:8081/pedidos', {
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((resp)=>resp.json())

        Promise.resolve(promise).then((resp)=>{
            setPedidoUm(resp.pedidos[0])
            setPedidoDois(resp.pedidos[1])
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            console.log("Fetch realizado")
        })
    }, [token])

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

    function deletarProjeto(project) {
        if(project === 'um'){
            let promise = fetch(`http://localhost:8081/pedidos/${pedidoUm.id}`,{
                method: "DELETE",
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(
                (resp)=>resp.json()
            )

            Promise.resolve(promise).then(
                window.location.reload()
            ).catch((err)=>{
                console.log("Erro ao realizar a requisição: " + err)
            }).finally(()=>{
                console.log('Requisição iniciada')
            })

        }else if(project === 'dois'){
            let promise = fetch(`http://localhost:8081/pedidos/${pedidoDois.id}`,{
                method: "DELETE",
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(
                (resp)=>resp.json()
            )

            Promise.resolve(promise).then(
                window.location.reload()
            ).catch((err)=>{
                console.log("Erro ao realizar a requisição: " + err)
            }).finally(()=>{
                console.log('Requisição finalizada')
            })
        }
    }

    return(
        <div id='mainPedidos'>
            <div className='divPedido'>
                {pedidoUm ? (
                    <div className='mainDivPedido'>
                        <h1>Pedido 1</h1>
                        <div className='infoPedido'>
                            <div className="infoDesc">
                                <h3>Descrição: </h3>
                                <p>{pedidoUm.desc}</p>
                            </div>
                            <div className='infoCategoria'>
                                <h3>Categoria: </h3>
                                {categorias.filter(
                                    (categoria) => categoria.id === pedidoUm.categoria
                                ).map((categoria)=>(
                                    <p key={categoria.nome}>{categoria.nome}</p>
                                ))}
                            </div>
                            <div className='infoStatus'>
                                <h3>Status: </h3>
                                {pedidoUm.status === 0 ? (    
                                    <div>
                                        <div className='circle yellowStatus'></div>
                                        <p>Em andamento</p>
                                    </div>
                                ) : pedidoUm.status === 1 ? (
                                    <div>
                                        <span className='circle greenStatus'></span>
                                        <p>Concluido</p>
                                    </div>
                                ) : pedidoUm.status === 2 ? (
                                    <div>
                                        <span className='circle redStatus'></span>
                                        <p>Pedido recusado</p>
                                    </div>
                                ) : pedidoUm.status === 3 ? (
                                    <div>
                                        <span className='circle blueStatus'></span>
                                        <p>Aguardando pagamento</p>
                                    </div>
                                ) : (
                                    <div>
                                        <span className='circle redStatus'></span>
                                        <p>Erro ao resgatar o status</p>
                                    </div>
                                )}
                            </div>
                            <div className='infoRefs'>
                                <h3>Referências: </h3>
                                {pedidoUm.ref1 ? (
                                    <div>
                                        <img src={pedidoUm.ref1} alt="" />
                                        {pedidoUm.ref2 && <img src={pedidoUm.ref2} alt="" />}
                                    </div> 
                                ):(
                                    <p>Sem referências</p>
                                )}
                                
                                
                            </div>
                        </div>
                        <div className='pedidosBtns'>
                            {confirmDelUm ? (
                                <p id='delP1' onClick={()=>{deletarProjeto('um')}}>
                                    Deseja mesmo cancelar o pedido?
                                </p>
                            ) : (
                                <div>
                                    {pedidoUm.status === 0 ? (
                                        <p onClick={()=>{setConfirmDelUm(true)}}>
                                            <span className="material-symbols-outlined">delete</span> Cancelar Pedido
                                        </p>
                                    ) : pedidoUm.status === 1 ? (
                                        <p onClick={()=>{setConfirmDelUm(true)}}>
                                            Apagar
                                        </p>
                                    ) : pedidoUm.status === 2 ? (
                                        <p> 
                                            {/* api de pagamento */}
                                            <abbr title="Realize o pagamento para receber o pedido">Realizar Pagamento</abbr>
                                        </p>
                                    ) : (
                                        <p onClick={()=>{setConfirmDelUm(true)}}>
                                            Apagar
                                        </p>
                                    )} 
                                </div>
                            )}  
                            
                        </div>
                    </div>
                ) : (
                    <div className='divRedirect' onClick={()=>{navigate('/mainfeatures/criarpedidos')}}>
                        <p>Nenhum projeto adicionado ainda!</p>
                        <img src={imgAdicionar} alt="" />               
                        <p>Clique aqui para adicionar um projeto</p>
                    </div>
                )}
                
            </div>
            <div className='divPedido' >
                {pedidoDois ? (
                    <div className='mainDivPedido'>
                        <h1>Pedido 2</h1>
                        <div className='infoPedido'>
                            <div className="infoDesc">
                                <h3>Descrição: </h3>
                                <p>{pedidoDois.desc}</p>
                            </div>
                            <div className='infoCategoria'>
                                <h3>Categoria: </h3>
                                {categorias.filter(
                                    (categoria) => categoria.id === pedidoDois.categoria
                                ).map((categoria)=>(
                                    <p key={categoria.nome}>{categoria.nome}</p>
                                ))}
                            </div>
                            <div className='infoStatus'>
                                <h3>Status: </h3>
                                {pedidoDois.status === 0 ? (    
                                    <div>
                                        <div className='circle yellowStatus'></div>
                                        <p>Em andamento</p>
                                    </div>
                                ) : pedidoDois.status === 1 ? (
                                    <div>
                                        <span className='circle greenStatus'></span>
                                        <p>Concluido</p>
                                    </div>
                                ) : pedidoDois.status === 2 ? (
                                    <div>
                                        <span className='circle redStatus'></span>
                                        <p>Pedido recusado</p>
                                    </div>
                                ) : pedidoDois.status === 3 ? (
                                    <div>
                                        <span className='circle blueStatus'></span>
                                        <p>Aguardando pagamento</p>
                                    </div>
                                ) : (
                                    <div>
                                        <span className='circle redStatus'></span>
                                        <p>Erro ao resgatar o status</p>
                                    </div>
                                )}
                            </div>
                            <div className='infoRefs'>
                                <h3>Referências: </h3>
                                {pedidoDois.ref1 ? (
                                    <div>
                                        <img src={pedidoDois.ref1} alt="" />
                                        {pedidoDois.ref2 && <img src={pedidoDois.ref2} alt="" />}
                                    </div> 
                                ):(
                                    <p>Sem referências</p>
                                )}
                                
                                
                            </div>
                        </div>
                        <div className='pedidosBtns'> 
                            {confirmDelDois ? (
                                <p id='delP2' onClick={()=>{deletarProjeto('dois')}}>
                                    Deseja mesmo cancelar o pedido?
                                </p>
                            ) : (
                                <div>
                                    {pedidoDois.status === 0 ? (
                                        <p onClick={()=>{setConfirmDelDois(true)}}>
                                            <span className="material-symbols-outlined">delete</span> Cancelar Pedido
                                        </p>
                                    ) : pedidoDois.status === 1 ? (
                                        <p onClick={()=>{setConfirmDelDois(true)}}>
                                            Apagar
                                        </p>
                                    ) : pedidoDois.status === 2 ? (
                                        <p> 
                                            {/* api de pagamento */}
                                            <abbr title="Realize o pagamento para receber o pedido">Realizar Pagamento</abbr>
                                        </p>
                                    ) : (
                                        <p onClick={()=>{setConfirmDelDois(true)}}>
                                            Apagar
                                        </p>
                                    )} 
                                </div>
                            )}       
                                 
                        </div>
                    </div>
                ):(
                    <div className='divRedirect' onClick={()=>{navigate('/mainfeatures/criarpedidos')}}>
                        <p>Nenhum projeto adicionado ainda!</p>
                        <img src={imgAdicionar} alt="" />               
                        <p>Clique aqui para adicionar um projeto</p>
                    </div>                    
                )}
                
            </div>
        </div>
    )
}

export default MeusPedidos