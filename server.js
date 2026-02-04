/**
 * SEQUELIZE is a popular ORM
 * O - Object
 * R - Relational
 * M - Mapper
 * 
 * The biggest advantage of using an ORM is that it generates SQL for you.
 * You don't have to write any SQL in your source code.
 * SQL is generated from methods the ORM provides.
 * 
 * For example: If you have a table, STUDENTS, with the fields:
 *  - studentId, firstname, lastname
 * 
 * You can create a MODEL (class) called Student.
 * Then you can use the functions:
 *  - Student.create({ fields / values for new student })
 *  - Student.findAll({ any filters / sorting / etc. })
 *  - Student.destroy({ model id to be deleted })
 *  - Student.update({ updated model fields })
 */

// start off by importing the sequelize dependency:
const { Sequelize, DataTypes } = require('sequelize')

// create a new instance of the Sequelize class
// an instance of the Sequelize class represents a connection to the DB
// similarly to how we created a connection with mysql2
const sequelize = new Sequelize({
    host: 'localhost',
    database: 'formulaonedb', // use a fresh database
    username: 'root',
    password: 'admin',
    dialect: 'mysql' // we choose mysql
})

// We can use the .authenticate() method to check the connection to the db
// this is how we can check the connection using Promise syntax:
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

/**
 * We're taking a "code-first" approach to generating a database schema.
 * Before, we used SQL commands in MySql Workbench to create tables and fields.
 * Now, we're going to use JavaScript (with Sequelize) to do the same.
 * Remember, Sequelize is a tool that generates SQL in the background when we use it's helper methods. 
 */

//#region CREATE Models
/** CREATE DATABASE MODELS (tables) */
const teamsTable = sequelize.define('teams', {
    // IDs (PKs) can either be left for Sequelize to create with defaults
    // or they can be created explicitly by us
    teamName: DataTypes.STRING
}, {
    timestamps: false // do not create the columns for "createdAt" and "updatedAt"
})

const driversTable = sequelize.define('drivers', {
    driverName: DataTypes.STRING,
    birthDate: DataTypes.DATE
}, {
    timestamps: false
})

const circuitsTable = sequelize.define('circuits', {
    circuitName: DataTypes.STRING
}, {
    timestamps: false
})
//#endregion

// #region Populate Database
async function populateDatabase() {
    driversTable.create({ driverName: "Lewis Hamilton", birthDate: "1985-12-01", id: 1 })
    driversTable.create({ driverName: "Charles LeClerk", birthDate: "1992-12-01", id: 2 })
    driversTable.create({ driverName: "Max Verstappen", birthDate: "1990-12-01", id: 3 })
    
    circuitsTable.create({ circuitName: "Silverstone", id: 1 })
    circuitsTable.create({ circuitName: "Abu Dhabi", id: 2 })
    circuitsTable.create({ circuitName: "Monza", id: 3 })
    
    teamsTable.create({ teamName: "Ferrari", id: 1 })
    teamsTable.create({ teamName: "Red Bull", id: 2 })
}

// #endregion

// Synchronize the "sequelize" object with the state of the database:
sequelize.sync({ alter: true })
    .then(() => {
        console.log("database updated...")
    })
    .catch(() => {
        console.log("error updating database...")
    })


const express = require('express')
const server = express()

// We'll start defining the callback functions in our endpoints as ASYNC
// because database operations are asynchronous
// Fetching, inserting, updating, and deleting things from the DB are all ASYNC (they take time)
server.get('/', async (req, res) => {
    // fetch all the data from the database
    // drivers
    const driverResults = await driversTable.findAll()
    // teams
    const teamResults = await teamsTable.findAll()
    // circuits
    const circuitResults = await circuitsTable.findAll()

    // log out the results:
    console.log(driverResults)
    console.log(teamResults)
    console.log(circuitResults)

    // return the data as JSON to the client
    res.status(200).json({
        drivers: driverResults,
        teams: teamResults,
        circuits: circuitResults,
    })
    return
})

// an endpoint for populating the database
server.post('/populate', async (req, res) => {
    await populateDatabase()
    res.status(201).json({ message: "Database Populated!" })
})

server.delete('/', async (req, res) => {
    console.log('PING')
    // we want to delete one record from each table
    // delete a driver
    driversTable.destroy({ where: {id:1} })
    // delete a team
    teamsTable.destroy({ where: {id:1} })
    // delete a circuit
    circuitsTable.destroy({ where: {id:1} })

    res.status(204).json({ message: "Deleted items from the database!" })
})

server.listen(3000, () => {
    console.log(`Server is listening on port 3000.`)
})