const express = require("express")
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const chaveSecreta = 'minha_Aplicação'

//configs
    app.use(cors())
    app.use(express.json())


// gerenciar token JWT
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
//rotas
    // rotas tabela user
        // app.get()

        // app.post()

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