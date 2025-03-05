const express = require("express")
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Login = require('./user')
const Project = require('./project')


//configs
    app.use(cors())
    app.use(express.json())


// gerenciar token JWT
    const chaveSecreta = 'minha_Aplicação'

    function gerarToken(user){
        return jwt.sign(
           { userId: user.id},
           chaveSecreta,
           {expiresIn: 600}
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
                return true
            }else{
                return false
            }
        }

//rotas
    // rotas tabela user
        app.post('/login/signin', (req,res) => {
            res.send("Teste, teste")
            // Login.findOne({
            //     where: {nome: req.body.nome}
            // }).then((user)=>{
            //     const comparacao = compararHash(req.body.senha, user.senha)

            //     if(!comparacao){
            //         res.send({erro: 'Credenciais incorretas'})
            //     }else{
            //         const token = gerarToken(user)
            //         res.send("usuario encontrado")
            //     }
            // }).catch((err)=>{
            //     res.send({err: err})
            // })
        })

        app.post("/login/signup", async (req,res) => {
            const senha = await criarHash(req.body.senha)

            Login.create({
                email: req.body.email,
                nome: req.body.nome,
                senha: senha
            }).then(
                res.send({success: "Sucesso no cadastro do usuario"})
            ).catch((err) => {
                res.send({err: err})
            })
        })

        // app.patch()

        // app.delete()
    // rotas tabela project
        // app.get()

        // app.post()

        // app.patch()

        // app.delete()
    //
//
app.listen(8081, ()=> {
    console.log("Servidor rodando...")
})