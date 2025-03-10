const db = require('../db')
const Project = db.sequelize.define('projetos', {
    categoria: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    ref1: {
        type: db.Sequelize.BLOB
    },
    ref2: {
        type: db.Sequelize.BLOB
    },
    status: {
        type: db.Sequelize.INTEGER,
        defaulValue: 0
    },
    clienteId: {
        type: db.Sequelize.INTEGER
    }
})

// Project.sync({force: true})

module.exports = Project
//status
    //0 => em andamento - amarelo
    //1 => concluido - verde
    //2 => recusado - vermelho
    //3 => aguardando pagamento - azul