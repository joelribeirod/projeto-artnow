const db = require('./db')
const Login = db.sequelize.define('usuarios', {
    email: {
        type: db.Sequelize.STRING,
        unique: true
    },
    nome: {
        type: db.Sequelize.STRING,
        unique: true
    },
    hierarquia: {
        type: db.Sequelize.INTEGER,
        default: 1
    },
    senha: {
        type: db.Sequelize.INTEGER
    }
},{
    
})

Login.sync()

module.exports = Login