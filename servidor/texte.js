const bcrypt = require('bcrypt')
//gera a senha com o hash
    async function criarHash(password){
        const hashedSenha = await bcrypt.hash(password, 10)   
        console.log(hashedSenha)
        return hashedSenha
    }
   
//analisa se o valor do hask é igual ao valor da senhaDigitada
    async function compararHash(senhaDigitada, senhaDoBanco) {
        if(senhaDoBanco == null || senhaDoBanco == undefined){
            return "Comparação impossivel, hash não é valido"
        }

        const comparacao = await bcrypt.compare(senhaDigitada,senhaDoBanco)

        if(comparacao){
            console.log('Senhas iguais')
        }else{
            console.log('senhas diferentes')
        }

    }
//simula uma requisição ao servidor 
    //se for 0, ele envia a senha e gera o hash 
    //se for 1, ele pega a senha digita e envia junto com senha ja hasheada, e retorna a resposta
    const numero = 1
//hash da senha 'MinhaSenhaLinda'
    const sla = '$2b$10$9.RG8m8CC69Ot7AU/nyJ0OGLrTlNhLkoBnzubhOtRcUG7qsRiJype'

if(numero == 0){
    criarHash('MinhaSenhaLinda')
}else if(numero == 1){
    compararHash('MinhaSenha', sla)
}