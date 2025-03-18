import './CriarPedidos.css'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

function CriarPedidos() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const [categorias, setCategorias] = useState([])

    const [categoriaSelecionada, setCategoriaSelecionada] = useState()
    const [referenciaUm, setReferenciaUm] = useState(null)
    const [referenciaDois, setReferenciaDois] = useState(null)
    const [tam, setTam] = useState(0)
    const [erroTam, setErroTam] = useState(false)

    const [desc, setDesc] = useState('')


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

    useEffect(()=>{
        setTam(desc.length)
        if(desc.length > 250){
            setErroTam(true)
        }else{
            setErroTam(false)
        }
    }, [desc])

    function removerFile(file) {
        if(file === 'um'){
            setReferenciaUm(null)
        }else if(file === 'dois'){
            setReferenciaDois(null)
        }
    }

    function enviarPedido() {
        if(!desc || desc === null || desc === undefined){
            window.alert('Escreva a descrição do projeto')
            return null
        }

        if(!categoriaSelecionada || categoriaSelecionada === null || categoriaSelecionada === undefined){
            window.alert('Selecione a categoria do projeto')
            return null
        }

        if(erroTam){
            window.alert('Reduza o tamanho do texto')
            return null
        }

        const formData = new FormData()
        if(referenciaUm){
            formData.append("imagens", referenciaUm)
        }
        if(referenciaDois){
            formData.append("imagens", referenciaDois)
        }

        formData.append("categoria", categoriaSelecionada)
        formData.append("desc", desc)

        let promise = fetch("http://localhost:8081/pedidos", {
            method: "POST",
            headers:{
                'Authorization': `Bearer ${token}`
            },
            body: formData
        }).then((resp)=>resp.json())

        Promise.resolve(promise).then((resp)=>{
            if(resp.success){
                navigate('/mainfeatures/meuspedidos')
            }else{
                window.alert("Ops! houve algum erro ao cadastrar os dados: " + resp.erro)        
            }
        }).catch((err)=>{
            console.log('Erro ao cadastrar pedido: ' + err)
        }).finally(()=>{
            console.log("Requisição realizada com sucesso")
        })
    }

    return (
        <div id="criarPedidosBG">
            <div id="criarPedidos">
                <h1>Crie seu pedido</h1>
                <div id="criarPedidoForm">
                    <div id="Desc">
                        <h3>Descreva-o:</h3>
                        <textarea rows="6" id="IDesc" placeholder="Descreva seu projeto aqui" onChange={(e)=>{
                            setDesc(e.target.value)
                        }}></textarea>
                        <div id='divTam'>
                            {erroTam && <p className='erro'>O tamanho não deve superar 250!</p>}
                            <p>{tam}/250</p>
                        </div>
                    </div>
                    <div id="categorias">
                        <h3>Selecione uma categoria: </h3>
                        <select onChange={(e)=>(
                            setCategoriaSelecionada(e.target.value)
                        )}>
                            <option value="">Selecione uma categoria</option>
                            {categorias.length > 1 ? (
                                categorias.map((categoria)=>(
                                    <option value={categoria.id} key={categoria.id}>{categoria.nome}</option>
                                ))
                            ) : (
                                <option value="" disabled>Nenhuma categoria</option>
                            )}
                        </select>
                    </div>
                    <div id="referencias">
                        <h3>Deseja enviar alguma referencia?</h3>
                        <h4>Referência 1</h4>
                            {referenciaUm ? (
                                
                                <div id='refUmSalvo' onClick={()=>(removerFile('um'))}>
                                    <p>Referência armazenada! *Clique aqui para desfazer*</p>
                                </div>
                            ) : (
                                <div id="ref1">               
                                    <p>Clique para fazer o upload</p>
                                    <input type="file" id="inputRef1" accept="image/*" onChange={(e)=>{
                                        const file = e.target.files[0]
                                        if (file) {
                                        setReferenciaUm(file);
                                        console.log("Arquivo selecionado:", file);
                                        }
                                    }}/>
                                </div>
                            )} 
                        <h4>Referência 2</h4>
                            {referenciaDois ? (
                                
                                <div id='refDoisSalvo' onClick={()=>(removerFile('dois'))}>
                                    <p>Referência armazenada! *Clique aqui para desfazer*</p>
                                </div>
                            ) : (
                                <div id="ref2">               
                                    <p>Clique para fazer o upload</p>
                                    <input type="file" id="inputRef2" accept="image/*" onChange={(e)=>{
                                        const file = e.target.files[0]
                                        if (file) {
                                        setReferenciaDois(file);
                                        console.log("Arquivo selecionado:", file);
                                        }
                                    }}/>
                                </div>
                            )} 
                    </div>
                    <button id="enviarPedido" onClick={()=>(enviarPedido())}>Criar pedido</button>
                </div>
            </div>
        </div>
    )
}

export default CriarPedidos