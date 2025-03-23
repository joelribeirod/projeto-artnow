const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD, {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql'
    }
)

sequelize.authenticate().then(
    console.log('Sucesso na conexão do db')
).catch((err) => {
    console.log(err)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}