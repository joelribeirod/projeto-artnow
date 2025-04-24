const db = require('../db')
const Login = db.sequelize.define('usuarios', {
    email: {
        type: db.Sequelize.STRING,
        allowNull: false, 
        unique: true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false, 
        unique: true
    },
    hierarquia: {
        type: db.Sequelize.INTEGER,
        defaultValue: 1
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps : false
})

Login.sync()

module.exports = Login

// Hierarquia
    // 0 => ADM
    // 1 => usuario normal