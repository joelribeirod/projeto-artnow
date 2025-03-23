const db = require('../db')
const Project = db.sequelize.define('projetos', {
    categoria: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    desc: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    ref1: {
        type: db.Sequelize.STRING
    },
    ref2: {
        type: db.Sequelize.STRING
    },
    status: {
        type: db.Sequelize.INTEGER,
        defaultValue: 0
    },
    clienteId: {
        type: db.Sequelize.INTEGER
    }
})

// Project.sync()

module.exports = Project
//status
    //0 => em andamento - amarelo
    //1 => concluido - verde
    //2 => recusado - vermelho
    //3 => aguardando pagamento - azul