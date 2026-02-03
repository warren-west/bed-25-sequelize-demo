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
const { Sequelize } = require('sequelize')

// create a new instance of the Sequelize class
// an instance of the Sequelize class represents a connection to the DB
// similarly to how we created a connection with mysql2
const sequelize = new Sequelize({
    host: 'localhost',
    database: 'universitydb',
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