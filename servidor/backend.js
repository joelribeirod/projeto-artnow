const express = require("express")
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Login = require('./tabelas/user')
const Project = require('./tabelas/project')
const Categorias = require("./tabelas/categorias")


//configs
    app.use(cors())
    app.use(express.json())


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
                    console.log(comparacao)
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

        // app.patch()

        // app.delete()
    // rotas tabela project
        // app.get()

        app.post("/projetos",verificarToken, (req,res)=>{
            
        })

        // app.patch()

        // app.delete()
    //
//
app.listen(8081, ()=> {
    console.log("Servidor rodando...")
})