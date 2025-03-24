import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './AdmProjetos.css'
import Loading from "../../loading/Loading";

function AdmProjetos() {
    const token = localStorage.getItem('token')

    const [pedidos, setPedidos] = useState('')
    const [categorias, setCategorias] = useState([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(4)

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        let promise = fetch('https://projeto-artnow.onrender.com/pedidos/admGetAll', {
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
            setLoading(false)
        })
    },[token])

    useEffect(()=>{
        setLoading(true)
        let promise = fetch('https://projeto-artnow.onrender.com/categorias', {
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

    function limitarTexto(texto, limite) {
        return texto.length > limite ? texto.substring(0, limite) + "..." : texto;
    };

    return(
        <div id="mainAdmProjetosBg">
            {loading && <Loading/>}
            <div id="filtro">
                <select onChange={(e)=>(
                    setCategoriaSelecionada(Number(e.target.value))
                )}>
                    <option value="4" key="4">Todos</option>
                    <option value="0" key="0">Em andamento</option>
                    <option value="3" key="3">Aguardando pagamento</option>
                    <option value="1" key="1">Concluidos</option>
                    <option value="2" key="2">Recusados</option>
                </select>
            </div>
            <div id="mainAdmProjetos">
                
                {pedidos ? (              
                    pedidos.filter(
                        // eslint-disable-next-line 
                        (pedido)=> categoriaSelecionada === 4 || pedido.status === categoriaSelecionada
                    ).map(pedido => (
                        <div className="pedido">
                            <Link to={`projeto/${pedido.id}`} className="detalhes">
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
                            </Link>
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