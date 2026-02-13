const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')

// Configure passport
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await db.User.findOne({ where: { username } })

        if (!user) {
            return done(null, false, { message: 'Invalid username or password.' })
        }

        if (user.password !== password) {
            return done(null, false, { message: 'Invalid username or password.' })
        }

        return done(null, user)
    } catch (error) {
        return done(error)
    }
}))

// Passport serialization and deserialization of User
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.User.findByPk(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

// Create a router and add endpoints
const router = express.Router()

// Render login page
router.get('/', (req, res) => {
    // res.status(200).json({ message: 'Use POST /login with username and password to log in.' })
    res.render('login', { currentUser: req.user })
    return
})

// Logging in
// POST /login
router.post('/', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    // const { username, password } = req.body
    // console.log(username)
    // console.log(password)

    // res.status(200).json({ message: 'Logged in successfully.', user: req.user })
    res.redirect('/')
    return
})

// Logging out
// POST /login/logout
router.post('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error)
        }

        // return res.status(200).json({ message: 'Logged out successfully.' })
        res.redirect('/')
    })
})

// Add the necessary roles and test users to the DB:
// roles:
// 1: ADMIN
// 2: USER
// users:
// 1: admin - admin
// 2: warren - user
// 3: test - user
router.post('/populate', async (req, res) => {
    try {
        await db.Role.create({ description: "ADMIN" })
        await db.Role.create({ description: "USER" })
        await db.User.create({ username: "admin", roleId: 1, password: "admin" })
        await db.User.create({ username: "warren", roleId: 2, password: "1234" })
        await db.User.create({ username: "test", roleId: 2, password: "1234" })
    
        console.log('DATABASE POPULATED WITH USERS AND ROLES ✅')
        res.status(201).json({ message: 'DATABASE POPULATED WITH USERS AND ROLES ✅' })
        return
        
    } catch (error) {
        console.log("ERROR WHILE POPULATING DB WITH ROLES AND USERS ❌")
        res.status(500).json({ message: 'ERROR WHILE POPULATING DB WITH ROLES AND USERS ❌' })
        return
    }
})

module.exports = router