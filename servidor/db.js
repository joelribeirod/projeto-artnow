const Sequelize = require('sequelize')
const sequelize = new Sequelize('servidor_artnow', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(
    console.log('Sucesso na conexão do db')
).catch((err) => {
    console.log(err)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}