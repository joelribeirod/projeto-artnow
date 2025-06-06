import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom" 

import './Projeto.css'
import Loading from "../../loading/Loading";

function Projeto() {
    const {id} = useParams()
    const token = localStorage.getItem('token')

    const [pedido, setPedido] = useState()
    const [userData, setUserData] = useState()

    const [loading, setLoading] = useState(false)

    const [categorias, setCategorias] = useState([])

    const [confirmDel, setConfirmDel] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        setLoading(true)
        
        let promise = fetch(`${process.env.REACT_APP_API_URL}/pedidos/admGetOne/${id}`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((resp)=> resp.json())

        Promise.resolve(promise).then((resp)=>{
            if(resp.err){
                console.log(resp.err)
            }else{
                setPedido(resp)
            }
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })

    }, [id, token])

    useEffect(()=>{
        if (!pedido || !pedido.clienteId) return;

        setLoading(true)

        let promise = fetch(`${process.env.REACT_APP_API_URL}/pedidos/admGetUser/${pedido.clienteId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((resp)=>resp.json())

        Promise.resolve(promise).then((resp)=>{
            if(resp.err){
                console.log('Houve algum erro: ' + resp.err)
            }else{
                setUserData(resp)
            }
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    },[token, pedido])

    useEffect(()=>{
        setLoading(true)

        let promise = fetch(`${process.env.REACT_APP_API_URL}/categorias`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(
            (resp)=>resp.json()
        )

        Promise.resolve(promise).then((categorias) =>{
            setCategorias(categorias)
        }).catch((err) => {
            console.log(err)
        }).finally(()=> setLoading(false))
    },[token])

    async function alterarStatus(e) {
        const alteracao = {}
        if(e === 'mudarParaZero'){
            alteracao['status'] = 0
        }else if(e === 'mudarParaUm'){
            alteracao['status'] = 1
        }else if(e === 'mudarParaDois'){
            alteracao['status'] = 2
        }else if(e === 'mudarParaTres'){
            alteracao['status'] = 3
        }

        setLoading(true)
        
        let promise = await fetch(`${process.env.REACT_APP_API_URL}/pedidos/admAlterarStatus/${pedido.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(alteracao)
        }).then((resp)=>resp.json())

        Promise.resolve(promise).then(()=>{
            window.location.reload()
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    }

    async function deletarProjeto() {
        setLoading(true)

        let promise = await fetch(`${process.env.REACT_APP_API_URL}/pedidos/${pedido.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((resp)=>resp.json())

        Promise.resolve(promise).then(
            navigate('/mainfeatures/admprojetos')
        ).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    }

    return(
        <div id="mainPedidoAdmBg">
            {loading && <Loading/>}
            <div id="mainPedidoAdm">
                {pedido ? (
                    <div id="mainPedido">
                        <Link to="/mainfeatures/admprojetos">
                            <span id="voltarProjeto" className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        
                        {userData &&
                            <div id="pedidoUserData">                              
                                <h3>Nome: {userData.nome}</h3>
                                <h3>Email: {userData.email}</h3>
                            </div>
                        }
                        
                        <div id="pedidoDesc">
                            <h3>Descrição:</h3>
                            <p>{pedido.desc}</p>
                        </div>
                        <div id="pedidoCateg">
                            <h3>Categoria: </h3>
                            {categorias.filter(
                                (categoria) => categoria.id === pedido.categoria
                            ).map((categoria)=>(
                                <p key={categoria.nome}>{categoria.nome}</p>
                            ))}
                        </div>
                        <div id="pedidoStatus">
                            <h3>Status:</h3>
                            <div>
                                {pedido.status === 0 ? (
                                        <div>
                                            <div className='circle yellowStatus'></div>
                                            <p>Em andamento</p>
                                        </div>
                                    ) : pedido.status === 1 ? (
                                        <div>
                                            <span className='circle greenStatus'></span>
                                            <p>Concluido</p>
                                        </div>
                                    ) : pedido.status === 2 ? (
                                        <div>
                                            <span className='circle redStatus'></span>
                                            <p>Pedido recusado</p>
                                        </div>
                                    ) : pedido.status === 3 ? (
                                        <div>
                                            <span className='circle blueStatus'></span>
                                            <p>Aguardando pagamento</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <span className='circle redStatus'></span>
                                            <p>Erro</p>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div id="pedidoRefs">
                            <h3>Referências:</h3>
                            {pedido.ref1 ? (
                                <div>
                                    <img src={pedido.ref1} alt="" />
                                    {pedido.ref2 && <img src={pedido.ref2} alt="" />}
                                </div> 
                            ):(
                                <p>Sem referências</p>
                            )}
                        </div>                        
                        {pedido.status === 0 ? (
                            <div id="pedidoBtns">
                                <button onClick={()=>{alterarStatus('mudarParaTres')}}>Concluir</button>
                                <button onClick={()=>{alterarStatus('mudarParaDois')}}>recusar</button>
                            </div>
                        ) : pedido.status === 1 ? (
                            <div id="pedidoBtns">
                                <button onClick={()=>{alterarStatus('mudarParaZero')}}>Voltar atrás</button>
                                {confirmDel ? (
                                    <button onClick={()=>{deletarProjeto()}}>Deletar?</button>
                                ):(
                                    <button onClick={()=>(setConfirmDel(true))}>Apagar</button>   
                                )}                             
                            </div>
                        ) : pedido.status === 2 ? (
                            <div id="pedidoBtns">
                                <button onClick={()=>{alterarStatus('mudarParaZero')}}>Voltar atrás</button>
                                {confirmDel ? (
                                    <button onClick={()=>{deletarProjeto()}}>Deletar?</button>
                                ):(
                                    <button onClick={()=>(setConfirmDel(true))}>Apagar</button>   
                                )}
                                
                            </div>
                        ) : pedido.status === 3 ? (
                            <div id="pedidoBtns">
                                <button onClick={()=>{alterarStatus('mudarParaUm')}}>Concluir</button>
                                <button onClick={()=>{alterarStatus('mudarParaZero')}}>Voltar atrás</button>
                            </div>
                        ) : (
                            <div id="pedidoBtns">
                                <span className='circle redStatus'></span>
                                <p>Erro</p>
                            </div>
                        )}                       
                    </div>
                ):(
                    <p>Nenhum pedido com este id!</p>
                )}
            </div>
        </div>
    )
    
}

export default Projeto