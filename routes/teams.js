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

router.get('/:id', async (req, res) => {
    // get the teamId from the req.params
    const teamId = req.params.id

    // validate the teamId -> 400
    if (isNaN(teamId)) {
        res.status(400).json({ message: "Invalid team id." })
        return
    }

    try {
        // perform the fetch (including related Driver data)
        const result = await db.Team.findByPk(teamId, { include: db.Driver })

        // check the result of the fetch for a 404 - return a response
        if (!result) {
            res.status(404).json({ message: `Team with id = ${teamId} not found.` })
            return
        }

        // return a success response
        res.json(result)
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" })
        return
    }
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

router.put('/:id', async (req, res) => {
    // update a team by ID
    const teamId = req.params.id
    const { teamName } = req.body
    
    // validate the teamId & teamName
    if (isNaN(teamId) || !teamName) {
        // invalid input details
        res.status(400).json({ message: "Bad request, invalid input(s)" })
        return
    }

    try {
        const result = await db.Team.update({ teamName }, { where: { id: teamId } })

        if (!result) {
            // no rows in the DB were affected by the update()
            res.status(404).json({ message: `Team with the id = ${teamId} does not exist.` })
            return
        }
        
        // A successful update()
        res.status(204).json()
        return

    } catch (error) {
        res.status(500).json({ message: "Internal server error." })
        return
    }
})

router.delete('/', async (req, res) => {
    // delete a team by ID
    // Can copy & paste using the Driver route as a template
})

module.exports = router