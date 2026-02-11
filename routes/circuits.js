const router = require('express').Router()
const { ForeignKeyConstraintError } = require('sequelize')
const db = require('../models')

router.get('/', async (req, res) => {
    // get circuits
    const results = await db.Circuit.findAll({})

    res.json({ data: results })
})

// GET /circuits/:id
// fetch a circuit by ID from the DB, including drivers associated data
router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log("GET CIRCUIT BY ID", id)

    if (isNaN(id)) {
        res.status(400).json({ message: "Bad request" })
        return
    }

    try {
        const result = await db.Circuit.findByPk(id, { include: db.Driver })

        // check for 404s
        if (!result) {
            // handle 404 error

        }

        // return success and results
        res.json(result)
        return

    } catch (error) {
        // catch the error
        // TODO: Implement proper 404 error handling
        if (typeof error == ForeignKeyConstraintError) {
            
            res.status(404).json({ message: `Invalid driver or circuit ID.` })
            return
        }

        else {
            res.status(500).json({ message: "Internal server error." })
            return
        }
    }
})

router.post('/', async (req, res) => {
    // add a circuit
    // Can copy & paste using the Driver route as a template
})
router.post('/populate', async (req, res) => {
    // add a circuit
    await db.Circuit.create({ circuitName: "British Grand Prix" })
    await db.Circuit.create({ circuitName: "Saudi Arabia" })
    await db.Circuit.create({ circuitName: "Australian Grand Prix" })
    
    res.status(201).json({ message: "Database populated with circuits." })
})

router.put('/', async (req, res) => {
    // update a circuit by ID
    // Can copy & paste using the Driver route as a template
})

router.delete('/', async (req, res) => {
    // delete a circuit by ID
    // Can copy & paste using the Driver route as a template
})

module.exports = router