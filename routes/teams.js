const router = require('express').Router()
const db = require('../models')

// Note: the .route() function lets you do this:
// router.route('/')
//     .get((req, res) => {})
//     .post((req, res) => {})

// router.route('/:id')
//     .put((req, res) => {})
//     .delete((req, res) => {})

router.get('/', async (req, res) => {
    // get teams
    const results = await db.Team.findAll({})

    res.json({ data: results })
})

router.post('/', async (req, res) => {
    // add a team
    // Can copy & paste using the Driver route as a template
})

router.post('/populate', async (req, res) => {
    // add a team
    await teamsTable.create({ teamName: "Aston Martin" })
    await teamsTable.create({ teamName: "Haas" })
    
    res.status(201).json({ message: "Database has been populated with teams." })
})

router.put('/', async (req, res) => {
    // update a team by ID
    // Can copy & paste using the Driver route as a template
})

router.delete('/', async (req, res) => {
    // delete a team by ID
    // Can copy & paste using the Driver route as a template
})

module.exports = router