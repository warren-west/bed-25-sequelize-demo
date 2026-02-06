const router = require('express').Router()
const db = require('../models')

router.get('/', async (req, res) => {
    // get circuits
    const results = await db.Circuit.findAll({})

    res.json({ data: results })
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