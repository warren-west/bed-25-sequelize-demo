require('dotenv').config()
/**
 * Models are classes that represent entities in our database.
 * Models are also sometimes called "domain objects".
 */

// start off by importing the sequelize dependency:
const { Sequelize, DataTypes } = require('sequelize')

// create a new instance of the Sequelize class
// an instance of the Sequelize class represents a connection to the DB
// similarly to how we created a connection with mysql2
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, // use a fresh database
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: process.env.DB_DIALECT // we choose mysql
})

// We can use the .authenticate() method to check the connection to the db
// this is how we can check the connection using Promise syntax:
function checkDBConnection() {
    sequelize.authenticate()
        .then(() => {
            console.log('Successfully connected to the database!')
        })
        .catch((error) => {
            console.log('There was a problem connecting to the database!')
            console.log(error)
        })
    
    // If you'd like to use async & await syntax instead, that's fine:
    // async function authenticateDBConnection() {
    //     try {
    //         await sequelize.authenticate()
    //         console.log(`Successfully authenticated the DB connection.`)
    //     } catch (error) {
    //         console.log(`There was an error`)
    //         console.log(error)
    //     }
    // }
}

// the variable to export
const db = {}
db.sequelize = sequelize

// create models and attach them to the db object
db.Driver = require('./drivers')(sequelize)
db.Team = require('./teams')(sequelize)
db.Circuit = require('./circuits')(sequelize)
db.DriverCircuit = require('./driver_circuit')(sequelize) // linking table
db.User = require('./users')(sequelize)
db.Role = require('./roles')(sequelize)

// Set up associations
// 1-m Teams & Drivers
db.Team.hasMany(db.Driver)
db.Driver.belongsTo(db.Team)

// m-m Drivers & Circuits
db.Driver.belongsToMany(db.Circuit, { through: 'driver_circuits' })
db.Circuit.belongsToMany(db.Driver, { through: 'driver_circuits' })

// 1-m Role & User
db.Role.hasMany(db.User)
db.User.belongsTo(db.Role)

console.log(db)

// lastly, export the db object
module.exports = db