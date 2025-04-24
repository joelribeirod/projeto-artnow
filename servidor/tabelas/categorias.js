const db = require('../db')

const Categorias = db.sequelize.define('categorias', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

Categorias.sync()

module.exports = Categorias