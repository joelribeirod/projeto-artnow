const express = require("express")
const app = express()
const multer = require("multer")
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path = require('path')
const fs = require('fs')

const Login = require('./tabelas/user')
const Project = require('./tabelas/project')
const Categorias = require("./tabelas/categorias")


//configs
    app.use(cors())
    app.use(express.json())

    const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null, "uploads/")
        },
        filename: (req,file,cb)=>{
            cb(null,Date.now() + "-" + file.originalname)
        }
    })

    const upload = multer({ storage })

// gerenciar token JWT
    const chaveSecreta = 'minha_Aplicação'
    const duracaoToken = 3600

    function gerarToken(user){
        return jwt.sign(
           {userId: user.id, isAdmin: user.hierarquia},
           chaveSecreta,
           {expiresIn: duracaoToken}
        )
    }

    function verificarToken(req, res, next){
        const token = req.headers.authorization?.split(" ")[1]

        if(!token){
            return res.status(401).json({erro: "Acesso negado, token não foi fornecido"})
        }

        jwt.verify(token, chaveSecreta, (err, decoded)=>{
            if(err){
                return res.status(403).json({erro: "token inválido!"})
            }
            req.usuario = decoded
            next()
        })
    }
//Gerenciar hash
    //gera o hash para uma senha
        async function criarHash(password){
            const hashedSenha = await bcrypt.hash(password, 10)   
            
            return hashedSenha
        }
    //analisa a senha enviada com algum hash cadastrado no banco
        async function compararHash(senhaDigitada, senhaDoBanco) {
            if(senhaDoBanco == null || senhaDoBanco == undefined){
                return "Comparação impossivel, hash não é valido"
            }

            const comparacao = await bcrypt.compare(senhaDigitada,senhaDoBanco)

            if(comparacao){
                return "Senha igual"
            }else{
                return "Senha diferente"
            }
        }

//rotas
    // rotas tabela categorias
        app.get("/categorias",verificarToken, (req,res)=>{
            Categorias.findAll().then((resp)=>{
                res.send(resp)
            }).catch((err) => {
                res.send(err)
            })
        })

        app.post("/categorias",verificarToken, (req,res)=>{
            if(req.usuario.isAdmin === 0){
                Categorias.create({
                    nome: req.body.categoriaNome
                }).then(()=>{
                    res.send({sucesso: "Sucesso ao cadastrar a categoria"})
                }).catch((err)=>{
                    res.send(err)
                })
            }else{
                res.send({erro: "Para acessar essa rota você deve ser um ADM"})
            }
        })

        app.patch("/categorias/:id",verificarToken, (req,res)=>{
            if(req.usuario.isAdmin === 0){
                Categorias.update({
                    nome: req.body.categoriaAtualizada
                },{
                    where: {'id': req.params.id}
                }).then(
                    res.send({sucesso: "Categoria atualizada com sucesso"})
                ).catch((err)=>{
                    res.send('err')
                })
            }else{
                res.send({erro: "Para acessar essa rota você deve ser um ADM"})
            }
        })

        app.delete('/categorias/:id',verificarToken, (req,res)=>{
            if(req.usuario.isAdmin === 0){
                Categorias.destroy({
                    where:{'id': req.params.id}
                }).then(
                    res.send({sucesso: "Categoria deletada com sucesso"})
                ).catch((err)=>{
                    res.send(err)
                })
            }else{
                res.send({erro: "Para acessar essa rota você deve ser um ADM"})
            }
        })

    // rotas tabela user
        app.get('/login/user',verificarToken, (req, res) => {
            Login.findOne({
                where: {'id': req.usuario.userId}
            }).then((user) => {
                res.send(user)
            }).catch((err)=>{
                res.status(401).send(err)
            })
        })

        app.post('/login/signin', (req,res) => {
            Login.findOne({
                where: {nome: req.body.nome}
            }).then(async (user)=>{
                if(user){
                    const comparacao = await compararHash(req.body.senha, user.senha)
                    if(comparacao === "Senha igual"){
                        const token = gerarToken(user)
                        res.send({success: true, token: token, duracaoToken: duracaoToken}) 
                    }else{
                        res.send({erro: 'Credenciais incorretas'})
                    }

                }else{
                    res.send({erro: "Credenciais incorretas"})
                }
            }).catch((err)=>{
                res.send({err: err})
            })
        })

        app.post("/login/signup", async (req,res) => {
            const senha = await criarHash(req.body.senha)

            try {
                await Login.create({
                    email: req.body.email,
                    nome: req.body.nome,
                    senha: senha
                })
                res.send({success: "Sucesso no cadastro do usuario"})
                
            } catch (err) {
                if (err.name === 'SequelizeUniqueConstraintError'){
                    const erro = {
                        error: err.errors[0].path
                    }
    
                    res.status(400).send(erro)
                }else{
                    res.status(500).send({erroDesconhecido: "Falha no cadastro do usuário"})
                }
               
            }
        })

        app.patch("/login/edituser/:id",verificarToken, async (req,res)=>{
            const senha = req.body.senha
            let senhaHasheada = null

            const updateUser = {
                email: req.body.email,
                nome: req.body.nome
            }

            if(senha){
                senhaHasheada = await criarHash(senha)
                updateUser['senha'] = senhaHasheada
            }

            try {
                await Login.update(updateUser, {
                    where: {'id': req.params.id}
                })
                res.send({success: "Sucesso ao atualizar os dados"})
            } catch (err) {
                if (err.name === 'SequelizeUniqueConstraintError'){
                    res.status(400).send({erro: err.errors[0].path})
                }else{
                    res.status(500).send({erroDesconhecido: err.message})
                }
            }
        })

        //rota de delete
        app.post("/login/deleteuser/:id",verificarToken, async (req,res)=>{
            const pedidosCliente = await Project.findAll({
                where: {'clienteId': req.usuario.userId}
            })

            if(pedidosCliente){
                pedidosCliente.forEach((pedido)=>{
                    const imgs = [pedido.ref1, pedido.ref2]
                    imgs.forEach((img)=>{
                        if(img){
                            const rota = path.join(__dirname, '.', 'uploads',path.basename(img))
                            fs.unlink(rota, (err)=>{
                                if(err){
                                    console.log(err)
                                }
                            })
                        }
                    })
                })
            }

            Project.destroy({
                where: {'clienteId' : req.usuario.userId}
            })


            Login.findOne({
                where: {'id': req.usuario.userId}
            }).then(async (user)=>{
                const comparacao = await compararHash(req.body.senha, user.senha)

                if(comparacao === "Senha igual"){
                    Login.destroy({
                        where: {'id': req.params.id}
                    }).then(
                        res.send({sucesso: "Conta deletada com sucesso"})
                    ).catch((err)=>{
                        res.send(err)
                    })
                }else{
                    res.send({erro: 'Credenciais incorretas'})
                }
            }).catch((err)=>{
                res.send(err)
            })      
        })

    // rotas tabela project
        app.get("/pedidos", verificarToken, (req, res)=>{
            Project.findAll({
                where: {'clienteId': req.usuario.userId}
            }).then((pedidos)=>{
                res.send({
                    success: "Requisição realizada com sucesso",
                    pedidos: pedidos
                })
            }).catch((err)=>{
                res.send("Erro na requisição: " + err)
            })
        })

        app.post("/pedidos",verificarToken, upload.array("imagens", 2), async (req,res)=>{
            let limiteDePedidos = false

            await Project.findAll({
                where: {'clienteId': req.usuario.userId}
            }).then((pedidos)=>{
                if(pedidos.length >= 2){
                    limiteDePedidos = true
                }
            })

            console.log(limiteDePedidos)

            if(limiteDePedidos){
                res.send({erro: "Limite de projetos excedido"})
            }else{
                console.log(req.files)
                const filePaths = req.files.map((file) => `http://localhost:8081/uploads/${file.filename}`)

                Project.create({
                    categoria: req.body.categoria,
                    desc: req.body.desc,
                    ref1: filePaths[0],
                    ref2: filePaths[1],
                    clienteId: req.usuario.userId
                }).then(
                    res.send({success: "Sucesso ao cadastrar o pedido"})
                ).catch((err)=>{
                    res.send({erro: err})
                })
            }

            
        })

        app.delete("/pedidos/:id",verificarToken, async (req,res)=>{
            try {
                const pedido = await Project.findByPk(req.params.id)

                if(!pedido){
                    return res.send({erro: "Nenhum projeto encontrado!"})
                }

                const imgs = [pedido.ref1, pedido.ref2]
                imgs.forEach((img)=>{
                    if(img){
                        const rota = path.join(__dirname, '.', 'uploads',path.basename(img))
                        fs.unlink(rota, (err)=>{
                            if(err){
                                console.log(err)
                            }
                        })
                    }
                })

                Project.destroy(
                    {where: {'id': req.params.id}}
                ).then(
                    res.send({sucesso: "Pedido deletado!"})
                ).catch((err)=>{
                    res.send({erro: "Erro durante o deletar do pedido"})
                })
                
            } catch (err) {
                res.send({erro: "erro" + err})
            }
            
        })
    // rotas tabela project ADM
        app.get("/pedidos/admGetUser/:id", verificarToken, (req,res)=>{
            if(req.usuario.isAdmin === 0){
                Login.findOne({
                    where: {'id': req.params.id}
                }).then((user)=>{
                    if(user){
                        res.send({nome: user.nome, email: user.email})
                    }else{
                        res.send({err: "Usuario não encontrado!"})
                    }
                }).catch((err)=>{
                    res.send(err)
                })
            }else{
                res.send({erro: "Você deve ser um adm para acessar essa rota"})
            }
        })
        app.get("/pedidos/admGetAll",verificarToken, (req,res)=>{
            if(req.usuario.isAdmin === 0){
                Project.findAll().then((pedidos)=>{
                    if(pedidos){
                        res.send(pedidos)
                    }else{
                        res.send({erro: "Nenhum projeto cadastrado"})
                    }           
                }).catch((err)=>{
                    res.send({err: err})
                })
            }else{
                res.send({erro: "Você deve ser um adm para acessar essa rota"})
            }
        })

        app.get("/pedidos/admGetOne/:id",verificarToken, (req,res)=>{
            if(req.usuario.isAdmin === 0){
                Project.findOne({
                    where: {'id': req.params.id}
                }).then((pedido)=>{
                    if(pedido){
                        res.send(pedido)
                    }else{
                        res.send({err: "Não existe nenhum projeto com esse id!"})
                    }
                   
                }).catch((err)=>{
                    res.send(err)
                })
            }else{
                res.send({erro: "Você deve ser um adm para acessar essa rota"})
            }
        })

        app.patch("/pedidos/admAlterarStatus/:id",verificarToken, (req,res)=>{
            if(req.usuario.isAdmin === 0){
                Project.update({
                    status: req.body.status
                },{
                    where: {'id': req.params.id}
                }).then(
                    res.send({success: "Dados alterados com sucesso"})
                ).catch((err)=>{
                    res.send(err)
                })
            }else{
                res.send({erro: "Você deve ser um adm para acessar essa rota"})
            }
        })
    //
//

app.use("/uploads", express.static("uploads"));

app.listen(8081, ()=> {
    console.log("Servidor rodando...")
})