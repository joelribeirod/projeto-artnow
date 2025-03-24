import { useEffect, useState } from "react";

import './CriarCategorias.css'
import Loading from "../../loading/Loading";

function CriarCategorias() {
    const token = localStorage.getItem('token')

    const divEdit = document.getElementById('atualizarDadoBG')

    const [categoriaNome, setCategoriaNome] = useState('')
    const [novaCategoriaEdit, setNovaCategoriaEdit] = useState('')
    const [categorias, setCategorias] = useState([])

    const [categoriaEditandoId, setCategoriaEditandoId] = useState()

    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
        setLoading(true)
        let promise = fetch('https://projeto-artnow.onrender.com/categorias', {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(
            (resp) => resp.json()
        )

        Promise.resolve(promise).then((data)=>{
            console.log(data)
            setCategorias(data)
        }).catch((err) => {
            console.log(err)
        }).finally(()=> setLoading(false))
    }, [token])

    async function criarCategoria() {
        setLoading(true)
        const categoria = {
            categoriaNome: categoriaNome
        }

        let promise = await fetch('https://projeto-artnow.onrender.com/categorias', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(categoria)
        }).then(
            (resp) => resp.json()
        )

        Promise.resolve(promise).then(()=>{
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    function editarCategoria(id) {
        const nNome = document.getElementById('nNome')
        nNome.value = ''
        divEdit.style.display = 'flex'
        setCategoriaEditandoId(id)
    }

    async function salvarEdicao(id) {
        setLoading(true)

        const categoriaAtualizada = {
            categoriaAtualizada: novaCategoriaEdit
        }

        let promise = await fetch(`https://projeto-artnow.onrender.com/categorias/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(categoriaAtualizada)
        }).then(
            (resp) => resp.json()
        )

        Promise.resolve(promise).then((resp)=>{
            if(resp.sucesso){
                window.location.reload()
            }else{
                window.alert('Ops! Aconteceu algum erro!')
            }  
        }).catch((err) => {
            console.log('algo deu errado') 
        }).finally(() => {
            setLoading(false)
        })
    }

    async function deletarCategoria(id) {
        setLoading(true)
        let promise = await fetch(`https://projeto-artnow.onrender.com/categorias/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(
            (resp) => resp.json()
        ).catch((err) => {
            console.log(err)
        })

        Promise.resolve(promise).then(()=>{
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    window.addEventListener('click', (e)=>{
        if(e.target === divEdit){
            divEdit.style.display = 'none'
        }
    })

    return (
        <div id="mainCategoria">
            {loading && <Loading/>}
            <div id="atualizarDadoBG" style={{display: 'none'}}>
                <div id="atualizarDado">
                    <h1>Editar Categoria:</h1>
                    <div>
                        <label htmlFor="nNome">Novo Nome: </label>
                        <input type="text" id="nNome" autocomplete="off" onChange={(e)=>{
                            setNovaCategoriaEdit(e.target.value)
                        }}/>
                    </div>
                    <div id="btns">
                        <button onClick={()=>{
                            salvarEdicao(categoriaEditandoId)
                        }}>Salvar</button>
                        <button onClick={()=>{
                            divEdit.style.display = 'none'
                        }}>Cancelar</button>
                    </div>
                </div>
            </div>
            <div id="criarCategoria">
                <h1>Nova categoria:</h1>
                <div id='infoNovaCategoria'>
                    <label htmlFor="inome">Nome da Categoria: </label>
                    <input type="text" id="inome" onChange={(e)=>{
                        setCategoriaNome(e.target.value)
                    }}/>
                </div>
                <button onClick={criarCategoria}>Criar</button>
            </div>
            <div id="vizualizarCategorias">
                {categorias.length < 1 ? (
                    <p>Nenhuma categoria registrada!</p>
                ) : (
                    categorias.map((categoria)=>(
                        <div className="containerCategoria">
                            <h1 key={categoria.id}>
                                <abbr title={categoria.nome}>{categoria.nome}</abbr>
                            </h1>
                            <div className="categoriaBtns">
                                <button onClick={()=>{
                                    editarCategoria(categoria.id)
                                }}>
                                    <span className="material-symbols-outlined" >edit</span>
                                </button>
                                <button onClick={()=>{
                                    deletarCategoria(categoria.id)
                                }}>
                                    <span className="material-symbols-outlined" >delete</span>
                                </button>
                                
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CriarCategorias