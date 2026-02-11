const db = require('../models')
const router = require('express').Router()

// GET /races
// get all races from the DB (driver_circuits)
router.get('/', async (req, res) => {
    // fetch all the records from driver_circuits
    try {
        const results = await db.DriverCircuit.findAll()
        
        res.json(results)
        return

    } catch (error) {
        // something went wrong trying to execute the command on the database
        res.status(500).json({ message: "Internal server error." })
        return
    }
})

// POST /races
// insert a new race result into the DB (driver_circuits)
router.post('/', async (req, res) => {
    // get driverId, circuitId, and position from the req.body
    const { driverId, circuitId, position } = req.body

    // validation
    if (isNaN(driverId) || isNaN(circuitId) || isNaN(position)) {
        res.status(400).json({ message: "Bad request" })
        return
    }

    try {
        console.log(`driverId: ${driverId}`)
        console.log(`circuitId: ${circuitId}`)
        console.log(`position: ${position}`)

        const result = await db.DriverCircuit.create({
            driverId,
            circuitId,
            position
        })

        console.log(result)
        // deal with 404 errors - inspect the result in the logs

        // successful creation
        res.status(201).json(result)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error." })
        return
    }
})

module.exports = router