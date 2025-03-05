const db = require('./db')
const Project = db.sequelize.define('projetos', {
    tipo: {
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
    //0 => em andamento
    //1 => concluido
    //2 => recusado