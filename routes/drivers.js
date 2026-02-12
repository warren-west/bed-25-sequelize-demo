const router = require('express').Router()
const db = require('../models')
const DriverService = require('../services/DriverService')
const driverService = new DriverService(db)

// GET /drivers -> returns all the drivers from the DB
router.get('/', async (req, res) => {
    // get drivers
    const results = await driverService.getAllDrivers()
    
    res.json({ data: results })
})

// GET /drivers/:id
// Returns a single driver, including the related Team data
router.get('/:id', async (req, res) => {
    const driverId = req.params.id

    if (isNaN(driverId) || !driverId) {
        console.log(`Invalid driver ID: ${driverId}`)
        res.status(400).json({ message: `Invalid driver ID: ${driverId}` })
        return
    }

    try {
        // We can add associations by assigning an array to the "includes" property
        const result = await driverService.getDriverById(driverId)

        console.log(result)

        if (!result) {
            // no drivers match the ID
            res.status(404).json()
            return
        }

        res.status(200).json(result)
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error." })
    }
})

// POST / drivers
router.post('/', async (req, res) => {
    // add a driver
    // get the new driver details from the req.body 
    const { driverName, birthDate, teamId } = req.body

    // basic validation (the values from the body aren't null / undefined / empty)
    if (!driverName || !birthDate || !teamId) {
        console.log(`One or more input values are invalid.`)
        res.status(400).json({ message: "One or more input values are invalid." })
    }

    // Now, with valid values, create a new Driver in the DB.
    try {
        const result = await driverService.createDriver({ driverName, birthDate, teamId })

        console.log(result) // the newly created driver

        res.status(201).json({ message: "New driver created.", data: result })
        return

    } catch (error) {
        // something went wrong
        console.log(error)
        res.status(500).json({ message: "Internal server error." })
        return
    }
})

// POST /drivers/populate
router.post('/populate', async (req, res) => {
    // populate the DB with drivers using raw SQL queries -> .query() function
    // await db.Driver.create({ driverName: "Sebastien Vettel", birthDate: "1985-12-01" })
    // await db.Driver.create({ driverName: "George Russel", birthDate: "1992-12-01" })
    // await db.Driver.create({ driverName: "Lando Norris", birthDate: "1990-12-01" })
    
    const { drivers } = req.body

    console.log(drivers)

    for (let item of drivers) {
        console.log(item.driverName)
        console.log(item.birthDate)
        // ALWAYS perform raw queries on the sequelize object, NOT on models:
        await db.sequelize.query("INSERT INTO drivers (driverName, birthDate, teamId) VALUES (?, ?, ?);",
            [ item.driverName, item.birthDate, item.teamId ]
        )
    }

    // SQL: INSERT INTO drivers (driverName, birthDate) VALUES ('', ''), ('', '');
    // await db.Driver.query("INSERT INTO drivers (driverName, birthDate) VALUES ('Sebastien Vettel', '1985-12-01');")

    res.status(201).json({ message: "Database populated with drivers." })
})

// PUT /drivers/:id
router.put('/:id', async (req, res) => {
    // update a driver by ID

    // get the driverId, and the driver details from the req.body
    const driverId = req.params.id
    const { driverName, birthDate, teamId } = req.body

    // validation
    if (isNaN(driverId) || !driverId || !isNaN(driverName) || !driverName || isNaN(teamId)) {
        // we have some invalid value(s)
        console.log("Invalid input values")
        res.status(400).json({ message: "Please provide valid values for the driver." })
        return
    }

    // we have valid input values
    try {
        // SQL: UPDATE drivers SET driverName = ?, birthDate = ? WHERE id = ?;
        const result = await driverService.updateDriver(driverId, { driverName, birthDate, teamId })

        console.log("UPDATE RESULT:")
        console.log(result)
        if (result[0] == 0) {
            // no records in the DB were updated
            res.status(404).json()
            return
        }

        res.status(204).json()
        return

    } catch (error) {
        // an error happened
        console.log(error)
        res.status(500).json({ message: "Internal server error." })
        return
    }
})

// DELETE /drivers/:id
router.delete('/:id', async (req, res) => {
    // delete a driver by ID
    const driverId = req.params.id
    console.log('DRIVER ID ' + driverId)

    // validate the ID
    // it should be a number, it should not be null, empty, or 0
    if (isNaN(driverId) || !driverId) {
        console.log('INVALID DRIVER ID')
        res.status(400).json({ message: "Invalid driver ID." })
        return
    }

    // we have a valid driverId
    try {
        console.log(`Try execute the DELETE operation on the DB.`)
        const result = driverService.deleteDriver(driverId)

        console.log("DELETE RESULT:")
        console.log(result)
    
        // determine if the deletion was successful
        // was there 1 row affected, or 0 rows affected, or more than 1 row affected (shouldn't be possible)
        if (!result) {
            // no rows affected
            res.status(404).json()
            return
        }

        res.status(204).json()
        return

    } catch (error) {
        console.log(`ERROR`)
        console.log(error)
        res.status(500).json({ message: "Something went wrong." })
        return
    }
})

module.exports = router