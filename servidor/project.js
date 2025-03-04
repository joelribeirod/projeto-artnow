const db = require('./db')
const Project = db.sequelize.define('projetos', {
    tipo: {
        type: db.Sequelize.STRING
    },
    desc: {
        type: db.Sequelize.STRING
    },
    ref1: {
        type: db.Sequelize.BLOB
    },
    ref2: {
        type: db.Sequelize.BLOB
    },
    status: {
        type: db.Sequelize.STRING
    },
    clienteId: {
        type: db.Sequelize.INTEGER
    }
})

Project.sync({force: true})

module.exports = Project