const router = require('express').Router()
const db = require('../models')
const { requireLoggedInUser, requireAdminUser } = require('../middleware/authMiddleware')

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

    // res.json({ data: results })
    res.render('teams', { teams: results, currentUser: req.user })
})

router.get('/:id', requireLoggedInUser, async (req, res) => {
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
        res.render('teamDetails', { team: result, currentUser: req.user })
        // res.json(result)
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" })
        return
    }
})


router.post('/', requireAdminUser, async (req, res) => {
    // add a team
    const { teamName } = req.body

    if (!teamName) {
        // deal with a error 400
        res.redirect('/teams')
        return
    }

    try {
        const result = await db.Team.create({ teamName })

        res.redirect('/teams')
        return

    } catch (error) {
        // catch the error 500
        res.redirect('/teams')
        return
    }
})

router.post('/populate', async (req, res) => {
    // add a team
    await teamsTable.create({ teamName: "Aston Martin" })
    await teamsTable.create({ teamName: "Haas" })

    res.status(201).json({ message: "Database has been populated with teams." })
})

router.put('/:id', requireAdminUser, async (req, res) => {
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

router.delete('/:id', requireAdminUser, async (req, res) => {
    // delete a team by ID
    const teamId = req.params.id

    // validate Id
    if (isNaN(teamId)) {
        // handle the 400 error
        res.status(400).json({ error: `Team ID = ${teamId} is not valid, it needs to be a number.` })
        return
    }

    try {
        const result = await db.Team.destroy({ where: { id: teamId } })
        console.log(result)

        // check how many rows were affected to deal with a 404 error
        if (!result) {
            console.log("TEST 404 PING")
            // 404
            res.status(404).json({ error: `Team with ID = ${teamId} does not exist.` })
            return
        }
        
        // successful 200
        res.json()
        return
        
    } catch (error) {
        res.status(500).json({ error: `Server error.` })
        return
    }
})

module.exports = router