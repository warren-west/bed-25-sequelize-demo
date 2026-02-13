require('dotenv').config()

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

/**
 * We're taking a "code-first" approach to generating a database schema.
 * Before, we used SQL commands in MySql Workbench to create tables and fields.
 * Now, we're going to use JavaScript (with Sequelize) to do the same.
 * Remember, Sequelize is a tool that generates SQL in the background when we use it's helper methods. 
 */

const db = require('./models/index')

// Synchronize the "sequelize" object with the state of the database:
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log("database updated...")
    })
    .catch(() => {
        console.log("error updating database...")
    })

const express = require('express')
const session = require('express-session')
const passport = require('passport')
const server = express()
const path = require('path')

// import routes
const driversRouter = require('./routes/drivers')
const teamsRouter = require('./routes/teams')
const circuitsRouter = require('./routes/circuits')
const racesRouter = require('./routes/races')
const authRouter = require('./routes/auth')

// middleware
server.use(express.json()) // allow reading JSON data from req.body
server.use(express.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, 'public'))) // use the "public" folder
server.use(session({
    secret: process.env.SESSION_SECRET || 'dev-session-secret',
    resave: false,
    saveUninitialized: false
}))
server.use(passport.initialize())
server.use(passport.session())
server.set("view engine", "ejs")
server.set('views', path.join(__dirname, 'views'))

// connect the routes
server.use('/drivers', driversRouter)
server.use('/teams', teamsRouter)
server.use('/circuits', circuitsRouter)
server.use('/races', racesRouter)
server.use('/login', authRouter)

// render the home page
server.get('/', async (req, res) => {
    res.render('home', { currentUser: req.user })
    return
})

// Determine the port for the server
const port = process.env.PORT || '3000'

// Start the server
server.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
})